<template>
  <div class="power-limitation-overview">
    <!-- 头部标签切换 -->
    <div class="header-img"></div>
    <div class="header-tabs">
      <div 
        class="tab-item" 
        :class="{ active: activeTab === 'monthly' }"
        @click="switchTab('monthly')"
      >
        月度限电概览
      </div>
      <div 
        class="tab-item" 
        :class="{ active: activeTab === 'yearly' }"
        @click="switchTab('yearly')"
      >
        年累计限电概览
      </div>
      <div 
        class="tab-item" 
        :class="{ active: activeTab === 'windCompare' }"
        @click="switchTab('windCompare')"
      >
        风电限电对比
      </div>
      <div 
        class="tab-item" 
        :class="{ active: activeTab === 'solarCompare' }"
        @click="switchTab('solarCompare')"
      >
        光伏限电对比
      </div>
      <div class="unit-label">(万kWh)</div>
    </div>

    <!-- 数据展示区域 -->
    <div class="data-display">
      <!-- 第一行数据卡片 -->
      <div class="data-row">
        <div class="data-card">
          <div class="card-header">
            <span class="card-title">{{ currentData.firstRow.card1.title }}</span>
            <span class="card-icon"></span>
          </div>
          <div class="card-value">{{ currentData.firstRow.card1.value }}</div>
          <div class="card-stats">
            <span class="stat-item">
              同比 <span :class="getStatClass(currentData.firstRow.card1.yearOverYear)">{{ currentData.firstRow.card1.yearOverYear }}</span>
              <span :class="getArrowClass(currentData.firstRow.card1.yearOverYear)"></span>
            </span>
            <span class="stat-item">
              环比 <span :class="getStatClass(currentData.firstRow.card1.monthOverMonth)">{{ currentData.firstRow.card1.monthOverMonth }}</span>
              <span :class="getArrowClass(currentData.firstRow.card1.monthOverMonth)"></span>
            </span>
          </div>
        </div>

        <div class="data-card">
          <div class="card-header">
            <span class="card-title">{{ currentData.firstRow.card2.title }}</span>
            <span class="card-icon"></span>
          </div>
          <div class="card-value">{{ currentData.firstRow.card2.value }}</div>
          <div class="card-stats">
            <span class="stat-item">
              同比 <span :class="getStatClass(currentData.firstRow.card2.yearOverYear)">{{ currentData.firstRow.card2.yearOverYear }}</span>
              <span :class="getArrowClass(currentData.firstRow.card2.yearOverYear)"></span>
            </span>
            <span class="stat-item">
              环比 <span :class="getStatClass(currentData.firstRow.card2.monthOverMonth)">{{ currentData.firstRow.card2.monthOverMonth }}</span>
              <span :class="getArrowClass(currentData.firstRow.card2.monthOverMonth)"></span>
            </span>
          </div>
        </div>

        <div class="data-card">
          <div class="card-header">
            <span class="card-title">{{ currentData.firstRow.card3.title }}</span>
            <span class="card-icon"></span>
          </div>
          <div class="card-value">{{ currentData.firstRow.card3.value }}</div>
          <div class="card-stats">
            <span class="stat-item">
              同比 <span :class="getStatClass(currentData.firstRow.card3.yearOverYear)">{{ currentData.firstRow.card3.yearOverYear }}</span>
              <span :class="getArrowClass(currentData.firstRow.card3.yearOverYear)"></span>
            </span>
            <span class="stat-item">
              环比 <span :class="getStatClass(currentData.firstRow.card3.monthOverMonth)">{{ currentData.firstRow.card3.monthOverMonth }}</span>
              <span :class="getArrowClass(currentData.firstRow.card3.monthOverMonth)"></span>
            </span>
          </div>
        </div>
      </div>

      <!-- 第二行数据卡片 -->
      <div class="data-row">
        <div class="data-card">
          <div class="card-header">
            <span class="card-title">{{ currentData.secondRow.card1.title }}</span>
            <span class="card-icon"></span>
          </div>
          <div class="card-value">{{ currentData.secondRow.card1.value }}</div>
          <div class="card-stats">
            <span class="stat-item">
              同比 <span :class="getStatClass(currentData.secondRow.card1.yearOverYear)">{{ currentData.secondRow.card1.yearOverYear }}</span>
              <span :class="getArrowClass(currentData.secondRow.card1.yearOverYear)"></span>
            </span>
            <span class="stat-item">
              环比 <span :class="getStatClass(currentData.secondRow.card1.monthOverMonth)">{{ currentData.secondRow.card1.monthOverMonth }}</span>
              <span :class="getArrowClass(currentData.secondRow.card1.monthOverMonth)"></span>
            </span>
          </div>
        </div>

        <div class="data-card">
          <div class="card-header">
            <span class="card-title">{{ currentData.secondRow.card2.title }}</span>
            <span class="card-icon"></span>
          </div>
          <div class="card-value">{{ currentData.secondRow.card2.value }}</div>
          <div class="card-stats">
            <span class="stat-item">
              同比 <span :class="getStatClass(currentData.secondRow.card2.yearOverYear)">{{ currentData.secondRow.card2.yearOverYear }}</span>
              <span :class="getArrowClass(currentData.secondRow.card2.yearOverYear)"></span>
            </span>
            <span class="stat-item">
              环比 <span :class="getStatClass(currentData.secondRow.card2.monthOverMonth)">{{ currentData.secondRow.card2.monthOverMonth }}</span>
              <span :class="getArrowClass(currentData.secondRow.card2.monthOverMonth)"></span>
            </span>
          </div>
        </div>

        <div class="data-card">
          <div class="card-header">
            <span class="card-title">{{ currentData.secondRow.card3.title }}</span>
            <span class="card-icon"></span>
          </div>
          <div class="card-value">{{ currentData.secondRow.card3.value }}</div>
          <div class="card-stats">
            <span class="stat-item">
              同比 <span :class="getStatClass(currentData.secondRow.card3.yearOverYear)">{{ currentData.secondRow.card3.yearOverYear }}</span>
              <span :class="getArrowClass(currentData.secondRow.card3.yearOverYear)"></span>
            </span>
            <span class="stat-item">
              环比 <span :class="getStatClass(currentData.secondRow.card3.monthOverMonth)">{{ currentData.secondRow.card3.monthOverMonth }}</span>
              <span :class="getArrowClass(currentData.secondRow.card3.monthOverMonth)"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PowerLimitationOverview',
  props: {
    getAnnualRationingData: {
      type: Array,
      default: () => []
    },
    getMonthlyRationingData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeTab: 'monthly',
      
      // 默认数据结构
      defaultData: {
        firstRow: {
          card1: { title: '公司限电量', value: '0', yearOverYear: '0%', monthOverMonth: '0%' },
          card2: { title: '风电限电量', value: '0', yearOverYear: '0%', monthOverMonth: '0%' },
          card3: { title: '光伏限电量', value: '0', yearOverYear: '0%', monthOverMonth: '0%' }
        },
        secondRow: {
          card1: { title: '公司限电率', value: '0', yearOverYear: '0%', monthOverMonth: '0%' },
          card2: { title: '风电限电率', value: '0', yearOverYear: '0%', monthOverMonth: '0%' },
          card3: { title: '光伏限电率', value: '0', yearOverYear: '0%', monthOverMonth: '0%' }
        }
      }
    }
  },
  
  computed: {
    // 处理月度限电概览数据（使用getMonthlyRationingData）
    monthlyData() {
      console.log('Processing monthly data:', this.getMonthlyRationingData)
      return this.processMonthlyData(this.getMonthlyRationingData)
    },
    
    // 处理年累计限电概览数据（使用getAnnualRationingData）
    yearlyData() {
      console.log('Processing yearly data:', this.getAnnualRationingData)
      return this.processAnnualData(this.getAnnualRationingData)
    },
    
    // 处理风电限电对比数据（使用getMonthlyRationingData）
    windCompareData() {
      return this.processCompareData(this.getMonthlyRationingData, 'wind')
    },
    
    // 处理光伏限电对比数据（使用getMonthlyRationingData）
    solarCompareData() {
      return this.processCompareData(this.getMonthlyRationingData, 'solar')
    },
    
    currentData() {
      switch (this.activeTab) {
        case 'monthly':
          return this.monthlyData
        case 'yearly':
          return this.yearlyData
        case 'windCompare':
          return this.windCompareData
        case 'solarCompare':
          return this.solarCompareData
        default:
          return this.defaultData
      }
    }
  },
  
  methods: {
    switchTab(tabName) {
      this.activeTab = tabName
    },
    
    // 处理月度数据（有four_category字段）
    processMonthlyData(sourceData) {
      if (!sourceData || !Array.isArray(sourceData) || sourceData.length === 0) {
        return this.defaultData
      }
      
      // 根据four_category字段创建数据映射
      const dataMap = {}
      sourceData.forEach(item => {
        if (item && item.four_category) {
          dataMap[item.four_category] = {
            value: item.metric_name || '0',
            yearOverYear: item.metric_value || '0%',
            monthOverMonth: item.unit || '0%'
          }
        }
      })
      
      console.log('Monthly data map:', dataMap)
      
      return {
        firstRow: {
          card1: {
            title: '公司限电量',
            value: dataMap['公司限电量']?.value || '0',
            yearOverYear: dataMap['公司限电量']?.yearOverYear || '0%',
            monthOverMonth: dataMap['公司限电量']?.monthOverMonth || '0%'
          },
          card2: {
            title: '风电限电量',
            value: dataMap['风电限电量']?.value || '0',
            yearOverYear: dataMap['风电限电量']?.yearOverYear || '0%',
            monthOverMonth: dataMap['风电限电量']?.monthOverMonth || '0%'
          },
          card3: {
            title: '光伏限电量',
            value: dataMap['光伏限电量']?.value || '0',
            yearOverYear: dataMap['光伏限电量']?.yearOverYear || '0%',
            monthOverMonth: dataMap['光伏限电量']?.monthOverMonth || '0%'
          }
        },
        secondRow: {
          card1: {
            title: '公司限电率',
            value: dataMap['公司限电率']?.value || '0',
            yearOverYear: dataMap['公司限电率']?.yearOverYear || '0%',
            monthOverMonth: dataMap['公司限电率']?.monthOverMonth || '0%'
          },
          card2: {
            title: '风电限电率',
            value: dataMap['风电限电率']?.value || '0',
            yearOverYear: dataMap['风电限电率']?.yearOverYear || '0%',
            monthOverMonth: dataMap['风电限电率']?.monthOverMonth || '0%'
          },
          card3: {
            title: '光伏限电率',
            value: dataMap['光伏限电率']?.value || '0',
            yearOverYear: dataMap['光伏限电率']?.yearOverYear || '0%',
            monthOverMonth: dataMap['光伏限电率']?.monthOverMonth || '0%'
          }
        }
      }
    },
    
    // 处理年度数据（metric_name是标题）
    processAnnualData(sourceData) {
      if (!sourceData || !Array.isArray(sourceData) || sourceData.length === 0) {
        return this.defaultData
      }
      
      // 根据metric_name字段创建数据映射
      const dataMap = {}
      sourceData.forEach(item => {
        if (item && item.metric_name) {
          dataMap[item.metric_name] = {
            value: item.metric_value || '0',
            yearOverYear: item.unit || '0%', // 年度数据中unit作为同比
            monthOverMonth: '0%' // 年度数据没有环比
          }
        }
      })
      
      console.log('Annual data map:', dataMap)
      
      return {
        firstRow: {
          card1: {
            title: '公司限电量',
            value: dataMap['公司限电量']?.value || '0',
            yearOverYear: dataMap['公司限电量']?.yearOverYear || '0%',
            monthOverMonth: dataMap['公司限电量']?.monthOverMonth || '0%'
          },
          card2: {
            title: '风电限电量',
            value: dataMap['风电限电量']?.value || '0',
            yearOverYear: dataMap['风电限电量']?.yearOverYear || '0%',
            monthOverMonth: dataMap['风电限电量']?.monthOverMonth || '0%'
          },
          card3: {
            title: '光伏限电量',
            value: dataMap['光伏限电量']?.value || '0',
            yearOverYear: dataMap['光伏限电量']?.yearOverYear || '0%',
            monthOverMonth: dataMap['光伏限电量']?.monthOverMonth || '0%'
          }
        },
        secondRow: {
          card1: {
            title: '公司限电率',
            value: dataMap['公司限电率']?.value || '0',
            yearOverYear: dataMap['公司限电率']?.yearOverYear || '0%',
            monthOverMonth: dataMap['公司限电率']?.monthOverMonth || '0%'
          },
          card2: {
            title: '风电限电率',
            value: dataMap['风电限电率']?.value || '0',
            yearOverYear: dataMap['风电限电率']?.yearOverYear || '0%',
            monthOverMonth: dataMap['风电限电率']?.monthOverMonth || '0%'
          },
          card3: {
            title: '光伏限电率',
            value: dataMap['光伏限电率']?.value || '0',
            yearOverYear: dataMap['光伏限电率']?.yearOverYear || '0%',
            monthOverMonth: dataMap['光伏限电率']?.monthOverMonth || '0%'
          }
        }
      }
    },
    
    // 处理对比数据（风电/光伏对比）
    processCompareData(sourceData, type) {
      if (!sourceData || !Array.isArray(sourceData) || sourceData.length === 0) {
        return this.defaultData
      }
      
      // 根据four_category字段创建数据映射
      const dataMap = {}
      sourceData.forEach(item => {
        if (item && item.four_category) {
          dataMap[item.four_category] = {
            value: item.metric_name || '0',
            yearOverYear: item.metric_value || '0%',
            monthOverMonth: item.unit || '0%'
          }
        }
      })
      
      if (type === 'wind') {
        return {
          firstRow: {
            card1: {
              title: '本月风电限电',
              value: dataMap['风电限电量']?.value || '0',
              yearOverYear: dataMap['风电限电量']?.yearOverYear || '0%',
              monthOverMonth: dataMap['风电限电量']?.monthOverMonth || '0%'
            },
            card2: {
              title: '上月风电限电',
              value: dataMap['上月风电限电']?.value || '0',
              yearOverYear: dataMap['上月风电限电']?.yearOverYear || '0%',
              monthOverMonth: dataMap['上月风电限电']?.monthOverMonth || '0%'
            },
            card3: {
              title: '同期风电限电',
              value: dataMap['同期风电限电']?.value || '0',
              yearOverYear: dataMap['同期风电限电']?.yearOverYear || '0%',
              monthOverMonth: dataMap['同期风电限电']?.monthOverMonth || '0%'
            }
          },
          secondRow: {
            card1: {
              title: '本月限电率',
              value: dataMap['风电限电率']?.value || '0',
              yearOverYear: dataMap['风电限电率']?.yearOverYear || '0%',
              monthOverMonth: dataMap['风电限电率']?.monthOverMonth || '0%'
            },
            card2: {
              title: '上月限电率',
              value: dataMap['上月风电限电率']?.value || '0',
              yearOverYear: dataMap['上月风电限电率']?.yearOverYear || '0%',
              monthOverMonth: dataMap['上月风电限电率']?.monthOverMonth || '0%'
            },
            card3: {
              title: '同期限电率',
              value: dataMap['同期风电限电率']?.value || '0',
              yearOverYear: dataMap['同期风电限电率']?.yearOverYear || '0%',
              monthOverMonth: dataMap['同期风电限电率']?.monthOverMonth || '0%'
            }
          }
        }
      } else if (type === 'solar') {
        return {
          firstRow: {
            card1: {
              title: '本月光伏限电',
              value: dataMap['光伏限电量']?.value || '0',
              yearOverYear: dataMap['光伏限电量']?.yearOverYear || '0%',
              monthOverMonth: dataMap['光伏限电量']?.monthOverMonth || '0%'
            },
            card2: {
              title: '上月光伏限电',
              value: dataMap['上月光伏限电']?.value || '0',
              yearOverYear: dataMap['上月光伏限电']?.yearOverYear || '0%',
              monthOverMonth: dataMap['上月光伏限电']?.monthOverMonth || '0%'
            },
            card3: {
              title: '同期光伏限电',
              value: dataMap['同期光伏限电']?.value || '0',
              yearOverYear: dataMap['同期光伏限电']?.yearOverYear || '0%',
              monthOverMonth: dataMap['同期光伏限电']?.monthOverMonth || '0%'
            }
          },
          secondRow: {
            card1: {
              title: '本月限电率',
              value: dataMap['光伏限电率']?.value || '0',
              yearOverYear: dataMap['光伏限电率']?.yearOverYear || '0%',
              monthOverMonth: dataMap['光伏限电率']?.monthOverMonth || '0%'
            },
            card2: {
              title: '上月限电率',
              value: dataMap['上月光伏限电率']?.value || '0',
              yearOverYear: dataMap['上月光伏限电率']?.yearOverYear || '0%',
              monthOverMonth: dataMap['上月光伏限电率']?.monthOverMonth || '0%'
            },
            card3: {
              title: '同期限电率',
              value: dataMap['同期光伏限电率']?.value || '0',
              yearOverYear: dataMap['同期光伏限电率']?.yearOverYear || '0%',
              monthOverMonth: dataMap['同期光伏限电率']?.monthOverMonth || '0%'
            }
          }
        }
      }
      
      return this.defaultData
    },
    
    // 根据数值判断样式类
    getStatClass(value) {
      if (value && value.includes('-')) {
        return 'negative'
      }
      return 'positive'
    },
    
    // 根据数值判断箭头方向
    getArrowClass(value) {
      if (value && value.includes('-')) {
        return 'arrow-down'
      }
      return 'arrow-up'
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
  height:674px;
}
.header-img{
	width: 100%;
	height: 100px;
	background: url("../../assets/images/homepage/xiandianfenxi.png") center center no-repeat;
}
.header-tabs {
  display: flex;
  align-items: center;
  margin-top: 30px;
  height:52px;
  border-bottom: 1px solid rgba(0, 204, 255, 0.2);
  
  .tab-item {
	width:240px;
	height:36px;
	display: flex;
	padding: 8px;
	justify-content: center;
	align-items: center;
	font-size: 26px;
	color:#FFFFFF99;
    &:hover {
		color:#F6F9FE;
    }
    &.active {
      	background: url("../../assets/images/homepage/Rectangle 6164.png") center center no-repeat;
		font-style: italic;
		color:#F6F9FE;
      &::after {
        content: '';
        position: absolute;
        bottom: -16px;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #00ccff, transparent);
      }
    }
  }
  
  .unit-label {
    margin-left: auto;
    color: #fff;
    font-size: 26px;
  }
}

.data-display {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top:30px;
}

.data-row {
  display: flex;
  gap: 20px;
  height:216px;
  justify-content: space-between;
}

.data-card {
	flex: 1;
	background: url("../../assets/images/homepage/di.png") center center no-repeat;
	border: 1px solid rgba(0, 204, 255, 0.2);
	width:408px;
	height:186px;
	transition: all 0.3s ease;
	position: relative;
	overflow: hidden;
	padding:30px 0px 0px 20px;
	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, transparent, #00ccff, transparent);
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	&:hover {
		border-color: rgba(0, 204, 255, 0.5);
		box-shadow: 0 4px 20px rgba(0, 204, 255, 0.1);
		transform: translateY(-2px);
		background: url("../../assets/images/homepage/di1.png") center center no-repeat;
		&::before {
		opacity: 1;
		}
	}
  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    
    .card-title {
      color: #A3C5FF;
      font-size: 30px;
      font-weight: 500;
    }
    
    .card-icon {
		color: #00ccff;
		font-size: 12px;
		width:16px;
		height:28px;
		background: url("../../assets/images/homepage/Frame 427320549.png") center center no-repeat;
		padding:7px 16px;
    }
  }
  
  .card-value {
    font-size: 42px;
    font-weight: bold;
    color: #27FFFF;
    margin-bottom: 15px;
    text-shadow: 0 0 10px rgba(0, 204, 255, 0.3);
    font-family: 'Arial', monospace;
  }
  
  .card-stats {
    display: flex;
    gap: 20px;
    
    .stat-item {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 24px;
      color: #AFAFAF;
      
      .positive {
        color: #fff;
        font-weight: bold;
      }
      
      .negative {
        color: #ef4444;
        font-weight: bold;
      }
      
      .arrow-up {
		background: url("../../assets/images/homepage/Frame 427321111.png") center center no-repeat;
		width:26px;
		height:26px;
		margin-left:16px;
		position:relative;
		bottom:2px;
      }
      
      .arrow-down {
		background: url("../../assets/images/homepage/Frame 427321111.png") center center no-repeat;
		width:26px;
		height:26px;
		margin-left:16px;
		position:relative;
		bottom:2px;
		transform: rotate(180deg);
      }
    }
  }
}
</style>
