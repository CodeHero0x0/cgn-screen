<template>
    <div class="patrol-charts-container">
      <div class="charts-wrapper">
        <div 
          v-for="(item, index) in echartsData" 
          :key="index"
          class="chart-item"
        >
          <div 
            :ref="`chart-${index}`"
            class="chart-container"
          ></div>
          <div class="chart-label">{{ item.sub_category }}</div>
        </div>
      </div>
      <div class="legend">
        <div class="legend-item">
          <span class="legend-dot completed"></span>
          <span>已完成</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot pending"></span>
          <span>待执行</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot executing"></span>
          <span>执行中</span>
        </div>
      </div>
    </div>
  </template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'PatrolPieCharts',
  props: {
    echartsData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      charts: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initCharts()
    })
  },
  beforeDestroy() {
    this.charts.forEach(chart => {
      if (chart) {
        chart.dispose()
      }
    })
  },
  watch: {
    echartsData: {
      handler() {
        this.$nextTick(() => {
          this.initCharts()
        })
      },
      deep: true
    }
  },
  methods: {
    initCharts() {
      // 清除之前的图表
      this.charts.forEach(chart => {
        if (chart) {
          chart.dispose()
        }
      })
      this.charts = []

      this.echartsData.forEach((item, index) => {
        const chartDom = this.$refs[`chart-${index}`]?.[0]
        if (!chartDom) return

        const chart = echarts.init(chartDom)
        this.charts.push(chart)

        const completed = parseInt(item.metric_name) || 0
        const pending = parseInt(item.metric_value) || 0
        const executing = parseInt(item.unit) || 0
        const total = parseInt(item.four_category) || 0

        // 计算重叠值 - 让每个扇形稍微延伸一点
        const overlapPercent = 1 // 每个扇形延伸1%
        const overlapValue = total * (overlapPercent / 100)

        // 构建数据数组，给有数据的扇形增加重叠值
        const dataItems = []
        
        if (completed > 0) {
          dataItems.push({
            value: completed + overlapValue,
            name: '已完成',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 1, y2: 1,
                colorStops: [
                  { offset: 0, color: '#00F5D0' },
                  { offset: 1, color: '#00C4AA' }
                ]
              },
              borderRadius: 4,
              borderWidth: 0,
              shadowColor: 'rgba(0, 245, 208, 0.3)',
              shadowBlur: 4
            }
          })
        }
        
        if (pending > 0) {
          dataItems.push({
            value: pending + overlapValue,
            name: '待执行',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 1, y2: 1,
                colorStops: [
                  { offset: 0, color: '#FFD700' },
                  { offset: 1, color: '#FF8C00' }
                ]
              },
              borderRadius: 4,
              borderWidth: 0,
              shadowColor: 'rgba(255, 215, 0, 0.3)',
              shadowBlur: 4
            }
          })
        }
        
        if (executing > 0) {
          dataItems.push({
            value: executing + overlapValue,
            name: '执行中',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 1, y2: 1,
                colorStops: [
                  { offset: 0, color: '#00BFFF' },
                  { offset: 1, color: '#0080FF' }
                ]
              },
              borderRadius: 4,
              borderWidth: 0,
              shadowColor: 'rgba(0, 191, 255, 0.3)',
              shadowBlur: 4
            }
          })
        }

        // 计算剩余空间
        const usedValue = completed + pending + executing
        const totalOverlap = dataItems.length * overlapValue
        const remainingValue = total - usedValue - totalOverlap

        if (remainingValue > 0) {
          dataItems.push({
            value: remainingValue,
            name: '空白',
            itemStyle: {
              color: 'transparent',
              borderWidth: 0
            }
          })
        }

        const option = {
            series: [
                // 底层圆环 - 灰色底色
                {
                type: 'pie',
                radius: ['70%', '85%'],
                center: ['50%', '50%'],
                startAngle: 90,
                data: [
                    {
                    value: total,
                    name: '底色',
                    itemStyle: {
                        color: 'rgba(210, 210, 210, 0.16)',
                        borderWidth: 0
                    }
                    }
                ],
                label: { show: false },
                labelLine: { show: false },
                emphasis: { disabled: true },
                silent: true,
                z: 1
                },
                // 上层数据圆环
                {
                type: 'pie',
                radius: ['70%', '85%'],
                center: ['50%', '50%'],
                startAngle: 90,
                data: dataItems,
                label: { show: false },
                labelLine: { show: false },
                emphasis: { disabled: true },
                silent: true,
                z: 2
                }
            ],
            graphic: [
            {
                type: 'text',
                left: 'center',
                top: '35%',  // 使用百分比定位，数字在中心偏上
                style: {
                text: total.toString(),
                fontSize: 26,
                fontWeight: 'bold',
                fill: '#FFFFFF',
                textAlign: 'center'
                }
            },
            {
                type: 'text',
                left: 'center',
                top: '55%',  // 使用百分比定位，"总数"在中心偏下
                style: {
                text: '总数',
                fontSize: 26,
                fill: '#A3C5FF',
                textAlign: 'center'
                }
            }
]


}

chart.setOption(option)
      })
    }
  }
}
</script>


  
  
  <style scoped>
  .patrol-charts-container {
    padding: 20px;
    border-radius: 8px;
    color: #ffffff;
  }
  
  .chart-title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: bold;
  }
  
  .title-icon {
    color: #00D4AA;
    margin-right: 8px;
    font-size: 14px;
  }
  
  .charts-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .chart-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .chart-container {
    width: 148px;
    height: 148px;
    margin-bottom: 10px;
  }
  
  .chart-label {
    font-size: 26px;
    color: #A3C5FF;
    text-align: center;
  }
  
  .legend {
    position: absolute;
    right: 20px;        /* 靠右边 */
    top: 20px;          /* 移到顶部 */
    display: flex;
    gap: 12px;
    z-index: 10;        /* 确保在图表上方 */
    }

    .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 24px;    /* 字体大小24px */
    color: #FFFFFF;
    }

    .legend-item span:not(.legend-dot) {
    font-size: 24px;    /* 确保文字是24px */
    }

    .legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    }

    .legend-dot.completed {
    background-color: #00D4AA;
    }

    .legend-dot.pending {
    background-color: #FFB800;
    }

    .legend-dot.executing {
    background-color: #00C2FF;
    }
  </style>
