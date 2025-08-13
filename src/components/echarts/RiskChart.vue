<template>
    <div class="risk-chart-container">
      <!-- 顶部统计卡片 -->
      <div class="stats-cards">
        <div class="stat-card" v-for="stat in statsData" :key="stat.label">
          <div class="stat-label">{{ stat.label }} <span class="stat-value"  :class="stat.class">{{ stat.value }}</span></div>
        </div>
      </div>
      <div ref="chartConfig">
          <div data-categories='["较小隐患", "一般隐患", "较大隐患", "重大隐患"]'></div>
          <div data-line-data="[85, 5, 3, 1]"></div>
          
          <!-- 系列数据配置 -->
          <div class="series-config">
            <div 
              data-name="莱州海上风电站"
              data-values="[280, 0, 0, 0]"
              data-color-bottom="#00C0FF"
              data-color-top="#23FFFC"
              data-icon-type="custom"
              data-icon-value="windTurbine"
            ></div>
            
            <div 
              data-name="莱州土山光伏电站"
              data-values="[310, 0, 0, 0]"
              data-color-bottom="#0078CF"
              data-color-top="#00C2FF"
              data-icon-type="custom"
              data-icon-value="solarPanel"
            ></div>
            
            <div 
              data-name="枣庄风电场"
              data-values="[350, 0, 0, 0]"
              data-color-bottom="#FF8A00"
              data-color-top="#FFC809"
              data-icon-type="shape"
              data-icon-value="triangle"
            ></div>
            
            <div 
              data-name="太平山风电场"
              data-values="[290, 0, 0, 0]"
              data-color-bottom="#8CFFB8"
              data-color-top="#8CFFB8"
              data-icon-type="shape"
              data-icon-value="circle"
            ></div>
            
            <div 
              data-name="涧月山风电场"
              data-values="[320, 0, 0, 0]"
              data-color-bottom="#8C96FF"
              data-color-top="#8C96FF"
              data-icon-type="shape"
              data-icon-value="diamond"
            ></div>
          </div>
          
          <!-- 占比线配置 -->
          <div 
            class="line-config"
            data-name="占比"
            data-color="#FFD700"
            data-icon-type="shape"
            data-icon-value="rect"
          ></div>
        </div>
      <!-- 图表容器 -->
      <div ref="chartContainer" class="chart-container"></div>
      
      <!-- 隐藏的数据配置 -->
      <div style="display: none;">
        <!-- 图表基础数据 -->
        
      </div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts'
  
  export default {
    name: 'RiskChart',
    props: {
      // 统计数据
      stats: {
        type: Array,
        default: () => [
          { label: '风险库', value: '8848', class: 'normal' },
          { label: '隐患', value: '9999+', class: 'warning' },
          { label: '安全事故', value: '138', class: 'danger' },
          { label: '高风险作业', value: '3', class: 'high-risk' }
        ]
      }
    },
    data() {
      return {
        chart: null,
        chartData: null // 将从模板中读取
      }
    },
    computed: {
      statsData() {
        return this.stats
      }
    },
    mounted() {
      this.registerCustomSymbols()
      this.loadChartDataFromTemplate()
      this.initChart()
      window.addEventListener('resize', this.handleResize)
    },
    beforeUnmount() {
      if (this.chart) {
        this.chart.dispose()
      }
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      // 从模板中加载图表数据
      loadChartDataFromTemplate() {
        const configElement = this.$refs.chartConfig
        const categoriesElement = configElement.querySelector('[data-categories]')
        const lineDataElement = configElement.querySelector('[data-line-data]')
        const seriesElements = configElement.querySelectorAll('.series-config > div')
        const lineConfigElement = configElement.querySelector('.line-config')
        
        // 解析基础数据
        const categories = JSON.parse(categoriesElement.getAttribute('data-categories'))
        const lineData = JSON.parse(lineDataElement.getAttribute('data-line-data'))
        
        // 解析系列数据
        const series = []
        const seriesColors = []
        const customIcons = {}
        
        seriesElements.forEach(element => {
          const name = element.getAttribute('data-name')
          const values = JSON.parse(element.getAttribute('data-values'))
          const colorBottom = element.getAttribute('data-color-bottom')
          const colorTop = element.getAttribute('data-color-top')
          const iconType = element.getAttribute('data-icon-type')
          const iconValue = element.getAttribute('data-icon-value')
          
          series.push({ name, data: values })
          seriesColors.push({ bottom: colorBottom, top: colorTop })
          customIcons[name] = { type: iconType, value: iconValue }
        })
        
        // 解析占比线配置
        const lineName = lineConfigElement.getAttribute('data-name')
        const lineColor = lineConfigElement.getAttribute('data-color')
        const lineIconType = lineConfigElement.getAttribute('data-icon-type')
        const lineIconValue = lineConfigElement.getAttribute('data-icon-value')
        
        customIcons[lineName] = { type: lineIconType, value: lineIconValue }
        
        // 设置解析后的数据
        this.chartData = {
          categories,
          series,
          lineData,
          seriesColors,
          customIcons,
          lineConfig: {
            name: lineName,
            color: lineColor
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
        const colors = this.chartData.seriesColors[seriesIndex]
        return colors ? colors.top : '#23FFFC'
      },
  
      updateChart() {
        if (!this.chart || !this.chartData) return
  
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
              max: 500,
              min: 0,
              interval: 100,
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
  