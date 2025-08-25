<template>
	<div class="power-generation-chart">
	  <!-- 头部控制区域 -->
    <div class="chart-header" :class="{ 'power-generation': StackedBarChartData.name === '场内受累','power-generationplan': StackedBarChartData.name === '场外受累' }">
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
			<div class="legend-item">
				<div class="legend-icon legend-icon-loss"></div>
				<span class="legend-text" style="color:#FFFFFFCC;">{{StackedBarChartData.unitOfMeasurement}}</span>
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
  props: [
    'StackedBarChartData',
    'getMonthlyGeneratorSetData', // 月度数据
    'getMonthlyPowerTransmissionData' // 年累计数据
  ],
  data() {
    return {
      // 默认选择全部
      activeTab: 'all',
      timeType: 'month',
      chart: null,
      totalGenerator: 0,
      totalTransmission: 0,
      totalLoss: 0
    }
  },
  
  computed: {
    xAxisData() {
      const timeLabels = {
        month: this.getMonthlyGeneratorSetData ? 
          this.getMonthlyGeneratorSetData.map(item => item.four_category) : 
          ['场站', '场站', '场站', '场站', '场站', '场站', '场站', '场站', '场站', '场站', '场站', '场站'],
        year: ['2019年', '2020年', '2021年', '2022年', '2023年']
      }
      return timeLabels[this.timeType]
    },
    
    // 计算图表数据
    chartData() {
      const data = {
        all: {
          month: {
            generator: [],
            transmission: [],
            loss: []
          },
          year: {
            generator: [],
            transmission: [],
            loss: []
          }
        },
        wind: {
          month: {
            generator: [],
            transmission: [],
            loss: []
          },
          year: {
            generator: [],
            transmission: [],
            loss: []
          }
        },
        solar: {
          month: {
            generator: [],
            transmission: [],
            loss: []
          },
          year: {
            generator: [],
            transmission: [],
            loss: []
          }
        }
      }
      
      // 处理月度数据 (getMonthlyGeneratorSetData)
      if (this.getMonthlyGeneratorSetData && this.getMonthlyGeneratorSetData.length > 0) {
        this.getMonthlyGeneratorSetData.forEach(item => {
          // metric_name：发电机组
          // metric_value：输变电（升压站、集电线路）
          // unit：性能损失
          const generator = parseFloat(item.metric_name) || 0
          const transmission = parseFloat(item.metric_value) || 0
          const loss = parseFloat(item.unit) || 0
          
          // 全部数据
          data.all.month.generator.push(generator)
          data.all.month.transmission.push(transmission)
          data.all.month.loss.push(loss)
          
          // 假设风电占总数据的60%，光伏占40%（可以根据实际情况调整）
          data.wind.month.generator.push(Math.round(generator * 0.6))
          data.wind.month.transmission.push(Math.round(transmission * 0.6))
          data.wind.month.loss.push(Math.round(loss * 0.6))
          
          data.solar.month.generator.push(Math.round(generator * 0.4))
          data.solar.month.transmission.push(Math.round(transmission * 0.4))
          data.solar.month.loss.push(Math.round(loss * 0.4))
        })
      }
      
      // 处理年累计数据 (getMonthlyPowerTransmissionData)
      if (this.getMonthlyPowerTransmissionData && this.getMonthlyPowerTransmissionData.length > 0) {
        // 取前5个数据作为年度数据
        const yearData = this.getMonthlyPowerTransmissionData.slice(0, 5)
        yearData.forEach(item => {
          const generator = parseFloat(item.metric_name) || 0
          const transmission = parseFloat(item.metric_value) || 0
          const loss = parseFloat(item.unit) || 0
          
          // 全部数据
          data.all.year.generator.push(generator)
          data.all.year.transmission.push(transmission)
          data.all.year.loss.push(loss)
          
          // 风电和光伏数据分配
          data.wind.year.generator.push(Math.round(generator * 0.6))
          data.wind.year.transmission.push(Math.round(transmission * 0.6))
          data.wind.year.loss.push(Math.round(loss * 0.6))
          
          data.solar.year.generator.push(Math.round(generator * 0.4))
          data.solar.year.transmission.push(Math.round(transmission * 0.4))
          data.solar.year.loss.push(Math.round(loss * 0.4))
        })
      }
      
      return data
    }
  },
  
  watch: {
    // 监听父组件数据变化，重新渲染图表
    getMonthlyGeneratorSetData: {
      handler() {
        this.$nextTick(() => {
          this.updateChart()
          this.updateData()
        })
      },
      deep: true
    },
    getMonthlyPowerTransmissionData: {
      handler() {
        this.$nextTick(() => {
          this.updateChart()
          this.updateData()
        })
      },
      deep: true
    }
  },
  
  mounted() {
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
      this.totalTransmission = data.transmission.reduce((sum, val) => sum + val, 0)
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
          // 柱状图系列
          {
            name: '性能损失',
            type: 'bar',
            stack: 'total',
            data: data.loss,
            barWidth: '30%',
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(0, 120, 207, 0.4)' },
                { offset: 0.5, color: 'rgba(0, 120, 2075, 0.4)' },
                { offset: 1, color: 'rgba(0, 120, 207, 0.4)' }
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
            name: '输变电',
            type: 'bar',
            stack: 'total',
            data: data.transmission,
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(0, 192, 255, 0.4)' },
                { offset: 0.5, color: 'rgba(0, 192, 255, 0.4)' },
                { offset: 1, color: 'rgba(0, 192, 255, 0.4)' }
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
            name: '发电机组',
            type: 'bar',
            stack: 'total',
            data: data.generator,
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(140, 255, 184, 0.4)' },
                { offset: 0.5, color: 'rgba(140, 255, 184, 0.4)' },
                { offset: 1, color: 'rgba(140, 255, 184, 0.4)' }
              ]),
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: [0, 0, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(140, 255, 184, 0.4)' },
                  { offset: 0.5, color: 'rgba(140, 255, 184, 0.4)' },
                  { offset: 1, color: 'rgba(140, 255, 184, 0.4)' }
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
          // 横线系列 - 输变电顶部
          {
            name: '输变电分割线',
            type: 'line',
            data: data.loss.map((value, index) => value + data.transmission[index]),
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
            data: data.loss.map((value, index) => value + data.transmission[index] + data.generator[index]),
            symbol: 'rect',
            symbolSize: [30, 4],
            symbolRotate: 0,
            lineStyle: {
              width: 0,
              opacity: 0
            },
            itemStyle: {
              color: '#8CFFB8',
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
  width: 100%;
  height: 100%;
  border-radius: 4px;
  padding: 0px;
  color: #7ec7ff;
  .power-generation{
	background: url("../../assets/images/homepage/changneishoulei.png") center center no-repeat;
  }
  .power-generationplan{
	background: url("../../assets/images/homepage/changwaishoulei.png") center center no-repeat;
  }
  .chart-header {
    width: 100%;
    height: 100px;
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
      margin-left: 1000px;
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
  }
  
  .chart-container {
    width: 1374px;
    height: 376px;
    border-radius: 4px;
  }
}
</style>
