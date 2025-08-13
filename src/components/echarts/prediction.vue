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
				<div class="legend-icon legend-icon-resource"  :class="{legendiconresource1: echartsData.IconCurve == '平均辐照度'}"></div>
                <div class="legend-icon "></div>
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
  props:[
	'echartsData',
  	'predictionData'
  ],
  data() {
    return {
      activeTab: 'all',
      timeType: 'month',
      chart: null,
      totalPredicted: 0,
      totalActual: 0,
      completionRate: 0,
      avgResource: 0,
      chartData: {
        all: {
			month: {
				predicted: [644.557, 879.606, 874.198, 956.398, 770.51, 949.894, 1107.971], // 柱状图数据
				actual: [],
				resource: [] // 这里会根据predicted数据计算
			},
			year: {
				predicted: [],
				actual: [],
				resource: []
			}
        }
      }
    }
  },
  computed: {
    xAxisData() {
      // 模拟图片中的X轴标签
      return ['7.26', '7.27', '7.28', '7.29', '7.30', '7.31', '8.01']
    }
  },
  created(){
	this.chartData.all.month.predicted = this.predictionData;
	console.log(11111111111,this.chartData.all.month.predicted)
  },
  mounted() {
	this.initializeData()
	this.$nextTick(() => {
		this.initChart()
		this.updateData()
	})
  },
  
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  },
  
  methods: {
    // 根据柱体数据计算对应的资源数据（这里可以自定义转换逻辑）
    calculateResourceFromPredicted(predictedData) {
      // 示例：根据发电量计算对应的风速或其他资源指标
      // 这里简单按比例转换，您可以根据实际业务逻辑调整
      return predictedData.map(value => {
        // 假设发电量30对应风速7.41，按比例计算
        const resourceValue = (value / 30) * 7.41
        return parseFloat(resourceValue.toFixed(2))
      })
    },
    
    generateRandomData(count, min, max, decimals = 0) {
      const data = []
      for (let i = 0; i < count; i++) {
        const value = Math.random() * (max - min) + min
        data.push(decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.round(value))
      }
      return data
    },
    
    generateActualData(predictedData) {
      return predictedData.map(predicted => {
        const ratio = 0.85 + Math.random() * 0.2
        return Math.round(predicted * ratio)
      })
    },
    
    initializeData() {
      // 根据柱体数据计算资源数据
      this.chartData.all.month.resource = this.calculateResourceFromPredicted(this.chartData.all.month.predicted)
    },
    
    updateData() {
      const data = this.chartData[this.activeTab][this.timeType]
      this.totalPredicted = data.predicted.reduce((sum, val) => sum + val, 0)
      this.totalActual = data.actual.reduce((sum, val) => sum + val, 0)
      this.completionRate = Math.round((this.totalActual / this.totalPredicted) * 100)
      // 计算资源数据的平均值
      this.avgResource = (data.resource.reduce((sum, val) => sum + val, 0) / data.resource.length).toFixed(2)
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
    
    const data = this.chartData[this.activeTab][this.timeType]
    
    // 动态计算右侧Y轴的最大值
    const maxResource = Math.max(...data.resource)
    const rightYAxisMax = Math.ceil(maxResource * 1.2) // 增加20%的余量
    const rightYAxisInterval = Math.ceil(rightYAxisMax / 5) // 分成5个间隔
    
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
                let result = `<div style="padding: 8px 0; border-bottom: 1px solid #333; margin-bottom: 8px;">${params[0].axisValue}</div>`
                
                params.forEach(param => {
                    let unit = param.seriesName === '平均风速' ? 'm/s' : '万kWh'
                    result += `
                        <div style="margin: 4px 0; display: flex; justify-content: space-between; align-items: center;">
                            <span style="display: flex; align-items: center;">
                                <span style="display: inline-block; width: 10px; height: 10px; background: ${param.color}; margin-right: 8px;"></span>
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
                    symbolSize: [25, 8], // 宽度20，高度5
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
                smooth: true,
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
            },
        ]


    }
    
    this.chart.setOption(option, true)
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
