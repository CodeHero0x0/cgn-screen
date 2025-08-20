<template>
  <div class="power-limitation-overview">
    <!-- 头部标签切换 -->
    <div class="header-img"></div>
    
    <!-- 系列标签 -->
    <span class="header-span">(%)</span>
    <div class="series-labels">
      
      <div 
        v-for="(name, index) in seriesNames" 
        :key="index"
        class="label-item"
        :class="{ 'active': currentHighlightSeriesIndex === index }"
        :style="{ 
          '--label-color': colors[index],
          '--dim-color': dimColors[index] 
        }"
        @mouseenter="onLabelHover(index)"
        @mouseleave="onLabelLeave"
      >
        <div class="label-indicator"></div>
        <span class="label-text">{{ name }}</span>
      </div>
    </div>
    
    <div class="stacked-bar-chart">
      <div ref="chart" class="chart-container"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
name: 'StreamChart',
props: {
  getAffectedOnSiteData: {
    type: Array,
    default: () => []
  }
},
data() {
  return {
    chart: null,
    currentHighlightSeriesIndex: 0,
    autoRotateTimer: null,
    isHovering: false,
    
    seriesNames: ['场内受累', '限电损失', '计划停运', '场外受累'],
    categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    // 主体色（亮色）
    colors: ['#4992FF', '#FDDD60', '#7CFFB2', '#FF9F5A'],
    // 虚化色（暗色）
    dimColors: [ '#4992FF', '#FDDD60', '#7CFFB2', '#FF9F5A']
  }
},

computed: {
  // 处理传入的数据，转换为组件需要的格式
  rawData() {
    if (!this.getAffectedOnSiteData || this.getAffectedOnSiteData.length === 0) {
      return this.generateDefaultData()
    }
    
    // 按月份分组数据
    const dataByMonth = {}
    this.getAffectedOnSiteData.forEach(item => {
      const month = item.sub_category
      if (!dataByMonth[month]) {
        dataByMonth[month] = {}
      }
      
      // 根据字段映射到对应的系列
      dataByMonth[month]['场内受累'] = parseFloat(item.four_category) || 0
      dataByMonth[month]['限电损失'] = parseFloat(item.metric_name) || 0
      dataByMonth[month]['计划停运'] = parseFloat(item.metric_value) || 0
      dataByMonth[month]['场外受累'] = parseFloat(item.unit) || 0
    })
    
    // 转换为 rawData 格式：[系列1数据, 系列2数据, ...]
    const processedData = []
    this.seriesNames.forEach(seriesName => {
      const seriesData = []
      this.categories.forEach(month => {
        seriesData.push(dataByMonth[month]?.[seriesName] || 0)
      })
      processedData.push(seriesData)
    })
    
    return processedData
  },
  
  totalData() {
    const total = []
    for (let i = 0; i < this.rawData[0].length; ++i) {
      let sum = 0
      for (let j = 0; j < this.rawData.length; ++j) {
        sum += this.rawData[j][i]
      }
      total.push(sum)
    }
    return total
  }
},

watch: {
  // 监听父组件数据变化，更新图表
  getAffectedOnSiteData: {
    handler() {
      if (this.chart) {
        this.updateChart()
      }
    },
    deep: true
  }
},

mounted() {
  this.initChart()
  this.startAutoRotate()
},

beforeDestroy() {
  if (this.autoRotateTimer) {
    clearInterval(this.autoRotateTimer)
  }
  if (this.chart) {
    this.chart.dispose()
  }
  window.removeEventListener('resize', this.handleResize)
},

