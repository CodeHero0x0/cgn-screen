<template>
    <div class="risk-chart-container">
      <!-- 顶部统计卡片 -->
      <div class="stats-cards">
        <div class="stat-card" v-for="stat in statsData" :key="stat.label">
          <div class="stat-label">{{ stat.label }} <span class="stat-value" :class="stat.class">{{ stat.value }}</span></div>
        </div>
      </div>
      
      <!-- 图表容器 -->
      <div ref="chartContainer" class="chart-container"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'RiskChart',
  props: [
   'safetyoverviewData'
  ],
  data() {
    return {
      chart: null,
      chartData: null,
      processedData: null // 存储处理后的数据
    }
  },
  computed: {
    statsData() {
      if (!this.processedData) return []
      
      // 计算总数统计
      const totalStats = this.processedData.totalStats || {}
      return [
        {
          label: '风险库',
          value: totalStats['风险库'] || '0',
          class: 'risk-count'
        },
        {
          label: '隐患',
          value: totalStats['隐患'] || '0',
          class: 'danger-count'
        },
        {
          label: '安全事故',
          value: totalStats['安全事故'] || '0',
          class: 'accident-count'
        },
        {
          label: '高风险作业',
          value: totalStats['高风险作业'] || '0',
          class: 'high-risk-count'
        }
      ]
    }
  },
  watch: {
    safetyoverviewData: {
      handler(newData) {
        if (newData && Array.isArray(newData) && newData.length > 0) {
          this.processChartData()
          this.$nextTick(() => {
            if (this.chart) {
              this.updateChart()
            } else {
              this.initChart()
            }
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.registerCustomSymbols()
    this.$nextTick(() => {
      if (this.safetyoverviewData && Array.isArray(this.safetyoverviewData)) {
        this.processChartData()
        this.initChart()
      }
    })
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose()
    }
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    // 处理父组件传来的数据
    processChartData() {
      if (!this.safetyoverviewData || !Array.isArray(this.safetyoverviewData)) {
        return
      }

      // 按场站分组数据
      const groupedData = {}
      const totalStats = {}
      
      this.safetyoverviewData.forEach(item => {
        const station = item.mid_category
        const metricName = item.metric_name
        const value = parseInt(item.metric_value) || 0

        // 初始化场站数据
        if (!groupedData[station]) {
          groupedData[station] = {}
        }
        
        // 存储数据
        groupedData[station][metricName] = value
        
        // 计算总计（除了隐患相关的具体分类，避免重复计算）
        if (!['较小隐患', '一般隐患', '较大隐患', '重大隐患'].includes(metricName)) {
          totalStats[metricName] = (totalStats[metricName] || 0) + value
        }
      })

      // 定义隐患等级和场站顺序
      const hazardCategories = ['较小隐患', '一般隐患', '较大隐患', '重大隐患']
      const stations = Object.keys(groupedData)
      
      // 生成图表需要的系列数据
      const series = stations.map(station => ({
        name: station,
        data: hazardCategories.map(category => groupedData[station][category] || 0)
      }))

      // 计算占比数据（每个隐患等级在所有场站中的占比）
      const lineData = hazardCategories.map(category => {
        const totalForCategory = stations.reduce((sum, station) => {
          return sum + (groupedData[station][category] || 0)
        }, 0)
        const overallTotal = stations.reduce((sum, station) => {
          return sum + hazardCategories.reduce((catSum, cat) => {
            return catSum + (groupedData[station][cat] || 0)
          }, 0)
        }, 0)
        return overallTotal > 0 ? Math.round((totalForCategory / overallTotal) * 100) : 0
      })

      // 定义系列颜色配置
      const seriesColors = [
        { bottom: '#00C0FF', top: '#23FFFC' }, // 莱州海上风储电
        { bottom: '#0078CF', top: '#00C2FF' }, // 莱州土山光伏电
        { bottom: '#FF8A00', top: '#FFC809' }, // 枣庄风电场
        { bottom: '#8CFFB8', top: '#8CFFB8' }, // 太平山风电场
        { bottom: '#8C96FF', top: '#8C96FF' }  // 摘月山风电场
      ]

      // 定义自定义图标
      const customIcons = {}
      stations.forEach((station, index) => {
        if (station.includes('海上') || station.includes('风储')) {
          customIcons[station] = { type: 'custom', value: 'windTurbine' }
        } else if (station.includes('光伏')) {
          customIcons[station] = { type: 'custom', value: 'solarPanel' }
        } else if (station.includes('风电')) {
          const shapes = ['triangle', 'circle', 'diamond']
          customIcons[station] = { type: 'shape', value: shapes[index % shapes.length] }
        } else {
          customIcons[station] = { type: 'shape', value: 'rect' }
        }
      })
      
      // 占比线配置
      customIcons['占比'] = { type: 'shape', value: 'rect' }

      // 设置处理后的数据
      this.processedData = {
        totalStats,
        groupedData
      }

      this.chartData = {
        categories: hazardCategories,
        series,
        lineData,
        seriesColors: seriesColors.slice(0, stations.length),
        customIcons,
        lineConfig: {
          name: '占比',
          color: '#FFD700'
        }
      }
    },

    // 注册自定义符号
    registerCustomSymbols() {
      // 注册风力发电机符号
      echarts.graphic.registerShape('windTurbine', {
        shape: {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        },
        buildPath: function(path, shape) {
          const cx = shape.x + shape.width / 2
          const cy = shape.y + shape.height / 2
          const r = Math.min(shape.width, shape.height) / 2
          
          // 绘制风力发电机
          path.circle(cx, cy, r * 0.2) // 中心圆
          // 三个叶片
          for (let i = 0; i < 3; i++) {
            const angle = (i * 120) * Math.PI / 180
            const x1 = cx + Math.cos(angle) * r * 0.2
            const y1 = cy + Math.sin(angle) * r * 0.2
            const x2 = cx + Math.cos(angle) * r * 0.8
            const y2 = cy + Math.sin(angle) * r * 0.8
            path.moveTo(x1, y1)
            path.lineTo(x2, y2)
          }
        }
      })
      
      // 注册太阳能板符号
      echarts.graphic.registerShape('solarPanel', {
        shape: {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        },
        buildPath: function(path, shape) {
          const x = shape.x
          const y = shape.y
          const w = shape.width
          const h = shape.height
          
          // 绘制太阳能板
          path.rect(x + w * 0.1, y + h * 0.1, w * 0.8, h * 0.8)
          // 网格线
          for (let i = 1; i < 3; i++) {
            path.moveTo(x + w * 0.1 + (w * 0.8 / 3) * i, y + h * 0.1)
            path.lineTo(x + w * 0.1 + (w * 0.8 / 3) * i, y + h * 0.9)
          }
          for (let i = 1; i < 3; i++) {
            path.moveTo(x + w * 0.1, y + h * 0.1 + (h * 0.8 / 3) * i)
            path.lineTo(x + w * 0.9, y + h * 0.1 + (h * 0.8 / 3) * i)
          }
        }
      })
    },

    initChart() {
      if (!this.$refs.chartContainer) return
      this.chart = echarts.init(this.$refs.chartContainer)
      this.updateChart()
    },

    // 将hex颜色转换为rgba
    hexToRgba(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    },

    // 获取自定义图标
    getCustomIcon(seriesName) {
      if (!this.chartData || !this.chartData.customIcons) return 'rect'
      
      const iconConfig = this.chartData.customIcons[seriesName]
      if (!iconConfig) return 'rect'
      
      switch (iconConfig.type) {
        case 'shape':
          return iconConfig.value
        case 'custom':
          return iconConfig.value
        case 'image':
          return `image://${iconConfig.value}`
        case 'path':
          return `path://${iconConfig.value}`
        default:
          return 'rect'
      }
    },

    // 创建指定系列的渐变色
    createBarGradient(seriesIndex) {
      if (!this.chartData || !this.chartData.seriesColors) return this.createDefaultGradient()
      
      const colors = this.chartData.seriesColors[seriesIndex]
      if (!colors) return this.createDefaultGradient()
      
      return new echarts.graphic.LinearGradient(0, 1, 0, 0, [
        { offset: 0, color: this.hexToRgba(colors.bottom, 0.1) },
        { offset: 0.2, color: this.hexToRgba(colors.bottom, 0.15) },
        { offset: 0.4, color: this.hexToRgba(colors.bottom, 0.25) },
        { offset: 0.6, color: this.hexToRgba(colors.top, 0.35) },
        { offset: 0.8, color: this.hexToRgba(colors.top, 0.45) },
        { offset: 1, color: this.hexToRgba(colors.top, 0.6) }
      ])
    },

    // 悬停时的渐变色
    createHoverBarGradient(seriesIndex) {
      if (!this.chartData || !this.chartData.seriesColors) return this.createDefaultHoverGradient()
      
      const colors = this.chartData.seriesColors[seriesIndex]
      if (!colors) return this.createDefaultHoverGradient()
      
      return new echarts.graphic.LinearGradient(0, 1, 0, 0, [
        { offset: 0, color: this.hexToRgba(colors.bottom, 0.2) },
        { offset: 0.2, color: this.hexToRgba(colors.bottom, 0.3) },
        { offset: 0.4, color: this.hexToRgba(colors.bottom, 0.4) },
        { offset: 0.6, color: this.hexToRgba(colors.top, 0.55) },
        { offset: 0.8, color: this.hexToRgba(colors.top, 0.7) },
        { offset: 1, color: this.hexToRgba(colors.top, 0.85) }
      ])
    },

    // 默认渐变色
    createDefaultGradient() {
      return new echarts.graphic.LinearGradient(0, 1, 0, 0, [
        { offset: 0, color: this.hexToRgba('#00C0FF', 0.1) },
        { offset: 1, color: this.hexToRgba('#23FFFC', 0.6) }
      ])
    },

    // 默认悬停渐变色
    createDefaultHoverGradient() {
      return new echarts.graphic.LinearGradient(0, 1, 0, 0, [
        { offset: 0, color: this.hexToRgba('#00C0FF', 0.2) },
        { offset: 1, color: this.hexToRgba('#23FFFC', 0.85) }
      ])
    },

    // 获取系列顶部颜色
    getSeriesTopColor(seriesIndex) {
      if (!this.chartData || !this.chartData.seriesColors) return '#23FFFC'
      
      const colors = this.chartData.seriesColors[seriesIndex]
      return colors ? colors.top : '#23FFFC'
    },

    updateChart() {
      if (!this.chart || !this.chartData) return

      // 动态计算Y轴最大值
      const maxValue = Math.max(
        ...this.chartData.series.flatMap(series => series.data),
        100
      )
      const yAxisMax = Math.ceil(maxValue * 1.2 / 100) * 100

      const option = {
        backgroundColor: 'transparent',
        grid: {
          left: '0',
          right: '10',
          top: '80',
          bottom: '20',
          containLabel: true
        },
        legend: {
          data: [
            ...this.chartData.series.map(item => ({
              name: item.name,
              icon: this.getCustomIcon(item.name)
            })),
            {
              name: this.chartData.lineConfig.name,
              icon: this.getCustomIcon(this.chartData.lineConfig.name)
            }
          ],
          top: '8%',
          left: 'center',
          textStyle: {
            color: '#ffffff',
            fontSize: 26
          },
          itemWidth: 14,
          itemHeight: 10,
          itemGap: 25
        },
        xAxis: {
          type: 'category',
          data: this.chartData.categories,
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.2)'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#ffffff',
            fontSize: 26,
            margin: 20,
            fontWeight: '400'
          }
        },
        yAxis: [
          {
            type: 'value',
            name: '',
            position: 'left',
            max: yAxisMax,
            min: 0,
            interval: Math.ceil(yAxisMax / 5),
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#00D4FF',
              fontSize: 26
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.08)',
                type: 'dashed',
                width: 1
              }
            }
          },
          {
            type: 'value',
            name: '',
            position: 'right',
            max: 100,
            min: 0,
            interval: 20,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#00D4FF',
              fontSize: 26
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          // 柱状图系列
          ...this.chartData.series.map((item, index) => ({
            name: item.name,
            type: 'bar',
            yAxisIndex: 0,
            data: item.data,
            barWidth: 26,
            barGap: '20%',
            itemStyle: {
              color: this.createBarGradient(index),
              shadowBlur: 6,
              shadowColor: this.hexToRgba(this.chartData.seriesColors[index]?.bottom || '#00C0FF', 0.1),
              shadowOffsetY: 2,
              borderWidth: 0
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: this.hexToRgba(this.chartData.seriesColors[index]?.bottom || '#00C0FF', 0.2),
                shadowOffsetY: 4,
                color: this.createHoverBarGradient(index)
              }
            },
            z: 2
          })),

          // 柱子顶端实线
          ...this.chartData.series.map((item, seriesIndex) => ({
            name: `${item.name}_顶线`,
            type: 'scatter',
            yAxisIndex: 0,
            data: item.data.map((value, categoryIndex) => {
              if (value === 0) return null
              
              const seriesCount = this.chartData.series.length
              const barWidth = 26
              const barGap = 0.2
              const totalBarWidth = barWidth * seriesCount
              const totalGapWidth = barWidth * barGap * (seriesCount - 1)
              const groupWidth = totalBarWidth + totalGapWidth
              
              const startOffset = -(groupWidth / 2) + (barWidth / 2)
              const barOffset = startOffset + seriesIndex * (barWidth * (1 + barGap))
              
              return [categoryIndex, value, barOffset]
            }).filter(item => item !== null),
            symbol: 'rect',
            symbolSize: [26, 8],
            symbolOffset: function(data) {
              return [data[2] || 0, 0]
            },
            itemStyle: {
              color: this.getSeriesTopColor(seriesIndex),
              borderWidth: 0,
              opacity: 1
            },
            emphasis: {
              disabled: true
            },
            silent: true,
            tooltip: {
              show: false
            },
            legendHoverLink: false,
            z: 5
          })),

          // 折线图系列
          {
            name: this.chartData.lineConfig.name,
            type: 'line',
            yAxisIndex: 1,
            data: this.chartData.lineData,
            lineStyle: {
              color: this.hexToRgba(this.chartData.lineConfig.color, 0.6),
              width: 3,
              shadowBlur: 8,
              shadowColor: this.hexToRgba(this.chartData.lineConfig.color, 0.2)
            },
            itemStyle: {
              color: this.hexToRgba(this.chartData.lineConfig.color, 0.8),
              borderWidth: 4,
              borderColor: this.hexToRgba(this.chartData.lineConfig.color, 0.6),
              shadowBlur: 10,
              shadowColor: this.hexToRgba(this.chartData.lineConfig.color, 0.3)
            },
            symbol: this.getCustomIcon(this.chartData.lineConfig.name),
            symbolSize: 10,
            emphasis: {
              itemStyle: {
                shadowBlur: 15,
                shadowColor: this.hexToRgba(this.chartData.lineConfig.color, 0.5),
                borderWidth: 6,
                color: this.hexToRgba(this.chartData.lineConfig.color, 0.9),
                borderColor: this.hexToRgba(this.chartData.lineConfig.color, 0.8)
              },
              lineStyle: {
                width: 4,
                color: this.hexToRgba(this.chartData.lineConfig.color, 0.8)
              }
            },
            smooth: false,
            z: 4
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: 'rgba(255, 255, 255, 0.6)'
            },
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.4)',
              type: 'dashed'
            }
          },
          backgroundColor: 'rgba(0, 20, 40, 0.9)',
          borderColor: 'rgba(0, 212, 255, 0.5)',
          borderWidth: 1,
          textStyle: {
            color: '#ffffff',
            fontSize: 26
          },
          padding: [12, 16],
          extraCssText: 'border-radius: 8px; backdrop-filter: blur(10px);',
          formatter: (params) => {
            let html = `<div style="margin-bottom: 8px; font-weight: bold; color: #00D4FF; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px;">${params[0].axisValue}</div>`
            
            params.forEach(param => {
              if (param.seriesName === this.chartData.lineConfig.name) {
                html += `<div style="margin: 6px 0; display: flex; align-items: center;">
                  <span style="display:inline-block;width:12px;height:3px;background:${this.hexToRgba(this.chartData.lineConfig.color, 0.6)};margin-right:8px;border-radius:2px;"></span>
                  <span style="color: ${this.hexToRgba(this.chartData.lineConfig.color, 0.9)}; font-weight: bold;">${param.seriesName}: ${param.value}%</span>
                </div>`
              } else if (param.value > 0 && !param.seriesName.includes('_顶线')) {
                const seriesIndex = this.chartData.series.findIndex(s => s.name === param.seriesName)
                const colors = this.chartData.seriesColors[seriesIndex]
                const gradientStyle = colors ? 
                  `linear-gradient(to top, ${this.hexToRgba(colors.bottom, 0.3)}, ${this.hexToRgba(colors.top, 0.8)})` :
                  'linear-gradient(to top, rgba(0,192,255,0.3), rgba(35,255,252,0.8))'
                
                html += `<div style="margin: 6px 0; display: flex; align-items: center;">
                  <span style="display:inline-block;width:12px;height:12px;background:${gradientStyle};margin-right:8px;border-radius:2px;"></span>
                  <span>${param.seriesName}: <strong style="color: #00D4FF;">${param.value}</strong></span>
                </div>`
              }
            })
            
            return html
          }
        }
      }

      this.chart.setOption(option)
    },

    handleResize() {
      if (this.chart) {
        this.chart.resize()
      }
    }
  }
}
</script>

<style scoped>
.risk-chart-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.risk-chart-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}

.stats-cards {
  display: flex;
  gap: 24px;
  margin-bottom: 25px;
  justify-content: left;
  position: relative;
  z-index: 1;
}

.stat-card {
  border-radius: 10px;
  padding: 6px 10px;
  text-align: center;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  width: 199px;
  height: 36px;
  line-height: 36px;
  
  border-radius: 4px;
  border: 1px solid rgba(75, 195, 255, 0.47);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.8), transparent);
  transition: left 0.5s ease;
}

.stat-card:hover::before {
  left: 100%;
}

.stat-card:hover {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06));
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 212, 255, 0.1);
}

.stat-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 26px;
  margin-bottom: 10px;
  font-weight: 400;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 26px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
  float: right;
}

.chart-container {
  width: 100%;
  height: 390px;
  border-radius: 12px;
  border: 1px solid rgba(0, 212, 255, 0.15);
  position: relative;
  z-index: 1;
}
</style>
