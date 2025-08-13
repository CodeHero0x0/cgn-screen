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
		
	</div>
	  <!-- 图表容器 -->
	  <div ref="chart" class="chart-container"></div>
	</div>
</template>

<script>
export default {
  name: 'WaveChart',
  props:[
	'StackedBarChartData'
  ],
  data() {
    return {
      // 默认选择全部
      activeTab: 'all',
      timeType: 'month',
      chart: null,
      totalPredicted: 0,
      totalActual: 0,
      completionRate: 0,
      avgResource: 0,
      
      // 图表数据 - 添加all数据
      chartData: {
        all: {
			month: {
				predicted: [],
				actual: [],
				resource: []
			},
			year: {
				predicted: [],
				actual: [],
				resource: []
			}
        },
        wind: {
			month: {
				predicted: this.generateRandomData(12, 0, 0), // 12个月，800-1200范围
				actual: [],
				resource: this.generateRandomData(12, 5.0, 10.0, 1) // 风速 5-10 m/s，保留1位小数
			},
			year: {
				predicted: this.generateRandomData(5, 0, 0), // 5年，10000-15000范围
				actual: [],
				resource: this.generateRandomData(5, 6.0, 9.0, 1) // 年度平均风速
			}
        },
        solar: {
			month: {
				predicted: this.generateRandomData(12, 0, 0), // 12个月，250-450范围
				actual: [],
				resource: this.generateRandomData(12, 2.5, 7.0, 1) // 太阳辐照度 2.5-7.0 kWh/m²
			},
			year: {
				predicted: this.generateRandomData(5, 0, 0), // 5年，4000-5500范围
				actual: [],
				resource: this.generateRandomData(5, 4.0, 6.0, 1) // 年度平均辐照度
			}
        }
      }
    }
  },
  computed: {
    xAxisData() {
      const timeLabels = {
        month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        year: ['2019年', '2020年', '2021年', '2022年', '2023年']
      }
      return timeLabels[this.timeType]
    }
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
    generateRandomData(count, min, max, decimals = 0) {
      const data = []
      for (let i = 0; i < count; i++) {
        const value = Math.random() * (max - min) + min
        data.push(decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.round(value))
      }
      return data
    },
    
    // 生成实际发电量（基于预测值的85%-105%）
    generateActualData(predictedData) {
      return predictedData.map(predicted => {
        const ratio = 0.85 + Math.random() * 0.2 // 85%-105%
        return Math.round(predicted * ratio)
      })
    },
    
    // 初始化数据
    initializeData() {
      // 为wind生成实际发电量
      this.chartData.wind.month.actual = this.generateActualData(this.chartData.wind.month.predicted)
      this.chartData.wind.year.actual = this.generateActualData(this.chartData.wind.year.predicted)
      
      // 为solar生成实际发电量
      this.chartData.solar.month.actual = this.generateActualData(this.chartData.solar.month.predicted)
      this.chartData.solar.year.actual = this.generateActualData(this.chartData.solar.year.predicted)
      
      // 计算全部数据
      this.calculateAllData()
    },
    
    // 计算风电和光伏的总和数据
    calculateAllData() {
      // 计算月度数据
      this.chartData.all.month.predicted = this.chartData.wind.month.predicted.map((val, index) => 
        val + this.chartData.solar.month.predicted[index]
      )
      this.chartData.all.month.actual = this.chartData.wind.month.actual.map((val, index) => 
        val + this.chartData.solar.month.actual[index]
      )
      // 资源情况取平均值（风速和辐照度单位不同，取平均值作为综合指标）
      this.chartData.all.month.resource = this.chartData.wind.month.resource.map((val, index) => 
        ((val + this.chartData.solar.month.resource[index]) / 2).toFixed(1)
      ).map(val => parseFloat(val))
      
      // 计算年度数据
      this.chartData.all.year.predicted = this.chartData.wind.year.predicted.map((val, index) => 
        val + this.chartData.solar.year.predicted[index]
      )
      this.chartData.all.year.actual = this.chartData.wind.year.actual.map((val, index) => 
        val + this.chartData.solar.year.actual[index]
      )
      this.chartData.all.year.resource = this.chartData.wind.year.resource.map((val, index) => 
        ((val + this.chartData.solar.year.resource[index]) / 2).toFixed(1)
      ).map(val => parseFloat(val))
    },
    
    // 重新生成随机数据的方法（可选）
    refreshData() {
      // 重新生成wind数据
      this.chartData.wind.month.predicted = this.generateRandomData(12, 800, 1200)
      this.chartData.wind.month.resource = this.generateRandomData(12, 5.0, 10.0, 1)
      this.chartData.wind.year.predicted = this.generateRandomData(5, 10000, 15000)
      this.chartData.wind.year.resource = this.generateRandomData(5, 6.0, 9.0, 1)
      
      // 重新生成solar数据
      this.chartData.solar.month.predicted = this.generateRandomData(12, 250, 450)
      this.chartData.solar.month.resource = this.generateRandomData(12, 2.5, 7.0, 1)
      this.chartData.solar.year.predicted = this.generateRandomData(5, 4000, 5500)
      this.chartData.solar.year.resource = this.generateRandomData(5, 4.0, 6.0, 1)
      
      // 重新初始化数据
      this.initializeData()
      
      // 更新图表
      this.updateChart()
      this.updateData()
    },
    
    // 其他方法保持不变...
    switchTab(tab) {
      this.activeTab = tab
      this.updateChart()
      this.updateData()
    },
    
    switchTimeType(type) {
      this.timeType = type
      this.updateChart()
      this.updateData()
    },
    
    updateData() {
      const data = this.chartData[this.activeTab][this.timeType]
      this.totalPredicted = data.predicted.reduce((sum, val) => sum + val, 0)
      this.totalActual = data.actual.reduce((sum, val) => sum + val, 0)
      this.completionRate = Math.round((this.totalActual / this.totalPredicted) * 100)
      // 计算平均资源值
      this.avgResource = (data.resource.reduce((sum, val) => sum + val, 0) / data.resource.length).toFixed(1)
    },
    
    getResourceLabel() {
      const labels = {
        wind: '风速',
        solar: '辐照度'
      }
      return labels[this.activeTab] || '资源'
    },
    
    getResourceUnitShort() {
      const units = {
        all: '',
        wind: 'm/s',
        solar: 'kWh/m²'
      }
      return units[this.activeTab] || ''
    },
    
    getResourceUnit() {
      const units = {
        wind: '风速(m/s)',
        solar: '辐照度(kWh/m²)'
      }
      return units[this.activeTab] 
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
					let result = `<div style="padding: 8px 0; border-bottom: 1px solid #333; margin-bottom: 8px; font-size: 14px; color: #00ccff;">${params[0].axisValue}</div>`
					
					params.forEach(param => {
						let unit = '万kWh'
						let percentage = ''
						
						if (param.seriesName === '资源情况') {
							if (this.activeTab === 'all') {
								unit = ''
							} else {
								unit = this.activeTab === 'wind' ? 'm/s' : 'kWh/m²'
							}
						} else if (param.seriesName === '实际发电量') {
							const predictedValue = params.find(p => p.seriesName === '预测发电量')?.value || param.value
							percentage = ` (${Math.round((param.value / predictedValue) * 100)}%)`
						}
						
						result += `
							<div style="margin: 8px 0; display: flex; justify-content: space-between; align-items: center;">
								<span style="display: flex; align-items: center;">
									<span style="display: inline-block; width: 12px; height: 12px; background: ${param.color}; margin-right: 8px; border-radius: ${param.seriesName === '资源情况' ? '50%' : '2px'};"></span>
									${param.seriesName}
								</span>
								<span style="color: #fff; font-weight: bold;">${param.value}${unit}${percentage}</span>
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
			yAxis: [
				{
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
				{
					type: 'value',
					name: this.getResourceUnit(),
					nameTextStyle: {
						color: '#FFFFFF99',
						fontSize: 26,
					},
					position: 'right',
					axisLine: {
						show: false,
						lineStyle: {
							color: '#FFFFFF99',
							width: 2
						}
					},
					axisTick: {
						show: true,
						lineStyle: {
							color: '#FFFFFF99'
						}
					},
					axisLabel: {
						color: '#FFFFFF99',
						fontSize: 26,
						formatter: '{value}'
					},
					splitLine: {
						show: false
					}
				}
			],
			series: [
				// 只保留三条波形线
				{
					name: '预测发电量',
					type: 'line',
					yAxisIndex: 0,
					data: data.predicted,
					smooth: true,
					symbol: 'circle',
					symbolSize: 8,
					lineStyle: {
						color: '#8BFFE3',
						width: 3,
						shadowColor: 'rgba(139, 255, 227, 0.5)',
						shadowBlur: 10,
						shadowOffsetY: 2
					},
					itemStyle: {
						color: '#8BFFE3',
						borderColor: '#8BFFE3',
						borderWidth: 2,
						shadowColor: 'rgba(139, 255, 227, 0.8)',
						shadowBlur: 8
					},
					emphasis: {
						itemStyle: {
							color: '#8BFFE3',
							borderColor: '#8BFFE3',
							borderWidth: 3,
							shadowColor: 'rgba(139, 255, 227, 1)',
							shadowBlur: 15,
							scale: 1.2
						},
						lineStyle: {
							width: 4,
							shadowBlur: 15
						}
					},
					areaStyle: {
						color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: 'rgba(139, 255, 227, 0.3)' },
							{ offset: 1, color: 'rgba(139, 255, 227, 0.05)' }
						])
					}
				},
				{
					name: '实际发电量',
					type: 'line',
					yAxisIndex: 0,
					data: data.actual,
					smooth: true,
					symbol: 'circle',
					symbolSize: 8,
					lineStyle: {
						color: '#00C2FF',
						width: 3,
						shadowColor: 'rgba(0, 194, 255, 0.5)',
						shadowBlur: 10,
						shadowOffsetY: 2
					},
					itemStyle: {
						color: '#00C2FF',
						borderColor: '#00C2FF',
						borderWidth: 2,
						shadowColor: 'rgba(0, 194, 255, 0.8)',
						shadowBlur: 8
					},
					emphasis: {
						itemStyle: {
							color: '#00C2FF',
							borderColor: '#00C2FF',
							borderWidth: 3,
							shadowColor: 'rgba(0, 194, 255, 1)',
							shadowBlur: 15,
							scale: 1.2
						},
						lineStyle: {
							width: 4,
							shadowBlur: 15
						}
					},
					areaStyle: {
						color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: 'rgba(0, 194, 255, 0.3)' },
							{ offset: 1, color: 'rgba(0, 194, 255, 0.05)' }
						])
					}
				},
				{
					name: '资源情况',
					type: 'line',
					yAxisIndex: 1,
					data: data.resource,
					smooth: true,
					symbol: 'circle',
					symbolSize: 8,
					lineStyle: {
						color: '#fff',
						width: 3,
						shadowColor: 'rgba(255, 255, 255, 0.5)',
						shadowBlur: 10,
						shadowOffsetY: 2
					},
					itemStyle: {
						color: '#fff',
						borderColor: '#7ec7ff',
						borderWidth: 2,
						shadowColor: 'rgba(255, 255, 255, 0.8)',
						shadowBlur: 8
					},
					emphasis: {
						itemStyle: {
							color: '#fff',
							borderColor: '#00ccff',
							borderWidth: 3,
							shadowColor: 'rgba(255, 255, 255, 1)',
							shadowBlur: 15,
							scale: 1.2
						},
						lineStyle: {
							width: 4,
							shadowBlur: 15
						}
					},
					areaStyle: {
						color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: '#1C66E699' },
							{ offset: 1, color: '#508EF800' }
						])
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
  
  .chart-container {
    width: 1374px;
    height: 376px;
    background: rgba(0, 10, 20, 0.5);
    border: 1px solid #1e3c5a;
    border-radius: 4px;
  }
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
.legend-text {
    color: #FFFFFFCC;
    font-size: 26px;
    font-weight: 400;
    transition: color 0.3s ease;
  }
</style>