methods: {
  initChart() {
    if (!this.$refs.chart) return
    
    this.chart = echarts.init(this.$refs.chart)
    this.updateChart()
    
    // 绑定鼠标事件
    this.chart.on('mouseover', this.onChartMouseOver)
    this.chart.on('mouseout', this.onChartMouseOut)
    
    // 窗口大小改变时重新渲染
    window.addEventListener('resize', this.handleResize)
  },
  
  updateChart() {
    if (!this.chart) return
    
    const grid = {
      left: 80,
      right: 50,
      top: 30, // 减少顶部间距
      bottom: 70 // 增加底部间距，为月份标签留出20px空间
    }
    
    const gridWidth = this.chart.getWidth() - grid.left - grid.right
    const gridHeight = this.chart.getHeight() - grid.top - grid.bottom
    const categoryWidth = gridWidth / this.rawData[0].length
    const barWidth = categoryWidth * 0.5
    const barPadding = (categoryWidth - barWidth) / 2
    
    // 生成系列数据 - 基于原代码逻辑
    const series = this.seriesNames.map((name, sid) => {
      const isHighlight = this.currentHighlightSeriesIndex === sid
      
      return {
        name,
        type: 'bar',
        stack: 'total',
        barWidth: '50%',
        itemStyle: {
          color: isHighlight ? this.colors[sid] : this.dimColors[sid],
          opacity: isHighlight ? 1 : 0.3,
        },
        label: {
          show: isHighlight,
          position: 'inside',
          formatter: (params) => {
            return Math.round(params.value * 1000) / 10 + '%'
          },
          color: '#4F280C',
          fontSize: 26,
          fontWeight: 'bold',
          textShadowColor: 'rgba(0, 0, 0, 0.8)',
          textShadowBlur: 2
        },
        emphasis: {
          focus: 'series',
          itemStyle: {
            color: this.colors[sid],
            opacity: 1,
          }
        },
        data: this.rawData[sid].map((d, did) =>
          this.totalData[did] <= 0 ? 0 : d / this.totalData[did]
        )
      }
    })
    
    // 生成流式连接元素 - 完全基于原代码逻辑
    const elements = []
    for (let j = 1, jlen = this.rawData[0].length; j < jlen; ++j) {
      const leftX = grid.left + categoryWidth * j - barPadding
      const rightX = leftX + barPadding * 2
      let leftY = grid.top + gridHeight
      let rightY = leftY
      
      for (let i = 0, len = series.length; i < len; ++i) {
        const points = []
        const leftBarHeight = (this.rawData[i][j - 1] / this.totalData[j - 1]) * gridHeight
        points.push([leftX, leftY])
        points.push([leftX, leftY - leftBarHeight])
        
        const rightBarHeight = (this.rawData[i][j] / this.totalData[j]) * gridHeight
        points.push([rightX, rightY - rightBarHeight])
        points.push([rightX, rightY])
        points.push([leftX, leftY])
        
        leftY -= leftBarHeight
        rightY -= rightBarHeight
        
        const isHighlight = this.currentHighlightSeriesIndex === i
        
        elements.push({
          type: 'polygon',
          shape: {
            points
          },
          style: {
            fill: isHighlight ? this.colors[i] : this.dimColors[i],
            opacity: isHighlight ? 0.2 : 0.1
          },
          z: isHighlight ? 10 : 1
        })
      }
    }
    
    // 基于原代码的 option 配置
    const option = {
      backgroundColor: 'transparent',
      
      // 隐藏 ECharts 自带的图例
      legend: {
        show: false
      },
      
      grid,
      
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        textStyle: {
          color: '#ffffff',
          fontSize: 26, // 控制弹窗文字大小的地方
        },
        formatter: (params) => {
          let result = `<div style="color: #00ccff; margin-bottom: 8px;">${params[0].axisValue}</div>`
          
          params.forEach(param => {
            const actualValue = this.rawData[param.seriesIndex][param.dataIndex]
            const percentage = Math.round(param.value * 1000) / 10
            
            result += `
              <div style="margin: 4px 0;">
                <span style="display: inline-block; width: 10px; height: 10px; background: ${param.color}; margin-right: 8px;"></span>
                ${param.seriesName}: ${actualValue} (${percentage}%)
              </div>
            `
          })
          
          return result
        }
      },
      
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#00ccff',
          fontSize: 26,
          formatter: function(value) {
            return Math.round(value * 100) // 将小数转换为百分比数值
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(45, 90, 135, 0.3)',
            type: 'dashed'
          }
        }
      },
      
      xAxis: {
        type: 'category',
        data: this.categories,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#ffffff',
          fontSize: 26,
          margin: 20 // 月份标签距离柱状图20px
        }
      },
      
      series,
      
      graphic: {
        elements
      }
    }
    
    this.chart.setOption(option, true)
  },
  
  startAutoRotate() {
    this.autoRotateTimer = setInterval(() => {
      if (!this.isHovering) {
        this.currentHighlightSeriesIndex = (this.currentHighlightSeriesIndex + 1) % this.seriesNames.length
        this.updateChart()
      }
    }, 2000)
  },
  
  onChartMouseOver(params) {
    if (params.componentType === 'series') {
      this.isHovering = true
      this.currentHighlightSeriesIndex = params.seriesIndex
      this.updateChart()
      
      this.chart.dispatchAction({
        type: 'highlight',
        seriesIndex: params.seriesIndex
      })
    }
  },
  
  onChartMouseOut() {
    this.isHovering = false
    
    this.chart.dispatchAction({
      type: 'downplay'
    })
  },
  
  // 标签鼠标悬停事件
  onLabelHover(index) {
    this.isHovering = true
    this.currentHighlightSeriesIndex = index
    this.updateChart()
    
    // 同时高亮图表中的对应系列
    this.chart.dispatchAction({
      type: 'highlight',
      seriesIndex: index
    })
  },
  
  onLabelLeave() {
    this.isHovering = false
    
    this.chart.dispatchAction({
      type: 'downplay'
    })
  },
  
  handleResize() {
    if (this.chart) {
      this.chart.resize()
      setTimeout(() => {
        this.updateChart()
      }, 100)
    }
  },
  
  // 生成默认数据（当没有传入数据时使用）
  generateDefaultData() {
    const defaultData = []
    for (let i = 0; i < 4; i++) { // 4个系列
      const seriesData = []
      for (let j = 0; j < 12; j++) { // 12个月
        // 根据不同系列生成不同范围的随机数
        let min, max
        switch (i) {
          case 0: // 场内受累
            min = 100; max = 400
            break
          case 1: // 限电损失
            min = 100; max = 300
            break
          case 2: // 计划停运
            min = 150; max = 350
            break
          case 3: // 场外受累
            min = 120; max = 450
            break
          default:
            min = 100; max = 500
        }
        seriesData.push(Math.floor(Math.random() * (max - min + 1)) + min)
      }
      defaultData.push(seriesData)
    }
    return defaultData
  }
}
}
</script>

