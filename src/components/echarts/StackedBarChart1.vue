<template>
	<div class="power-generation-chart">
	  <!-- 头部控制区域 -->
	  <div class="chart-header">
		<span class="icon">{{StackedBarChartData.name}}</span>
		<div class="tabs">
			<button 
			  :class="{ active: activeTab === 'all' }" 
			  @click="switchTab('all')"
			>
			{{StackedBarChartData.all}}
			</button>
			<button 
			  :class="{ active: activeTab === 'wind' }" 
			  @click="switchTab('wind')"
			>
			{{StackedBarChartData.wind}}
			</button>
		</div>
	  </div>
	  
	  <div class="custom-legend">
		<div class="legend-left">
			<div class="legend-item">
				<span class="legend-text" style="color:#FFFFFF99;">(万kWh)</span>
			</div>
		</div>
		<div class="legend-center">
			<div class="legend-item">
				<div class="legend-icon legend-icon-generator"></div>
				<span class="legend-text" style="color:#FFFFFFCC;">{{StackedBarChartData.solar}}</span>
			</div>
            <div class="legend-item">
				<div class="legend-icon legend-icon-transmission"></div>
				<span class="legend-text" style="color:#FFFFFFCC;">{{StackedBarChartData.IconCurve}}</span>
			</div>
		</div>
	</div>

	  <!-- 图表容器 -->
	  <div ref="chart" class="chart-container"></div>
	</div>
</template>

