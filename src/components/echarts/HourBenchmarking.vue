<template>
	<div>
        <div class="classification">
            <div class="classification-div1">(%)</div>
            <div class="classification-div2">
                <span 
                    class="classification-percentage1" 
                    @mouseenter="highlightLine(0)" 
                    @mouseleave="unhighlightLine(0)" 
                   >2023年</span>
                <span 
                    class="classification-percentage2" 
                    @mouseenter="highlightLine(1)" 
                    @mouseleave="unhighlightLine(1)">
                    2024年</span>
                <span 
                    class="classification-percentage3" 
                    @mouseenter="highlightLine(2)" 
                    @mouseleave="unhighlightLine(2)" 
                   >2025年</span>
            </div>
        </div>
		<div ref="chart" class="mainbar"></div>
	</div>
</template>

<script>
import * as echarts from 'echarts'; // 导入 echarts
import huangse from '../../assets/images/homepage/huangse.png';
import chengse from '../../assets/images/homepage/chengse.png';
import lanse from '../../assets/images/homepage/lanse.png';
export default {
	name: 'MainBarChart',
	props: {
        yearbefore: {
            type: Array,
            required: true
        },
        lastyear: {
            type: Array,
            required: false, // 改为 false
            default: () => [] // 提供默认值
        },
        thisyear: {
            type: Array,
            required: false, // 改为 false
            default: () => [] // 提供默认值
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
        console.log(123,this.yearbefore)
        const percentageData = this.yearbefore.map(v => (v / this.total) * 100);
        
        const lastYearData = this.lastyear.map(v => (v / this.total) * 100);
        const thisYearData = this.thisyear.map(v => (v / this.total) * 100);
        
        const option = {
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
                left: '10',
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
                }
            },
            series: [
                {
                    type: 'line',
                    data: thisYearData,
                    lineStyle: {
                        color: '#00C2FF',
                        width: 3,
                        type: 'solid'
                    },
                    symbol: `image://${lanse}`,
                    symbolSize: [28, 28]
                },
                {
                    type: 'line',
                    data: lastYearData,
                    lineStyle: {
                        color: '#FF710B', // 去年颜色
                        width: 3,
                    },
                    symbol: 'circle', 
                    symbolSize: [28, 28], 
                    symbol: `image://${chengse}`,
                    symbolSize: [28, 28]
                },
                {
                    type: 'line',
                    data: percentageData,
                    lineStyle: {
                        color: '#FFB10B', // 前年颜色
                        width: 3,
                    },
                    symbol: 'circle', 
                    symbolSize: [28, 28], 
                    symbol: `image://${huangse}`,
                    symbolSize: [28, 28]
                }
            ]
        };

        this.myChart.setOption(option);

        window.addEventListener('resize', () => this.myChart.resize());
    },

    highlightLine(index) {
        this.myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: index, // 折线图的索引
        });
    },
    unhighlightLine(index) {
        this.myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: index, // 折线图的索引
        });
    }
	}
}
</script>

<style scoped>
.mainbar {
	width: 1374px;
	height: 430px;
}
.classification {
	width: 100%;
	height: 48px;
    line-height: 48px;
    margin-top: 20px;
	display: flex;
	font-size: 24px;
	color: white;
	.classification-div1 {
		text-align: left;
		color: rgba(255, 255, 255, 0.60);
		margin-left: 10px;
		font-family: "Alibaba PuHuiTi 2.0";
		font-size: 26px;
		font-weight: 500;
        width: 500px;
	}
	.classification-div2 {
		text-align: center;
		cursor: pointer;
        display: flex;
        gap: 20px;
        span{
            color: rgba(255, 255, 255, 0.80);
            font-family: "Alibaba PuHuiTi 2.0";
            font-size: 26px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            width: 132px;
            height: 36px;
            line-height: 36px;
            padding-left: 25px;
            display: inline-block;
        }
        .classification-percentage1{
            background: url("../../assets/images/homepage/huangse2023.png") 0 85% no-repeat;
        }
        .classification-percentage2{
            background: url("../../assets/images/homepage/chengse2024.png") 0 85% no-repeat;
        }
        .classification-percentage3{
            background: url("../../assets/images/homepage/lanse2025.png") 0 85% no-repeat;
        }
	}
}
</style>
