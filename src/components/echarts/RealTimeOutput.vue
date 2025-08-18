<template>
	<div>
        <div class="classification">
            <div class="classification-div2">
                <span 
                    class="classification-percentage1" 
                    @mouseenter="highlightLine(0)" 
                    @mouseleave="unhighlightLine(0)" 
                   >总计</span>
                <span 
                    class="classification-percentage2" 
                    @mouseenter="highlightLine(1)" 
                    @mouseleave="unhighlightLine(1)">
                    风电</span>
                <span 
                    class="classification-percentage3" 
                    @mouseenter="highlightLine(2)" 
                    @mouseleave="unhighlightLine(2)" 
                   >光伏</span>
            </div>
        </div>
		<div ref="chart" class="mainbar"></div>
	</div>
</template>

<script>
import * as echarts from 'echarts'; // 导入 echarts

export default {
	name: 'MainBarChart',
	props: {
        yearbefore: {
            type: Array,
            required: true
        },
        lastyear: {
            type: Array,
            required: false,
            default: () => []
        },
        thisyear: {
            type: Array,
            required: false,
            default: () => []
        }
    },
	data() {
	  return {
		total: 100,
		lineName: '小时数',
		myChart: null
	  };
	},
	mounted() {
	  this.renderBar(); 
	},
	methods: {
        renderBar() {
    const chartDom = this.$refs.chart; 
    this.myChart = echarts.init(chartDom);
    const percentageData = this.yearbefore.map(v => (v / this.total) * 100);
    const lastYearData = this.lastyear.map(v => (v / this.total) * 100);
    const thisYearData = this.thisyear.map(v => (v / this.total) * 100);
    
    const option = {
        xAxis: {
            type: 'category',
            data: [],
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
                interval: 0
            }
        },
        yAxis: {
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
                formatter: '{value} ',
                color: '#2CD7FF',
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#2d5a87'
                }
            }
        },
        grid: {
            left: '50',
            right: '20',
            top: '50',
            bottom: '40',
            containLabel: true
        },
        legend: {
            top: 0,
            right: 10,
            textStyle: {
                color: '#ffffff',
                fontSize: 26
            },
            // 这里设置图例的icon为'none'
            itemStyle: {
                borderColor: 'transparent',
                borderWidth: 0
            },
            // 自定义图例的item样式
            rich: {
                icon: {
                    width: 10,
                    height: 10,
                    backgroundColor: {
                        image: 'url(huangse)' // 替换为您的曲线图标的URL
                    }
                }
            }
        },

        series: [
            {
                type: 'line',
                data: thisYearData,
                lineStyle: {
                    color: '#fff', // 线条颜色
                    width: 3,
                    type: 'solid' // 线条类型
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(210, 239, 255, 0.2)' }, // 0% 处的颜色
                            { offset: 1, color: 'rgba(210, 239, 255, 0)' } // 100% 处的颜色
                        ],
                        global: false // 缺省为 false
                    }
                },
                // 删除符号
                symbol: 'none'
            },
            {
                type: 'line',
                data: lastYearData,
                lineStyle: {
                    color: '#03FFFF', // 去年颜色
                    width: 3,
                    type: 'solid' // 线条类型
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(3, 255, 255, 0.2)' },
                            { offset: 1, color: 'rgba(3, 255, 255, 0)' }
                        ],
                        global: false
                    }
                },
                // 删除符号
                symbol: 'none'
            },
            {
                type: 'line',
                data: percentageData,
                lineStyle: {
                    color: '#FFB10B', // 前年颜色
                    width: 3,
                    type: 'solid' // 线条类型
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(255, 221, 148, 0.2)' },
                            { offset: 1, color: 'rgba(255, 221, 148, 0)' }
                        ],
                        global: false
                    }
                },
                // 删除符号
                symbol: 'none'
            }
        ]
    };

    this.myChart.setOption(option);

    window.addEventListener('resize', () => this.myChart.resize());
},

    
    highlightLine(index) {
        this.myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: index,
        });
    },
    unhighlightLine(index) {
        this.myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: index,
        });
    }
	}
}
</script>

<style scoped>
.mainbar {
	height: 430px;
}
.classification {
	width: 100%;
	height: 48px;
	margin-top: 20px;
	display: flex;
	font-size: 24px;
	color: white;
}
.classification-div2 {
		text-align: center;
		cursor: pointer;
        width: 100%;
        display: flex;
        gap: 20px;
        padding-left: 150px;
        span{
            color: rgba(255, 255, 255, 0.80);
            font-family: "Alibaba PuHuiTi 2.0";
            font-size: 26px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            width: 88px;
            height: 36px;
            line-height: 36px;
            padding-left: 25px;
            display: inline-block;
        }
        .classification-percentage1{
            background: url("../../assets/images/equipmentManagement/zongji.png") 0 65% no-repeat;
        }
        .classification-percentage2{
            background: url("../../assets/images/equipmentManagement/fengdian.png") 0 65% no-repeat;
        }
        .classification-percentage3{
            background: url("../../assets/images/equipmentManagement/guangfu.png") 0 64% no-repeat;
        }
	}
</style>
