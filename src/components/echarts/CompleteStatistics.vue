<template>
	<div>
	  <div ref="mainbar" class="mainbar"></div>
	</div>
</template>

<script>
import * as echarts from 'echarts'; // 导入 echarts

export default {
  name: 'MainBarChart',
  props:[
    'echartsData'
  ],
  data() {
    return {
      chart: null, // 存储图表实例
      processedData: null // 存储处理后的数据
    };
  },
  watch: {
    // 监听父组件数据变化
    echartsData: {
      handler(newData) {
        if (newData && Array.isArray(newData) && newData.length > 0) {
          this.processData()
          this.$nextTick(() => {
            if (this.chart) {
              this.updateChart()
            } else {
              this.renderBar()
            }
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.echartsData && Array.isArray(this.echartsData)) {
        this.processData()
        this.renderBar()
      }
    })
    
    // 监听窗口大小变化
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    // 销毁图表实例
    if (this.chart) {
      this.chart.dispose()
    }
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    // 处理父组件传来的数据
    processData() {
      if (!this.echartsData || !Array.isArray(this.echartsData)) {
        return
      }

      // 提取场站名称和百分比数据
      const stationNames = []
      const percentageValues = []

      this.echartsData.forEach((item, index) => {
        // 处理场站名称，如果为空则使用默认名称
        const stationName = item.metric_name.trim() || `场站${index + 1}`
        stationNames.push(stationName)

        // 处理百分比值，去除%符号并转换为数字
        const percentageStr = item.metric_value.replace('%', '')
        const percentageValue = parseFloat(percentageStr) || 0
        percentageValues.push(percentageValue)
      })

      this.processedData = {
        stationNames,
        percentageValues
      }
    },

    // 根据颜色数组设置渐变色
    calcColor(value) {
      if (value < 70) {
        return {
          type: 'linear',
          x: 0, x2: 1, y: 0, y2: 0,
          colorStops: [
            { offset: 0, color: '#D74647' },
            { offset: 0.5, color: '#D74647' },
            { offset: 0.8, color: '#954848' },
            { offset: 1, color: '#954848' },
          ]
        };
      }
      if (value < 80) {
        return {
          type: 'linear',
          x: 0, x2: 0.9, y: 0, y2: 0,
          colorStops: [
            { offset: 0.5, color: '#FFBB93' },
            { offset: 1, color: '#FFBB93' },
          ]
        };
      }
      return {
        type: 'linear',
        x: 0, x2: 1, y: 0, y2: 0,
        colorStops: [
          { offset: 0, color: '#13FFE3' },
          { offset: 0.5, color: '#13FFE3' },
          { offset: 0.5, color: '#0BD0B9' },
          { offset: 1, color: '#0BD0B9' }
        ]
      };
    },

    getSymbolColor(value) {
      if (value < 70) {
        return '#D74647'; // 小于 70 为红色
      } else if (value < 80) {
        return '#FFBB93'; // 小于 80 为橙色
      } else {
        return '#13FFE3'; // 大于等于 80 为青色
      }
    },

    renderBar() {
      if (!this.$refs.mainbar || !this.processedData) {
        return
      }

      // 如果图表已存在，先销毁
      if (this.chart) {
        this.chart.dispose()
      }

      // 初始化图表
      this.chart = echarts.init(this.$refs.mainbar)
      this.updateChart()
    },

    updateChart() {
      if (!this.chart || !this.processedData) {
        return
      }

      const { stationNames, percentageValues } = this.processedData

      const option = {
        xAxis: {
          type: 'category',
          data: stationNames,
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
            margin: 20, // 增加标签与轴线的距离，相当于向下偏移20px
            // 如果场站名称过长，可以设置旋转或截断
            rotate: stationNames.some(name => name.length > 4) ? 45 : 0
          }
        },
        yAxis: {
          type: 'value',
          max: 100, // 将 y 轴最大值设为 100
          axisLine: {
            lineStyle: {
              color: '#2d5a87',
              width: 2,
              type: 'dashed' // y 轴改为虚线
            }
          },
          axisLabel: {
            fontSize: 26,
            formatter: '{value}%', // 增加单位% 
            color: '#2CD7FF',
          },
          splitLine: {
            lineStyle: {
              type: 'dashed', // 网格线设为虚线
              color: '#2d5a87' // 网格线的颜色
            }
          }
        },
        grid: {
          left: '10',      // 更靠左
          right: '20',    // 适当调整右边距
          top: '20',       // 更靠上（给图表更多垂直空间）
          bottom: '40',    // 更靠下
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 20, 40, 0.9)',
          borderColor: 'rgba(0, 212, 255, 0.5)',
          borderWidth: 1,
          textStyle: {
            color: '#ffffff',
            fontSize: 26
          },
          formatter: (params) => {
            const param = params[0]
            return `<div style="padding: 8px;">
              <div style="color: #00D4FF; font-weight: bold; margin-bottom: 5px;">${param.axisValue}</div>
              <div>百分比: <span style="color: #13FFE3; font-weight: bold;">${param.value}%</span></div>
            </div>`
          }
        },
        legend: {
          top: 0,
          right: 10,
          textStyle: {
            color: '#ffffff',
            fontSize: 26 // 图例字体大小
          }
        },
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: 31,
            data: percentageValues.map(v => ({
              value: v,
              itemStyle: {
                color: this.calcColor(v)
              }
            })),
          },
          {
            name: '',
            type: 'bar',
            barWidth: 31,
            data: percentageValues,
            barGap: '-100%',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0, x2: 0, y: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: '#0b295300' },
                  { offset: 1, color: '#0b2953' }
                ]
              },
            },
          },
          {
            name: '',
            z: 3,
            type: 'pictorialBar',
            symbolPosition: 'end',
            data: percentageValues.map(v => ({
              value: v,
              itemStyle: {
                color: this.getSymbolColor(v) // 根据 value 动态调整符号颜色
              },
            })),
            symbol: 'diamond',
            symbolOffset: ['0', '-50%'],
            symbolSize: [31, 31 * 0.4]
          }
        ]
      };

      this.chart.setOption(option, true)
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
.mainbar {
  width: 1374px;
  height: 364px;
}
</style>