<script>
export default {
  name: 'StackedBarChart1',
  props: [
    'StackedBarChartData',
    'getScheduledMonthlyGeneratorSetData', // all数据
    'getAnnualGeneratorSetData' // wind数据
  ],
  data() {
    return {
      // 默认选择全部
      activeTab: 'all',
      timeType: 'month',
      chart: null,
      totalGenerator: 0,
      totalLoss: 0
    }
  },
  
  computed: {
    xAxisData() {
      // 根据当前激活的tab获取对应的数据
      const currentData = this.activeTab === 'all' ? 
        this.getScheduledMonthlyGeneratorSetData : 
        this.getAnnualGeneratorSetData;
      
      if (!currentData || !currentData.length) {
        // 如果没有数据，返回默认标签
        return ['场站', '场站', '场站', '场站', '场站', '场站', '场站', '场站', '场站', '场站', '场站', '场站'];
      }
      
      // 从数据中提取metric_name作为X轴标签
      return currentData.map(item => item.metric_name || '场站');
    },

    // 处理后的图表数据
    processedChartData() {
      const currentData = this.activeTab === 'all' ? 
        this.getScheduledMonthlyGeneratorSetData : 
        this.getAnnualGeneratorSetData;
      
      if (!currentData || !currentData.length) {
        return {
          generator: [],
          loss: []
        };
      }

      // 将数据转换为图表需要的格式
      const generator = currentData.map(item => parseFloat(item.metric_value) || 0);
      const loss = currentData.map(item => parseFloat(item.unit) || 0);

      return {
        generator,
        loss
      };
    }
  },
  
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      this.updateData();
    });
  },

  watch: {
    // 监听数据变化，重新渲染图表
    getScheduledMonthlyGeneratorSetData: {
      handler() {
        if (this.activeTab === 'all') {
          this.updateChart();
          this.updateData();
        }
      },
      deep: true
    },
    getAnnualGeneratorSetData: {
      handler() {
        if (this.activeTab === 'wind') {
          this.updateChart();
          this.updateData();
        }
      },
      deep: true
    }
  },
  
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
      this.updateChart();
      this.updateData();
    },
    
    switchTimeType(type) {
      this.timeType = type;
      this.updateChart();
      this.updateData();
    },
    
    updateData() {
      const data = this.processedChartData;
      this.totalGenerator = data.generator.reduce((sum, val) => sum + val, 0);
      this.totalLoss = data.loss.reduce((sum, val) => sum + val, 0);
    },
    
    initChart() {
      if (!this.$echarts || !this.$refs.chart) {
        console.error('ECharts 或图表容器不可用');
        return;
      }
      
      try {
        this.chart = this.$echarts.init(this.$refs.chart);
        this.updateChart();
      } catch (error) {
        console.error('图表初始化失败:', error);
      }
    },
    
    updateChart() {
      if (!this.chart) return;
      
      const data = this.processedChartData;
      
      const option = {
        backgroundColor: 'transparent',
        animation: true,
        animationDuration: 1500,
        animationEasing: 'cubicOut',
        grid: {
          left: '10',
          right: '20',
          top: '20',
          bottom: '40',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          },
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          borderColor: '#00ccff',
          borderWidth: 2,
          textStyle: {
            color: '#fff',
            fontSize: 26,
            fontWeight: 'bold'
          },
          formatter: (params) => {
            // 过滤掉横线系列，只显示柱状图数据
            const barParams = params.filter(param => param.seriesType === 'bar');
            let result = `<div style="padding: 8px 0; border-bottom: 1px solid #333; margin-bottom: 8px; font-size: 14px; color: #00ccff;">${barParams[0].axisValue}</div>`
            
            barParams.forEach(param => {
              const unit = '万kWh'
              result += `
                <div style="margin: 8px 0; display: flex; justify-content: space-between; align-items: center;">
                  <span style="display: flex; align-items: center;">
                    <span style="display: inline-block; width: 12px; height: 12px; background: ${param.color}; margin-right: 8px; border-radius: 2px;"></span>
                    ${param.seriesName}
                  </span>
                  <span style="color: #fff; font-weight: bold;">${param.value}${unit}</span>
                </div>
              `
            })
            return result
          }
        },
        legend: {
          show: false
        },
        xAxis: {
          type: 'category',
          data: this.xAxisData,
          axisLine: {
            lineStyle: {
              color: '#2d5a87',
              width: 2,
              type: 'dashed'
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: '#2d5a87',
              type: 'dashed'
            }
          },
          axisLabel: {
            color: '#FFFFFFCC',
            fontSize: 26,
            margin: 20
          }
        },
        yAxis: {
          type: 'value',
          name: '',
          nameTextStyle: {
            color: '#7ec7ff',
            fontSize: 26,
          },
          position: 'left',
          axisLine: {
            show: false,
            lineStyle: {
              color: '#2d5a87',
              width: 2
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: '#2d5a87'
            }
          },
          axisLabel: {
            color: '#2CD7FF',
            fontSize: 26,
            formatter: '{value}'
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(45, 90, 135, 0.3)',
              type: 'dashed',
              width: 1
            }
          }
        },
        series: [
          // 柱状图系列 - 只保留两个部分
          {
            name: '输变电',
            type: 'bar',
            stack: 'total',
            data: data.loss,
            barWidth: '30%',
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(0, 120, 207, 0.4)' },   // 顶部 60% 透明度
                { offset: 0.5, color: 'rgba(0, 120, 207, 0.4)' }, // 中间 40% 透明度
                { offset: 1, color: 'rgba(0, 120, 207, 0.4)' }    // 底部 20% 透明度
              ]),
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: [0, 0, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(0, 120, 207, 0.4)' },
                  { offset: 0.5, color: 'rgba(0, 120, 207, 0.4)' },
                  { offset: 1, color: 'rgba(0, 120, 207, 0.4)' }
                ])
              }
            }
          },
          {
            name: '发电机组',
            type: 'bar',
            stack: 'total',
            data: data.generator,
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(0, 192, 255, 0.4)' },   // 顶部 60% 透明度
                { offset: 0.5, color: 'rgba(0, 192, 255, 0.4)' }, // 中间 40% 透明度
                { offset: 1, color: 'rgba(0, 192, 255, 0.4)' }    // 底部 20% 透明度
              ]),
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: [0, 0, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(0, 192, 255, 0.4)' },
                  { offset: 0.5, color: 'rgba(0, 192, 255, 0.4)' },
                  { offset: 1, color: 'rgba(0, 192, 255, 0.4)' }
                ])
              }
            }
          },
          // 横线系列 - 输变电顶部
          {
            name: '输变电分割线',
            type: 'line',
            data: data.loss.map(value => value),
            symbol: 'rect',
            symbolSize: [30, 4],
            symbolRotate: 0,
            lineStyle: {
              width: 0,
              opacity: 0
            },
            itemStyle: {
              color: '#00C2FF',
              borderWidth: 0,
              opacity: 1
            },
            emphasis: {
              disabled: true
            },
            silent: true,
            tooltip: {
              show: false
            }
          },
          // 横线系列 - 发电机组顶部
          {
            name: '发电机组分割线',
            type: 'line',
            data: data.loss.map((value, index) => value + data.generator[index]),
            symbol: 'rect',
            symbolSize: [30, 4],
            symbolRotate: 0,
            lineStyle: {
              width: 0,
              opacity: 0
            },
            itemStyle: {
              color: '#23FFFC',
              borderWidth: 0,
              opacity: 1
            },
            emphasis: {
              disabled: true
            },
            silent: true,
            tooltip: {
              show: false
            }
          }
        ]
      };
      this.chart.setOption(option, true);
    }
  }
}
</script>

