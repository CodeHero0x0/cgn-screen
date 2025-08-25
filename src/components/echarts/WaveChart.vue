<template>
	<div class="power-generation-chart">
	  <!-- 头部控制区域 -->
	  <div class="chart-header">
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
  props: [
    'StackedBarChartData',
    'getMonthlyRationingLossData', // all数据
    'getAnnualAccumulationData' // wind数据
  ],
  data() {
    return {
      // 默认选择全部
      activeTab: 'all',
      timeType: 'month',
      chart: null,
      totalLoss: 0
    }
  },
  
  computed: {
    xAxisData() {
      // 根据当前激活的tab和timeType获取对应的数据
      if (this.timeType === 'month') {
        const currentData = this.activeTab === 'all' ? 
          this.getMonthlyRationingLossData : 
          this.getAnnualAccumulationData;
        
        if (!currentData || !currentData.length) {
          // 如果没有数据，返回默认标签
          return ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        }
        
        // 从数据中提取metric_name作为X轴标签
        return currentData.map(item => item.metric_name || '场站');
      } else {
        // year类型使用固定标签
        return ['2019年', '2020年', '2021年', '2022年', '2023年'];
      }
    },

    // 处理后的图表数据
    processedChartData() {
      const currentData = this.activeTab === 'all' ? 
        this.getMonthlyRationingLossData : 
        this.getAnnualAccumulationData;
      
      if (!currentData || !currentData.length) {
        return [];
      }

      // 将数据转换为图表需要的格式 - 只保留限电损失数据
      return currentData.map(item => parseFloat(item.metric_value) || 0);
    }
  },
  
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      this.updateData();
    });
  },

  watch: {
    // 监听数据变化，重新渲染图表
    getMonthlyRationingLossData: {
      handler() {
        if (this.activeTab === 'all') {
          this.updateChart();
          this.updateData();
        }
      },
      deep: true
    },
    getAnnualAccumulationData: {
      handler() {
        if (this.activeTab === 'wind') {
          this.updateChart();
          this.updateData();
        }
      },
      deep: true
    }
  },
  
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
      this.updateChart();
      this.updateData();
    },
    
    switchTimeType(type) {
      this.timeType = type;
      this.updateChart();
      this.updateData();
    },
    
    updateData() {
      const data = this.processedChartData;
      this.totalLoss = data.reduce((sum, val) => sum + val, 0);
    },
    
    initChart() {
      if (!this.$echarts || !this.$refs.chart) {
        console.error('ECharts 或图表容器不可用');
        return;
      }
      
      try {
        this.chart = this.$echarts.init(this.$refs.chart);
        this.updateChart();
      } catch (error) {
        console.error('图表初始化失败:', error);
      }
    },
	
	updateChart() {
		if (!this.chart) return;
		
		const data = this.processedChartData;
		
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
					let result = `<div style="padding: 8px 0; border-bottom: 1px solid #333; margin-bottom: 8px; font-size: 14px; color: #00ccff;">${params[0].axisValue}</div>`;
					
					params.forEach(param => {
						const unit = '万kWh';
						result += `
							<div style="margin: 8px 0; display: flex; justify-content: space-between; align-items: center;">
								<span style="display: flex; align-items: center;">
									<span style="display: inline-block; width: 12px; height: 12px; background: ${param.color}; margin-right: 8px; border-radius: 2px;"></span>
									${param.seriesName}
								</span>
								<span style="color: #fff; font-weight: bold;">${param.value}${unit}</span>
							</div>
						`;
					});
					return result;
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
				// 只保留一条线 - 限电损失
				{
					name: '限电损失',
					type: 'line',
					data: data,
					smooth: true,
					symbol: 'circle',
					symbolSize: 8,
					lineStyle: {
						color: '#fff',
						width: 3,
						shadowColor: 'rgba(0, 194, 255, 0.5)',
						shadowBlur: 10,
						shadowOffsetY: 2
					},
					itemStyle: {
						color: '#fff',
						borderColor: '#fff',
						borderWidth: 2,
						shadowColor: 'rgba(0, 194, 255, 0.8)',
						shadowBlur: 8
					},
					emphasis: {
						itemStyle: {
							color: '#fff',
							borderColor: '#fff',
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
							{ offset: 0, color: 'rgba(28, 102, 230, 0.30)' },
							{ offset: 1, color: 'rgba(0, 194, 255, 0.05)' }
						])
					}
				}
			]
		};
		this.chart.setOption(option, true);
	}
  }
}
</script>

<style lang="scss" scoped>
.power-generation-chart {
  width: 100%;
  height: 100%;
  background: rgba(0, 20, 40, 0.8);
  border-radius: 4px;
  padding: 0px;
  color: #7ec7ff;
  
  .chart-header {
    width: 100%;
    height: 100px;
    background: url("../../assets/images/homepage/xiandiansunshi.png") center center no-repeat;
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