<style lang="scss" scoped>
.power-limitation-overview {
width: 100%;
color: #ffffff;
font-family: 'Microsoft YaHei', sans-serif;
border-radius: 8px;
height: 644px;
}

.header-img {
width: 100%;
height: 100px;
background: url("../../assets/images/homepage/Component 238.png") center center no-repeat;
}

.series-labels {
display: flex;
justify-content: center;
align-items: center;
gap: 40px;
margin: 20px 0;
padding: 0 20px;

.label-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover, &.active {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--label-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

    .label-indicator {
      background: var(--label-color);
      box-shadow: 0 0 8px var(--label-color);
    }

    .label-text {
      color: var(--label-color);
    }
  }

  // 柱状指示器样式
  .label-indicator {
    width:10px;
    height: 20px;
    border-radius: 2px;
    background: var(--dim-color);
    transition: all 0.3s ease;
  }

  .label-text {
    font-size: 26px;
    font-weight: 500;
    color: #ffffff;
    opacity: 0.8;
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  &.active {
    .label-indicator {
      background: var(--label-color);
      box-shadow: 0 0 8px var(--label-color);
    }

    .label-text {
      color: var(--label-color);
      opacity: 1;
    }
  }
}
}

.stacked-bar-chart {
width: 100%;
height: 458px; // 减去头部和标签的高度
border-radius: 8px;
.chart-container {
  width: 100%;
  height: 100%;
}
}
.header-span{
  position:absolute;
  font-size:26px;
  left:40px;
  top:160px;
  color:#FFFFFF99;
}
</style>