<style lang="scss" scoped>
.power-generation-chart {
  width: 100%;
  height: 100%;
  background: rgba(0, 20, 40, 0.8);
  border: 1px solid #1e3c5a;
  border-radius: 4px;
  padding: 0px;
  color: #7ec7ff;
  
  .chart-header {
    width: 100%;
    height: 100px;
    background: url("../../assets/images/homepage/ResourcesSituationImg.png") center center no-repeat;
    display: flex;
    .icon {
      color: #F6F9FE;
      text-shadow: 0 0 16px rgba(81, 196, 255, 0.10), 3px 3px 0 rgba(22, 22, 19, 0.27);
      font-family: JiangChengXieHei;
      font-size: 42px;
      font-weight: 700;
      padding-left: 100px;
      line-height: 100px;
      font-style: italic;
      width:252px;
    }
    .tabs {
      display: flex;
      margin-left: 627px;
      width:347px;
      gap: 59px;
      button {
        width: 200px;
        height: 100px;
        background: transparent;
        color: #FFFFFF99;
        cursor: pointer;
        font-size: 32px;
        border-radius: 4px;
        &:hover {
          color: #00ccff;
        }
        &.active {
          color: #00ccff;
          background: url("../../assets/images/homepage/Frame 427320596.png") center 100% no-repeat;
        }
      }
    }
  }
  
  .legend-and-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    width: 100%;
    height: 48px;
    margin-top: 20px;
  }
  
  .custom-legend {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    margin-top:20px;
    margin-bottom:20px;
  }

  .legend-left {
    flex: 0 0 auto;
    margin-left: 0;
  }

  .legend-center {
    flex: 1;
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .legend-icon {
    border-radius: 2px;
    &.legend-icon-generator {
      width: 10px;
      height: 20px;
      background: url("../../assets/images/homepage/icon-actual.png") center center no-repeat;
    }
    &.legend-icon-transmission {
      width: 10px;
      height: 20px;
      background: url("../../assets/images/homepage/icon-predicted.png") center center no-repeat;
    }
  }
  
  .legend-text {
    color: #FFFFFFCC;
    font-size: 26px;
    font-weight: 400;
    transition: color 0.3s ease;
  }
  
  .chart-container {
    width: 1374px;
    height: 376px;
    background: rgba(0, 10, 20, 0.5);
    border: 1px solid #1e3c5a;
    border-radius: 4px;
  }
}
</style>
