<template>
	<div class="power-generation-chart">
	  <div class="custom-legend">
		<div class="legend-left">
			<div class="legend-item">
				<span class="legend-text" style="color:#FFFFFF99;">({{unit}})</span>
			</div>
		</div>
		<div class="legend-center">
			<div class="legend-item">
				<div class="legend-icon legend-icon-generator"></div>
				<span class="legend-text" style="color:#FFFFFFCC;">计划</span>
			</div>
			<div class="legend-item">
				<div class="legend-icon legend-icon-transmission"></div>
				<span class="legend-text" style="color:#FFFFFFCC;">完成</span>
			</div>
			<div class="legend-item">
				<div class="legend-icon legend-icon-loss"></div>
				<span class="legend-text" style="color:#FFFFFFCC;">未完成</span>
			</div>
		</div>
	</div>

	  <!-- 图表容器 -->
	  <div ref="chart" class="chart-container"></div>
	</div>
</template>

<script>
export default {
  name: 'StackedBarChart',
  props:[
	'StackedBarChartData'
  ],
  data() {
    return {
      chart: null,
      unit: '项' // 默认单位
    }
  },
  
  computed: {
    // X轴数据 - 从接口数据中提取月份
    xAxisData() {
      if (!this.StackedBarChartData || !Array.isArray(this.StackedBarChartData)) {
        return []
      }
      return this.StackedBarChartData.map(item => item.sub_category)
    },
    
    // 计划数据
    planData() {
      if (!this.StackedBarChartData || !Array.isArray(this.StackedBarChartData)) {
        return []
      }
      return this.StackedBarChartData.map(item => parseInt(item.four_category) || 0)
    },
    
    // 完成数据
    completedData() {
      if (!this.StackedBarChartData || !Array.isArray(this.StackedBarChartData)) {
        return []
      }
      return this.StackedBarChartData.map(item => parseInt(item.metric_name) || 0)
    },
    
    // 未完成数据
    uncompletedData() {
      if (!this.StackedBarChartData || !Array.isArray(this.StackedBarChartData)) {
        return []
      }
      return this.StackedBarChartData.map(item => parseInt(item.metric_value) || 0)
    }
  },
  
  mounted() {
	this.initUnit()
	this.$nextTick(() => {
		this.initChart()
	})
  },
  
  watch: {
    StackedBarChartData: {
      handler() {
        this.initUnit()
        this.$nextTick(() => {
          this.updateChart()
        })
      },
      deep: true
    }
  },
  
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  },
  
  methods: {
    // 初始化单位
    initUnit() {
      if (this.StackedBarChartData && this.StackedBarChartData.length > 0) {
        this.unit = this.StackedBarChartData[0].unit || '项'
      }
    },
    
    initChart() {
      if (!this.$echarts || !this.$refs.chart) {
        console.error('ECharts 或图表容器不可用')
        return
      }
      
      try {
        this.chart = this.$echarts.init(this.$refs.chart)
        this.updateChart()
      } catch (error) {
        console.error('图表初始化失败:', error)
      }
    },
    
    updateChart() {
        if (!this.chart) return
        
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
                        result += `
                            <div style="margin: 8px 0; display: flex; justify-content: space-between; align-items: center;">
                                <span style="display: flex; align-items: center;">
                                    <span style="display: inline-block; width: 12px; height: 12px; background: ${param.color}; margin-right: 8px; border-radius: 2px;"></span>
                                    ${param.seriesName}
                                </span>
                                <span style="color: #fff; font-weight: bold;">${param.value}${this.unit}</span>
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
                    color: ' rgba(255, 255, 255, 0.80)',
                    fontSize: 26,
                    margin: 30
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
                // 柱状图系列
                {
                    name: '未完成',
                    type: 'bar',
                    stack: 'total',
                    data: this.uncompletedData,
                    barWidth: '30%',
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
                {
                    name: '完成',
                    type: 'bar',
                    stack: 'total',
                    data: this.completedData,
                    itemStyle: {
                        // 绿色渐变，从上到下透明度递减
                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(35, 255, 252, 0.4)' },   // 顶部 60% 透明度
                            { offset: 0.5, color: 'rgba(35, 255, 252, 0.4)' }, // 中间 40% 透明度
                            { offset: 1, color: 'rgba(35, 255, 252, 0.4)' }    // 底部 20% 透明度
                        ]),
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: [0, 0, 0, 0]
                    },
                    emphasis: {
                        itemStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: 'rgba(35, 255, 252, 0.4)' },
                                { offset: 0.5, color: 'rgba(35, 255, 252, 0.4)' },
                                { offset: 1, color: 'rgba(35, 255, 252, 0.4)' }
                            ])
                        }
                    }
                },
                {
                    name: '计划',
                    type: 'bar',
                    stack: 'total',
                    data: this.planData,
                    itemStyle: {
						color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(255, 138, 0, 0.4)' },   // 顶部 60% 透明度
                            { offset: 0.5, color: 'rgba(255, 138, 0, 0.4)' }, // 中间 40% 透明度
                            { offset: 1, color: 'rgba(255, 138, 0, 0.4)' }    // 底部 20% 透明度
                        ]),
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: [0, 0, 0, 0]
                    },
                    emphasis: {
                        itemStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: 'rgba(255, 138, 0, 0.4)' },
                                { offset: 0.5, color: 'rgba(255, 138, 0, 0.4)' },
                                { offset: 1, color: 'rgba(255, 138, 0, 0.4)' }
                            ])
                        }
                    }
                },
                // 横线系列 - 未完成顶部
                {
                    name: '未完成分割线',
                    type: 'line',
                    data: this.uncompletedData,
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
                // 横线系列 - 完成顶部
                {
                    name: '完成分割线',
                    type: 'line',
                    data: this.uncompletedData.map((value, index) => value + this.completedData[index]),
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
                // 横线系列 - 计划顶部
                {
                    name: '计划分割线',
                    type: 'line',
                    data: this.uncompletedData.map((value, index) => value + this.completedData[index] + this.planData[index]),
                    symbol: 'rect',
                    symbolSize: [30, 4],
                    symbolRotate: 0,
                    lineStyle: {
                        width: 0,
                        opacity: 0
                    },
                    itemStyle: {
                        color: '#FFC809',
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
// 样式保持不变
.power-generation-chart {
  width: 100%;
  height: 100%;
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
		background: url("../../assets/images/homepage/legend-icon-generator.png") center center no-repeat;
    }
    &.legend-icon-transmission {
		width: 10px;
    	height: 20px;
		background: url("../../assets/images/homepage/legend-icon-transmission.png") center center no-repeat;
    }
    &.legend-icon-loss {
		width: 10px;
    	height: 20px;
		background: url("../../assets/images/homepage/legend-icon-loss.png") center center no-repeat;
    }
  }
  
  .legend-text {
    color: #FFFFFFCC;
    font-size: 26px;
    font-weight: 400;
    transition: color 0.3s ease;
    padding-left: 10px;
  }
  
  .chart-container {
    width: 100%;
    height: 100%;
  }
}
</style>
