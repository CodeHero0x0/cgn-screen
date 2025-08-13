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
      
      // 图表数据 - 使用更平均的堆叠数据
      chartData: {
        all: {
			month: {
				generator: [],      // 发电机组
				loss: []           // 性能损失
			},
			year: {
				generator: [],
				loss: []
			}
        },
        wind: {
			month: {
				generator: [],
				loss: []
			},
			year: {
				generator: [],
				loss: []
			}
        },
        solar: {
			month: {
				generator: [],
				loss: []
			},
			year: {
				generator: [],
				loss: []
			}
        }
      }
    }
  },
  
  computed: {
    xAxisData() {
      const timeLabels = {
        month: ['场站', '场站', '场站', '场站', '场站', '场站', '场站', '场站', '场站', '场站', '场站', '场站'],
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
    // 生成平衡的堆叠数据 - 两个部分比例相对平均
    generateBalancedStackData(count, totalMin, totalMax) {
      const data = {
        generator: [],
        loss: []
      }
      
      for (let i = 0; i < count; i++) {
        // 生成总值（带有平滑的趋势变化）
        const progress = i / (count - 1) // 0到1的进度
        const baseTrend = totalMin + (totalMax - totalMin) * (0.3 + 0.4 * progress) // 基础趋势
        const variation = (totalMax - totalMin) * 0.15 * (Math.random() - 0.5) // ±15%随机变化
        const totalValue = Math.round(baseTrend + variation)
        
        // 分配比例 - 让两个部分相对平均
        // 发电机组占 75-85%，性能损失占 15-25%
        const generatorRatio = 0.75 + Math.random() * 0.10 // 75%-85%
        const lossRatio = 1 - generatorRatio // 剩余部分
        
        data.generator.push(Math.round(totalValue * generatorRatio))
        data.loss.push(Math.round(totalValue * lossRatio))
      }
      
      return data
    },
    
    // 平衡数据生成方法（用于单独数据）
    generateBalancedData(count, min, max, decimals = 0) {
      const data = []
      const range = max - min
      const step = range / (count - 1)
      
      for (let i = 0; i < count; i++) {
        // 基础值按线性分布
        const baseValue = min + (step * i)
        // 添加小幅随机波动（±10%）
        const variation = baseValue * 0.1 * (Math.random() - 0.5) * 2
        const value = baseValue + variation
        
        // 确保值在范围内
        const clampedValue = Math.max(min, Math.min(max, value))
        data.push(decimals > 0 ? parseFloat(clampedValue.toFixed(decimals)) : Math.round(clampedValue))
      }
      
      return data
    },
    
    // 保留原有的随机数据生成方法
    generateRandomData(count, min, max, decimals = 0) {
      const data = []
      for (let i = 0; i < count; i++) {
        const value = Math.random() * (max - min) + min
        data.push(decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.round(value))
      }
      return data
    },
    
    // 初始化数据
    initializeData() {
      // 生成风电数据 - 月度总量 1000-1500万kWh
      const windMonthData = this.generateBalancedStackData(12, 1000, 1500)
      this.chartData.wind.month.generator = windMonthData.generator
      this.chartData.wind.month.loss = windMonthData.loss
      
      // 生成风电数据 - 年度总量 12000-18000万kWh
      const windYearData = this.generateBalancedStackData(5, 12000, 18000)
      this.chartData.wind.year.generator = windYearData.generator
      this.chartData.wind.year.loss = windYearData.loss
      
      // 生成光伏数据 - 月度总量 500-800万kWh
      const solarMonthData = this.generateBalancedStackData(12, 500, 800)
      this.chartData.solar.month.generator = solarMonthData.generator
      this.chartData.solar.month.loss = solarMonthData.loss
      
      // 生成光伏数据 - 年度总量 6000-10000万kWh
      const solarYearData = this.generateBalancedStackData(5, 6000, 10000)
      this.chartData.solar.year.generator = solarYearData.generator
      this.chartData.solar.year.loss = solarYearData.loss
      
      // 计算全部数据
      this.calculateAllData()
    },
    
    // 计算风电和光伏的总和数据
    calculateAllData() {
      // 计算月度数据
      this.chartData.all.month.generator = this.chartData.wind.month.generator.map((val, index) => 
        val + this.chartData.solar.month.generator[index]
      )
      this.chartData.all.month.loss = this.chartData.wind.month.loss.map((val, index) => 
        val + this.chartData.solar.month.loss[index]
      )
      
      // 计算年度数据
      this.chartData.all.year.generator = this.chartData.wind.year.generator.map((val, index) => 
        val + this.chartData.solar.year.generator[index]
      )
      this.chartData.all.year.loss = this.chartData.wind.year.loss.map((val, index) => 
        val + this.chartData.solar.year.loss[index]
      )
    },
    
    // 重新生成更平衡的随机数据
    refreshData() {
      // 重新初始化所有数据
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
                    name: '性能损失',
                    type: 'bar',
                    stack: 'total',
                    data: data.loss,
                    barWidth: '30%',
                    itemStyle: {
                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(0, 192, 255, 0.6)' },   // 顶部 60% 透明度
                            { offset: 0.5, color: 'rgba(0, 192, 255, 0.4)' }, // 中间 40% 透明度
                            { offset: 1, color: 'rgba(0, 192, 255, 0.2)' }    // 底部 20% 透明度
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
                {
                    name: '发电机组',
                    type: 'bar',
                    stack: 'total',
                    data: data.generator,
                    itemStyle: {
                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(0, 192, 255, 0.6)' },   // 顶部 60% 透明度
                            { offset: 0.5, color: 'rgba(0, 192, 255, 0.4)' }, // 中间 40% 透明度
                            { offset: 1, color: 'rgba(0, 192, 255, 0.2)' }    // 底部 20% 透明度
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
                // 横线系列 - 性能损失顶部
                {
                    name: '性能损失分割线',
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
	//background: url("../../../assets/images/homepage/Rectangle 330.png") center center no-repeat;
}
</style>
