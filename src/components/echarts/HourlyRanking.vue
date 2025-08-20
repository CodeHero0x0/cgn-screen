<template>
	<div>
        <div class="classification">
            <div class="classification-div1">(%)</div>
            <div class="classification-div2">
                <span class="classification-percentage">百分比</span>
                <span class="classification-hour" @mouseenter="highlightLine" @mouseleave="unhighlightLine">{{ lineName }}</span>
            </div>
            <div class="classification-div3"><i>存量小时数对标: </i> <span> {{ description }}</span></div>
        </div>
		<div ref="chart" class="mainbar"></div>
	</div>
</template>

<script>
import * as echarts from 'echarts'; // 导入 echarts

export default {
	name: 'MainBarChart',
	props: {
		echartsData: { // 接收父组件数据
			type: Array,
			required: true
		}
	},
	data() {
	  return {
		lineName: '小时数', // 初始化
		myChart: null, // 存储绘制的图表
		description:'',
	  };
	},
	created() {
		
	},
	mounted() {
	  this.renderBar(); // 在组件挂载后渲染图表
	},
	watch: {
		echartsData: {
			handler() {
				this.description = this.echartsData[0].description;
				this.renderBar();
			},
			deep: true
		}
	},
	methods: {
	  // 根据颜色数组设置渐变色
	  calcColor(value) {
		if (value < 3) {
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
		if (value < 4) {
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
		if (value < 3) {
		  return '#D74647'; // 小于 3% 为红色
		} else if (value < 4) {
		  return '#FFBB93'; // 小于 4% 为黄色
		} else {
		  return '#13FFE3'; // 大于等于 4% 为青色
		}
	  },
	  renderBar() {
		if (!this.echartsData || this.echartsData.length === 0) {
			return;
		}

		const chartDom = this.$refs.chart; // 使用 ref 获取 DOM 元素
		this.myChart = echarts.init(chartDom);

		// 从 echartsData 提取数据
		const stationNames = this.echartsData.map(item => item.metric_name);
		const percentageData = this.echartsData.map(item => {
			// 将 metric_value 的百分比字符串转换为数字
			return parseFloat(item.metric_value.replace('%', ''));
		});
		const hourData = this.echartsData.map(item => parseFloat(item.unit));

		const option = {
			xAxis: {
                type: 'category',
                data: stationNames,
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
                    margin: 30,
                    interval: 0, // 强制显示所有标签
                    rotate: 0, // 改为0度，不旋转
                    formatter: function (value) {
                        // 如果标签超过3个字符，显示省略号
                        return value.length > 3 ? value.substr(0, 3) + '...' : value;
                    }
                }
            },

			yAxis: [
				{
					type: 'value',
					axisLine: {
						lineStyle: {
							color: '#2d5a87',
							width: 2,
							type: 'dashed'
						}
					},
					axisLabel: {
						fontSize: 26,
						formatter: '{value}%',
						color: '#2CD7FF',
					},
					splitLine: {
						lineStyle: {
							type: 'dashed',
							color: '#2d5a87'
						}
					}
				},
				{
					type: 'value',
					axisLine: {
						lineStyle: {
							color: '#2d5a87',
							width: 2,
							type: 'dashed'
						}
					},
					axisLabel: {
						fontSize: 26,
						formatter: '{value}h',
						color: 'rgba(255, 255, 255, 0.60)',
					},
					splitLine: {
						lineStyle: {
							type: 'dashed',
							color: '#2d5a87'
						}
					}
				}
			],
			grid: {
				left: '10',
				right: '20',
				top: '50',
				bottom: '80', // 调整底部空间
				containLabel: true
			},
			legend: {
				top: 0,
				right: 10,
				textStyle: {
					color: '#ffffff',
					fontSize: 26
				}
			},
			// 添加 dataZoom 组件支持拖动
			dataZoom: [
				{
					type: 'slider',
					show: false, // 隐藏滑块
					xAxisIndex: 0,
					filterMode: 'none',
					start: 0,
					end: this.echartsData.length > 12 ? (12 / this.echartsData.length) * 100 : 100 // 默认显示12个数据点
				},
				{
					type: 'inside', // 支持鼠标拖拽
					xAxisIndex: 0,
					filterMode: 'none'
				}
			],
			series: [
				{
					type: 'bar',
					barWidth: 31,
					data: percentageData.map(v => ({
						value: v,
						itemStyle: {
							color: this.calcColor(v)
						}
					})),
				},
				{
					type: 'bar',
					barWidth: 31,
					data: percentageData,
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
					z: 3,
					type: 'pictorialBar',
					symbolPosition: 'end',
					data: percentageData.map(v => ({
						value: v,
						itemStyle: {
							color: this.getSymbolColor(v) 
						},
					})),
					symbol: 'diamond',
					symbolOffset: ['0', '-50%'],
					symbolSize: [31, 31 * 0.4]
				},
				{
                    type: 'line',
                    data: hourData,
                    lineStyle: {
                        color: '#FFCC00', // 折线颜色
                        width: 3, // 折线宽度
                        type: 'solid' // 实线
                    },
                    symbol: 'circle', // 符号类型为圆形
                    symbolSize: [20, 20], // 外层圆的大小
                    itemStyle: {
                        borderColor: '#FFCC00', // 符号边框颜色
                        borderWidth: 2,
                        color: 'transparent' // 使外层圆内部透明
                    },
                    emphasis: {
                        itemStyle: {
                            color: '#FF9900', // 鼠标悬停时的颜色
                            borderColor: '#FF9900', // 鼠标悬停时边框颜色
                            borderWidth: 2,
                        }
                    },
                    markPoint: {
                        symbol: 'circle', // 内部黄色点
                        symbolSize: 10,   // 内部点的大小
                        itemStyle: {
                            color: '#FFD700' // 内部点的颜色为黄色
                        },
                        data: hourData.map((v, index) => ({type: 'max', name: '黄色点', coord: [index, v]})) // 可以根据需要动态添加
                    },
                    yAxisIndex: 1 // 使用右侧 Y 轴
                }
			],
			// 添加工具提示
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				},
				formatter: function(params) {
					let result = params[0].name + '<br/>';
					params.forEach(function(item) {
						if (item.seriesIndex === 0) { // 柱状图
							result += item.marker + '百分比: ' + item.value + '%<br/>';
						} else if (item.seriesIndex === 3) { // 折线图
							result += item.marker + '小时数: ' + item.value + 'h<br/>';
						}
					});
					return result;
				}
			}
		};
  
		this.myChart.setOption(option, true); // 第二个参数为true表示不合并，完全替换
  
		// 确保图表在窗口大小改变时能够自适应
		window.addEventListener('resize', () => {
			if (this.myChart) {
				this.myChart.resize();
			}
		});
	  },
	  highlightLine() {
		if (!this.myChart || !this.echartsData) return;
		const dataLength = this.echartsData.length; // 数据点数量
		for (let i = 0; i < dataLength; i++) {
			this.myChart.dispatchAction({
				type: 'highlight',
				seriesIndex: 3, // 折线图的索引
				dataIndex: i // 高亮所有数据点
			});
		}
	  },
	  unhighlightLine() {
		if (!this.myChart || !this.echartsData) return;
		const dataLength = this.echartsData.length; // 数据点数量
		for (let i = 0; i < dataLength; i++) {
			this.myChart.dispatchAction({
				type: 'downplay',
				seriesIndex: 3, // 折线图的索引
				dataIndex: i // 取消高亮的所有数据点
			});
		}
	  }
	},
	beforeDestroy() {
		// 组件销毁前清理
		if (this.myChart) {
			this.myChart.dispose();
		}
		window.removeEventListener('resize', this.myChart?.resize);
	}
}
</script>

