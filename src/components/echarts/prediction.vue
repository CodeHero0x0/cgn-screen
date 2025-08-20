<template>
	<div class="power-generation-chart">
	  <!-- 自定义图例和时间选择器在一行 -->
	  <div class="legend-and-controls">
		<!-- 左侧自定义图例 -->
		<div class="custom-legend">
			<div class="legend-item">
				<span class="legend-text" style="color:#FFFFFF99;">(万kWh)</span>
			</div>
			<div class="legend-item custom-legend-div2">
				<div class="legend-icon legend-icon-predicted"></div>
				<span class="legend-text" style="color:#FFFFFFCC;">预测发电量</span>
			</div>
			<div class="legend-item">
				<div class="legend-icon legend-icon-resource" :class="{legendiconresource1: echartsData.IconCurve == '平均辐照度'}"></div>
				<span class="legend-text" style="color:#FFFFFFCC;">{{echartsData.IconCurve}}</span>
			</div>
            <div class="legend-item legend-right">
				<span class="" style="color:#FFFFFF99;">{{ echartsData.unitOfMeasurement }}</span>
			</div>
		</div>
	  </div>
	  <!-- 图表容器 -->
	  <div ref="chart" class="chart-container"></div>
	</div>
</template>

<script>
export default {
  name: 'PowerGenerationChart',
  props: [
	'echartsData'
  ],
  data() {
    return {
      chart: null,
      totalPredicted: 0,
      avgResource: 0
    }
  },
  
  computed: {
    xAxisData() {
      // 从 echartsData 中提取 metric_name 作为X轴标签
      if (!this.echartsData || !Array.isArray(this.echartsData)) {
        return [];
      }
      return this.echartsData.map(item => item.metric_name || '');
    },

    // 处理后的图表数据
    processedChartData() {
      if (!this.echartsData || !Array.isArray(this.echartsData)) {
        return {
          predicted: [],
          resource: []
        };
      }

      return {
        predicted: this.echartsData.map(item => parseFloat(item.metric_value) || 0),
        resource: this.echartsData.map(item => parseFloat(item.unit) || 0)
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
    echartsData: {
      handler() {
        this.updateChart();
        this.updateData();
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
    updateData() {
      const data = this.processedChartData;
      this.totalPredicted = data.predicted.reduce((sum, val) => sum + val, 0);
      // 计算资源数据的平均值
      this.avgResource = data.resource.length > 0 ? 
        (data.resource.reduce((sum, val) => sum + val, 0) / data.resource.length).toFixed(2) : '0';
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
    
    // 动态计算右侧Y轴的最大值
    const maxResource = Math.max(...data.resource);
    const rightYAxisMax = Math.ceil(maxResource * 1.2); // 增加20%的余量
    const rightYAxisInterval = Math.ceil(rightYAxisMax / 5); // 分成5个间隔
    
    const option = {
        backgroundColor: 'transparent',
        animation: true,
        animationDuration: 3500,
        animationEasing: 'cubicOut',
        grid: {
            left: '0',
            right: '20',
            top: '20',
            bottom: '20',
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
            backgroundColor: 'rgba(0, 40, 80, 0.9)',
            borderColor: '#00ccff',
            borderWidth: 1,
            textStyle: {
                color: '#fff',
                fontSize:26
            },
            formatter: (params) => {
                let result = `<div style="padding: 8px 0; border-bottom: 1px solid #333; margin-bottom: 8px;">${params[0].axisValue}</div>`;
                
                params.forEach(param => {
                    let unit = param.seriesName === '平均风速' ? 'm/s' : '万kWh';
                    result += `
                        <div style="margin: 4px 0; display: flex; justify-content: space-between; align-items: center;">
                            <span style="display: flex; align-items: center;">
                                <span style="display: inline-block; width: 10px; height: 10px; background: ${param.color}; margin-right: 8px;"></span>
                                ${param.seriesName}
                            </span>
                            <span style="color: #fff; font-weight: bold;">${param.value}${unit}</span>
                        </div>
                    `;
                });
                return result;
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
                    color: '#1a4d73',
                    width: 1
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#7ec7ff',
                fontSize: 26
            },
            splitLine: {
                show: false
            }
        },
        yAxis: [
            {
                type: 'value',
                name: '',
                position: 'left',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#7ec7ff',
                    fontSize: 26,
                    formatter: '{value}'
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(45, 90, 135, 0.5)',
                        type: 'dashed',
                        width: 1
                    }
                }
            },
            {
                type: 'value',
                name: '',
                position: 'right',
                min: 0,
                max: rightYAxisMax, // 动态设置最大值
                interval: rightYAxisInterval, // 动态设置间隔
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#7ec7ff',
                    fontSize: 26,
                    formatter: '{value}'
                },
                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '预测发电量',
                type: 'bar',
                yAxisIndex: 0,
                data: data.predicted,
                barWidth: 25,
                itemStyle: {
                    // 透明渐变：从底部透明到顶部不透明
                    color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                        { offset: 0, color: 'rgba(0, 120, 207, 0.1)' }, // 底部：非常透明
                        { offset: 0.3, color: 'rgba(0, 120, 207, 0.3)' }, // 30%处：较透明
                        { offset: 0.6, color: 'rgba(0, 120, 207, 0.6)' }, // 60%处：半透明
                        { offset: 1, color: 'rgba(0, 120, 207, 0.9)' }    // 顶部：基本不透明
                    ]),
                    // 添加边框来模拟顶端红线
                    borderColor: '#ff0000',
                    borderWidth: 0,
                    borderRadius: [0, 0, 0, 0]
                },
                // 添加标记点在柱子顶端
                markPoint: {
                    symbol: 'rect',
                    symbolSize: [25, 8], // 宽度25，高度8
                    itemStyle: {
                        color: '#00C2FF',
                        borderWidth: 0
                    },
                    data: data.predicted.map((value, index) => ({
                        coord: [index, value], // 在柱子顶端的坐标
                        value: ''
                    })),
                    silent: true,
                    tooltip: {
                        show: false
                    }
                }
            },
            {
                name: '平均风速',
                type: 'line',
                yAxisIndex: 1,
                data: data.resource,
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: {
                    color: '#ffcc00',
                    width: 2
                },
                itemStyle: {
                    color: '#ffcc00',
                    borderColor: '#ffcc00',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'top',
                    color: '#ffcc00',
                    fontSize: 26,
                    formatter: '{c}'
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
  border-radius: 4px;
  padding: 0px;
  color: #7ec7ff;
  
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
    align-items: center;
    gap: 25px;
    width: 100%;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover .legend-text {
      color: #00ccff;
    }
  }
  .custom-legend-div2{
    margin-left: 450px;
  }
  .legend-right{
    margin-left: auto;
    color: rgba(255, 255, 255, 0.60);
    font-family: "Alibaba PuHuiTi 2.0";
    font-size: 26px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  
  .legend-icon {
    border-radius: 2px;
    &.legend-icon-predicted {
		width: 10px;
    	height: 20px;
		background: url("../../assets/images/CompanyOverview/yucefadianliang.png") center center no-repeat;
        position: relative;
        top: 2px;
    }
    &.legend-icon-resource {
		width: 30px;
    	height: 20px;
		background: url("../../assets/images/CompanyOverview/pingjunfengsu.png") center center no-repeat;
        position: relative;
        top: 2px;
    }
    &.legendiconresource1{
      background: url("../../assets/images/CompanyOverview/fuzhaodu.png") center center no-repeat;
    }
  }

  
  .legend-text {
    color: #7ec7ff;
    font-size: 26px;
    font-weight: bold;
    transition: color 0.3s ease;
  }
  
  .chart-container {
    width: 1374px;
    height:446px;
    border-radius: 4px;
  }
}
</style>
