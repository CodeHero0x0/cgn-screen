<template>
	<div class="power-generation-chart">
	  <div class="custom-legend">
		<div class="legend-left">
			<div class="legend-item">
				<span class="legend-text" style="color:#FFFFFF99;">{{ StackedBarChartData.quantity }}</span>
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
  props:[
	'StackedBarChartData'
  ],
  data() {
    return {
      // 默认选择全部
      activeTab: 'all',
      timeType: 'month',
      chart: null,
      totalGenerator: 0,
      totalLoss: 0,
      
      // 图表数据
      chartData: {
        all: {
			month: {
				generator: [],      // 健康数据
				loss: []           // 亚健康数据
			}
        }
      }
    }
  },
  
  computed: {
    xAxisData() {
      // 使用父组件传来的场站名称作为x轴数据
      return this.StackedBarChartData?.metric_name || []
    }
  },
  
  watch: {
    // 监听父组件数据变化
    StackedBarChartData: {
      handler(newData) {
        if (newData && newData.health && newData.subhealth) {
          this.initializeData()
          this.$nextTick(() => {
            this.updateChart()
            this.updateData()
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  },
  
  methods: {
    // 初始化数据
    initializeData() {
      if (!this.StackedBarChartData || !this.StackedBarChartData.health) {
        return
      }
      
      // 将字符串数组转换为数字数组
      this.chartData.all.month.generator = this.StackedBarChartData.health.map(item => 
        parseInt(item) || 0
      )
      this.chartData.all.month.loss = this.StackedBarChartData.subhealth.map(item => 
        parseInt(item) || 0
      )
    },
    
    updateData() {
      const data = this.chartData[this.activeTab][this.timeType]
      this.totalGenerator = data.generator.reduce((sum, val) => sum + val, 0)
      this.totalLoss = data.loss.reduce((sum, val) => sum + val, 0)
    },
    
    initChart() {
      if (!this.$echarts || !this.$refs.chart) {
        console.error('ECharts 或图表容器不可用')
        return
      }
      
      try {
        this.chart = this.$echarts.init(this.$refs.chart)
        // 如果数据已经准备好，立即更新图表
        if (this.StackedBarChartData && this.StackedBarChartData.health) {
          this.initializeData()
          this.updateChart()
          this.updateData()
        }
      } catch (error) {
        console.error('图表初始化失败:', error)
      }
    },
    
    updateChart() {
        if (!this.chart || !this.chartData.all.month.generator.length) return
        
        const data = this.chartData[this.activeTab][this.timeType]
        
        const option = {
            backgroundColor: 'transparent',
            animation: true,
            animationDuration: 1500,
            animationEasing: 'cubicOut',
            grid: {
                left: '40',
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
                        const unit = this.StackedBarChartData?.quantity || '台'
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
                // 柱状图系列 - 亚健康数据
                {
                    name: this.StackedBarChartData?.IconCurve || '亚健康≤90°H',
                    type: 'bar',
                    stack: 'total',
                    data: data.loss,
                    barWidth: '30%',
                    itemStyle: {
                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(255, 92, 92, 0.6)' },   // 红色渐变表示亚健康
                            { offset: 0.5, color: 'rgba(255, 92, 92, 0.4)' },
                            { offset: 1, color: 'rgba(255, 92, 92, 0.2)' }
                        ]),
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: [0, 0, 0, 0]
                    },
                    emphasis: {
                        itemStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: 'rgba(255, 92, 92, 0.8)' },
                                { offset: 0.5, color: 'rgba(255, 92, 92, 0.6)' },
                                { offset: 1, color: 'rgba(255, 92, 92, 0.4)' }
                            ])
                        }
                    }
                },
                // 柱状图系列 - 健康数据
                {
                    name: this.StackedBarChartData?.solar || '健康90~100°H',
                    type: 'bar',
                    stack: 'total',
                    data: data.generator,
                    itemStyle: {
                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(0, 192, 255, 0.6)' },   // 蓝色渐变表示健康
                            { offset: 0.5, color: 'rgba(0, 192, 255, 0.4)' },
                            { offset: 1, color: 'rgba(0, 192, 255, 0.2)' }
                        ]),
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: [0, 0, 0, 0]
                    },
                    emphasis: {
                        itemStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: 'rgba(0, 192, 255, 0.8)' },
                                { offset: 0.5, color: 'rgba(0, 192, 255, 0.6)' },
                                { offset: 1, color: 'rgba(0, 192, 255, 0.4)' }
                            ])
                        }
                    }
                },
                // 横线系列 - 亚健康顶部分割线
                {
                    name: '亚健康分割线',
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
                },
                // 横线系列 - 健康顶部分割线
                {
                    name: '健康分割线',
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
        }
        this.chart.setOption(option, true)
    }
  }
}
</script>

<style lang="scss" scoped>
.power-generation-chart {
  width: 1128px;
  height: 311px;
  border-radius: 4px;
  padding: 0px;
  color: #7ec7ff;
  
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
    padding-left: 50px;
  }
  
  .chart-container {
    width: 1128px;
    height: 275px;
    border-radius: 4px;
  }
}
.bottom{
    width: 1128px;
    height: 10px;
}
</style>
