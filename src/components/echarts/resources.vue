<template>
	<div class="power-generation-chart">
	  <!-- 头部控制区域 -->
	  <div class="chart-header">
		<span class="icon">{{echartsData.name}}</span>
		<div class="tabs">
			<button 
			  :class="{ active: activeTab === 'all' }" 
			  @click="switchTab('all')"
			>
			{{echartsData.all}}
			</button>
			<button 
			  :class="{ active: activeTab === 'wind' }" 
			  @click="switchTab('wind')"
			>
			{{echartsData.wind}}
			</button>
			<button 
			  :class="{ active: activeTab === 'solar' }" 
			  @click="switchTab('solar')"
			>
			{{echartsData.solar}}
			</button>
		</div>
	  </div>
	  
	  <!-- 自定义图例和时间选择器在一行 -->
	  <div class="legend-and-controls">
		<!-- 左侧自定义图例 -->
		<div class="custom-legend">
			<div class="legend-item">
				<span class="legend-text" style="color:#FFFFFF99;">(万kWh)</span>
			</div>
			<div class="legend-item">
				<div class="legend-icon legend-icon-predicted"></div>
				<span class="legend-text" style="color:#FFFFFFCC;">预测发电量</span>
			</div>
			<div class="legend-item">
				<div class="legend-icon legend-icon-actual"></div>
				<span class="legend-text" style="color:#FFFFFFCC;">实际发电量</span>
			</div>
			<div class="legend-item">
				<div class="legend-icon legend-icon-resource"></div>
				<span class="legend-text" style="color:#FFFFFFCC;">{{echartsData.IconCurve}}</span>
			</div>
		</div>
		
		<!-- 右侧时间选择器 -->
		<div class="time-selector">
		  <button 
			:class="{ active: timeType === 'month' }" 
			@click="switchTimeType('month')"
		  >
			月
		  </button>
		  <button 
			:class="{ active: timeType === 'year' }" 
			@click="switchTimeType('year')"
		  >
			年
		  </button>
		  <div class="legend-item">
				<span class="legend-text" style="color:#FFFFFF99;">{{echartsData.unitOfMeasurement}}</span>
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
	'all',
	'windPower',
	'photovoltaic',
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
      
      // 图表数据
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
        solar: {
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
  
  watch: {
    // 监听props变化，重新初始化数据
    all: {
      handler() {
        this.initializeData()
        this.$nextTick(() => {
          this.updateChart()
          this.updateData()
        })
      },
      deep: true
    },
    windPower: {
      handler() {
        this.initializeData()
        this.$nextTick(() => {
          this.updateChart()
          this.updateData()
        })
      },
      deep: true
    },
    photovoltaic: {
      handler() {
        this.initializeData()
        this.$nextTick(() => {
          this.updateChart()
          this.updateData()
        })
      },
      deep: true
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
    
    // 生成预测发电量（基于实际值的95%-115%）
    generatePredictedData(actualData) {
      return actualData.map(actual => {
        const ratio = 0.95 + Math.random() * 0.2 // 95%-115%
        return Math.round(actual * ratio)
      })
    },
    
	// 解析数据格式的辅助方法
	parseDataArray(dataArray) {
	if (!dataArray || !Array.isArray(dataArray) || dataArray.length === 0) {
		return null
	}
	
	// 按月份排序
	const sortedData = [...dataArray].sort((a, b) => {
		const monthA = parseInt(a.four_category.replace('月', ''))
		const monthB = parseInt(b.four_category.replace('月', ''))
		return monthA - monthB
	})
	
	return {
		predicted: sortedData.map(item => parseFloat(item.metric_name) || 0),
		actual: sortedData.map(item => parseFloat(item.metric_value) || 0),
		resource: sortedData.map(item => parseFloat(item.unit) || 0)
	}
	},
    
	initializeData() {
	// 解析传入的数据
	const allData = this.parseDataArray(this.all)
	const windData = this.parseDataArray(this.windPower)
	const solarData = this.parseDataArray(this.photovoltaic)
	
	if (allData && windData && solarData) {
		// 如果有全部数据，直接使用全部数据的资源情况
		this.chartData.all.month = {
		predicted: [...allData.predicted],
		actual: [...allData.actual],
		resource: [...allData.resource]  // 直接使用全部数据的资源情况，不计算平均值
		}
		
		this.chartData.wind.month = {
		predicted: [...windData.predicted],
		actual: [...windData.actual],
		resource: [...windData.resource]
		}
		
		this.chartData.solar.month = {
		predicted: [...solarData.predicted],
		actual: [...solarData.actual],
		resource: [...solarData.resource]
		}
		
		console.log('使用原始数据 - 全部资源情况:', this.chartData.all.month.resource)
		
	} else if (windData && solarData) {
		// 如果没有全部数据，但有风电和光伏数据，则计算全部数据
		this.chartData.wind.month = {
		predicted: [...windData.predicted],
		actual: [...windData.actual],
		resource: [...windData.resource]
		}
		
		this.chartData.solar.month = {
		predicted: [...solarData.predicted],
		actual: [...solarData.actual],
		resource: [...solarData.resource]
		}
		
		// 计算全部数据的平均值
		this.calculateAllDataFromWindAndSolar()
		
	} else if (allData) {
		// 如果只有全部数据，直接使用
		this.chartData.all.month = {
		predicted: [...allData.predicted],
		actual: [...allData.actual],
		resource: [...allData.resource]
		}
		
		// 为风电和光伏生成默认数据
		this.chartData.wind.month.predicted = this.generateRandomData(12, 800, 1200)
		this.chartData.wind.month.actual = this.generateActualData(this.chartData.wind.month.predicted)
		this.chartData.wind.month.resource = this.generateRandomData(12, 5.0, 10.0, 1)
		
		this.chartData.solar.month.predicted = this.generateRandomData(12, 250, 450)
		this.chartData.solar.month.actual = this.generateActualData(this.chartData.solar.month.predicted)
		this.chartData.solar.month.resource = this.generateRandomData(12, 2.5, 7.0, 1)
		
		console.log('只有全部数据 - 资源情况:', this.chartData.all.month.resource)
		
	} else {
		// 如果props数据不存在，使用默认随机数据
		this.chartData.wind.month.predicted = this.generateRandomData(12, 800, 1200)
		this.chartData.wind.month.actual = this.generateActualData(this.chartData.wind.month.predicted)
		this.chartData.wind.month.resource = this.generateRandomData(12, 5.0, 10.0, 1)
		
		this.chartData.solar.month.predicted = this.generateRandomData(12, 250, 450)
		this.chartData.solar.month.actual = this.generateActualData(this.chartData.solar.month.predicted)
		this.chartData.solar.month.resource = this.generateRandomData(12, 2.5, 7.0, 1)
		
		// 计算全部数据
		this.calculateAllData()
	}
	
	// ... 年度数据处理保持不变
	},
    
	// 新增方法：从风电和光伏数据计算全部数据
	calculateAllDataFromWindAndSolar() {
	// 计算预测发电量总和
	this.chartData.all.month.predicted = this.chartData.wind.month.predicted.map((val, index) => 
		val + this.chartData.solar.month.predicted[index]
	)
	
	// 计算实际发电量总和
	this.chartData.all.month.actual = this.chartData.wind.month.actual.map((val, index) => 
		val + this.chartData.solar.month.actual[index]
	)
	
	// 计算资源情况平均值（风速和辐照度的平均值作为综合资源指标）
	this.chartData.all.month.resource = this.chartData.wind.month.resource.map((val, index) => 
		parseFloat(((val + this.chartData.solar.month.resource[index]) / 2).toFixed(1))
	)
	},

	// 修改原有的计算方法
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
		parseFloat(((val + this.chartData.solar.month.resource[index]) / 2).toFixed(1))
	)
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
				left: '10',      // 更靠左
				right: '20',    // 适当调整右边距
				top: '20',       // 更靠上（给图表更多垂直空间）
				bottom: '40',    // 更靠下
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
				type: 'dashed' // 将底线改为虚线
				}
			},
			axisTick: {
				show: true,
				lineStyle: {
				color: '#2d5a87',
				type: 'dashed' // 刻度线也改为虚线
				}
			},
			axisLabel: {
				color: '#FFFFFFCC',
				fontSize: 26,
				margin: 20 // 增加标签与轴线的距离，相当于向下偏移20px
			}
			},
			yAxis: [
			{
				type: 'value',
				name: '',
				nameTextStyle: {
				color: '#f90',
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
				{
					name: '预测发电量',
					type: 'bar',
					yAxisIndex: 0,
					data: data.predicted,
					barWidth: 25,
					itemStyle: {
						// 透明渐变：从底部透明到顶部不透明，颜色为#0078CF
						color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
							{ offset: 0, color: 'rgba(0, 120, 207, 0.1)' }, // 底部：非常透明
							{ offset: 0.3, color: 'rgba(0, 120, 207, 0.2)' }, // 30%处：较透明
							{ offset: 0.6, color: 'rgba(0, 120, 207, 0.4)' }, // 60%处：半透明
							{ offset: 1, color: 'rgba(0, 120, 207, 0.6)' }    // 顶部：基本不透明
						]),
						borderColor: '#0078CF',
						borderWidth: 0,
						borderRadius: [0, 0, 0, 0]
					},
					// 添加标记点在柱子顶端，颜色为#00C2FF
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
					name: '实际发电量',
					type: 'bar',
					yAxisIndex: 0,
					data: data.actual,
					barWidth: 25,
					itemStyle: {
						// 透明渐变：从底部透明到顶部不透明，颜色为#00C0FF
						color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
							{ offset: 0, color: 'rgba(0, 192, 255, 0.1)' }, // 底部：非常透明
							{ offset: 0.3, color: 'rgba(0, 192, 255, 0.2)' }, // 30%处：较透明
							{ offset: 0.6, color: 'rgba(0, 192, 255, 0.4)' }, // 60%处：半透明
							{ offset: 1, color: 'rgba(0, 192, 255, 0.6)' }    // 顶部：基本不透明
						]),
						borderColor: '#00C0FF',
						borderWidth: 0,
						borderRadius: [0, 0, 0, 0]
					},
					// 添加标记点在柱子顶端，颜色为#23FFFC
					markPoint: {
						symbol: 'rect',
						symbolSize: [25, 8], // 宽度25，高度8
						itemStyle: {
							color: '#23FFFC',
							borderWidth: 0
						},
						data: data.actual.map((value, index) => ({
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
							{ offset: 0, color: 'rgba(255, 255, 255, 0.2)' },
							{ offset: 1, color: 'rgba(255, 255, 255, 0.05)' }
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
  
  // 自定义图例和时间选择器在一行
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
  
  .legend-icon {
    border-radius: 2px;
    &.legend-icon-predicted {
		width: 10px;
    	height: 20px;
		background: url("../../assets/images/homepage/icon-actual.png") center center no-repeat;
    }
    &.legend-icon-actual {
		width: 11px;
    	height: 20px;
		background: url("../../assets/images/homepage/icon-predicted.png") center center no-repeat;
    }
    &.legend-icon-resource {
		width: 26px;
    	height: 20px;
		position:relative;
		top:6px;
		background: url("../../assets/images/homepage/icon-resource.png") center center no-repeat;
    }
  }
  
  .legend-text {
    color: #7ec7ff;
    font-size: 26px;
    font-weight: bold;
    transition: color 0.3s ease;
  }
  
  // 时间选择器样式
  .time-selector {
    display: flex;
    gap: 20px;
	padding-right:20px;
    button {
      padding: 6px 30px;
      background: transparent;
      border: 1px solid #1e3c5a;
      color: #7ec7ff;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 26px;
      border-radius: 36px;
      &:hover {
        border-color: #00ccff;
        color: #00F0FF;
      }
      
      &.active {
        color:#00F0FF;
        border-color: #00ccff;
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
</style>