<style scoped>
.mainbar {
	width: 1374px;
	height: 430px; /* 根据需要的图表高度调整 */
}
.classification {
	width: 100%;
	height: 48px;
    line-height: 48px;
    margin-top: 20px;
	display: flex;
	font-size: 24px; /* 字体大小 */
	color: white; /* 字体颜色 */
    div{
        flex: 1;
    }
	.classification-div1 {
		text-align: left;
		color: rgba(255, 255, 255, 0.60);
		margin-left: 10px;
		font-family: "Alibaba PuHuiTi 2.0";
		font-size: 26px;
		font-weight: 500;
	}

	.classification-div2 {
		text-align: center;
		cursor: pointer; /* 鼠标指针样式 */
		
		.classification-percentage {
			background: url("../../assets/images/CompanyOverview/baifenbi.png") 0% 95% no-repeat;
			width: 123px;
			height: 36px;
			display: inline-block;
		}

		.classification-hour {
			background: url("../../assets/images/CompanyOverview/pingjunfengsu.png") 0%  80% no-repeat;
			width: 123px;
			height: 36px;
			display: inline-block;
		}
	}

	.classification-div3 {
		text-align: right;
       
        i{
            opacity: 0.7;
        }
		span {
			color: #51EC38;
			padding-right: 25px;
			display: inline-block;
			background: url("../../assets/images/homepage/Frame 427320595.png") 100% center no-repeat;
		}
	}
}
</style>
