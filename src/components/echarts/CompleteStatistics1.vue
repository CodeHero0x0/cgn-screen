<template>
	<div>
	  <div id="mainbar1" class="mainbar1"></div>
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
		data1: this.generateRandomData(12), // 生成 12 个随机数
		total: 100 // 示例总值，可以根据实际情况计算
	  };
	},
	mounted() {
	  this.renderBar(); // 在组件挂载后渲染图表
	},
	methods: {
	  generateRandomData(count) {
		const randomData = [];
		for (let i = 0; i < count; i++) {
		  // 生成 50 到 100 之间的随机数，作为 data1 的值
		  const randomValue = Math.floor(Math.random() * 51) + 50; // 50 + [0, 50) => [50, 100]
		  randomData.push(randomValue);
		}
		return randomData;
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
		  return '#D74647'; // 小于 70 为白色
		} else if (value < 80) {
		  return '#FFBB93'; // 小于 80 为黑色
		} else {
		  return '#13FFE3'; // 大于等于 80 为橙色
		}
	  },
	  renderBar() {
		const chartDom = document.getElementById('mainbar1');
		const myChart = echarts.init(chartDom);
  
		// 计算百分比数据
		const percentageData = this.data1.map(v => (v / this.total) * 100);
  
		const option = {
			xAxis: {
			type: 'category',
			data: ['场站1', '场站2', '场站3', '场站4', '场站5', '场站6', '场站7', '场站8', '场站8', '场站8', '场站8', '场站8', ],
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
					formatter: '{value} %', // 增加单位% 
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
			  data: percentageData.map(v => ({
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
			  name: '',
			  z: 3,
			  type: 'pictorialBar',
			  symbolPosition: 'end',
			  data: percentageData.map(v => ({
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
  
		myChart.setOption(option);
  
		// 确保图表在窗口大小改变时能够自适应
		setTimeout(() => {
		  myChart.resize();
		}, 10);
	  }
	}
  }
  </script>
  
  <style scoped>
  .mainbar1 {
	width: 1374px;
	height: 364px;
  }
  </style>
  