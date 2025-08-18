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
              同比 <span class="positive">{{ currentData.firstRow.card1.yearOverYear }}</span>
              <span class="arrow-up"></span>
            </span>
            <span class="stat-item">
              环比 <span class="positive">{{ currentData.firstRow.card1.monthOverMonth }}</span>
              <span class="arrow-up"></span>
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
              同比 <span class="positive">{{ currentData.firstRow.card2.yearOverYear }}</span>
              <span class="arrow-up"></span>
            </span>
            <span class="stat-item">
              环比 <span class="positive">{{ currentData.firstRow.card2.monthOverMonth }}</span>
              <span class="arrow-up"></span>
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
              同比 <span class="positive">{{ currentData.firstRow.card3.yearOverYear }}</span>
              <span class="arrow-up"></span>
            </span>
            <span class="stat-item">
              环比 <span class="positive">{{ currentData.firstRow.card3.monthOverMonth }}</span>
              <span class="arrow-up"></span>
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
              同比 <span class="positive">{{ currentData.secondRow.card1.yearOverYear }}</span>
              <span class="arrow-up"></span>
            </span>
            <span class="stat-item">
              环比 <span class="positive">{{ currentData.secondRow.card1.monthOverMonth }}</span>
              <span class="arrow-up"></span>
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
              同比 <span class="positive">{{ currentData.secondRow.card2.yearOverYear }}</span>
              <span class="arrow-up"></span>
            </span>
            <span class="stat-item">
              环比 <span class="positive">{{ currentData.secondRow.card2.monthOverMonth }}</span>
              <span class="arrow-up"></span>
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
              同比 <span class="positive">{{ currentData.secondRow.card3.yearOverYear }}</span>
              <span class="arrow-up"></span>
            </span>
            <span class="stat-item">
              环比 <span class="positive">{{ currentData.secondRow.card3.monthOverMonth }}</span>
              <span class="arrow-up"></span>
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
  data() {
    return {
      activeTab: 'monthly',
      
      // 各个标签对应的数据
      tabData: {
        monthly: {
          firstRow: {
            card1: { title: '公司限电量', value: '16.4', yearOverYear: '+7.66%', monthOverMonth: '+0.19%' },
            card2: { title: '风电限电量', value: '11.97', yearOverYear: '+7.66%', monthOverMonth: '+0.19%' },
            card3: { title: '光伏限电量', value: '4.51', yearOverYear: '+7.66%', monthOverMonth: '+0.19%' }
          },
          secondRow: {
            card1: { title: '公司限电率', value: '15.17', yearOverYear: '+7.66%', monthOverMonth: '+0.19%' },
            card2: { title: '风电限电率', value: '14.61', yearOverYear: '+7.66%', monthOverMonth: '+0.19%' },
            card3: { title: '光伏限电率', value: '19.54', yearOverYear: '+7.66%', monthOverMonth: '+0.19%' }
          }
        },
        yearly: {
          firstRow: {
            card1: { title: '公司限电量', value: '198.5', yearOverYear: '+12.3%', monthOverMonth: '+2.1%' },
            card2: { title: '风电限电量', value: '145.8', yearOverYear: '+15.2%', monthOverMonth: '+1.8%' },
            card3: { title: '光伏限电量', value: '52.7', yearOverYear: '+8.9%', monthOverMonth: '+2.5%' }
          },
          secondRow: {
            card1: { title: '公司限电率', value: '18.23', yearOverYear: '+9.1%', monthOverMonth: '+1.2%' },
            card2: { title: '风电限电率', value: '16.85', yearOverYear: '+11.4%', monthOverMonth: '+0.9%' },
            card3: { title: '光伏限电率', value: '21.46', yearOverYear: '+6.7%', monthOverMonth: '+1.6%' }
          }
        },
        windCompare: {
          firstRow: {
            card1: { title: '本月风电限电', value: '11.97', yearOverYear: '+7.66%', monthOverMonth: '+0.19%' },
            card2: { title: '上月风电限电', value: '11.75', yearOverYear: '+5.2%', monthOverMonth: '-1.1%' },
            card3: { title: '同期风电限电', value: '11.12', yearOverYear: '+2.8%', monthOverMonth: '+0.5%' }
          },
          secondRow: {
            card1: { title: '本月限电率', value: '14.61', yearOverYear: '+7.66%', monthOverMonth: '+0.19%' },
            card2: { title: '上月限电率', value: '14.35', yearOverYear: '+4.9%', monthOverMonth: '-0.8%' },
            card3: { title: '同期限电率', value: '13.58', yearOverYear: '+1.9%', monthOverMonth: '+0.3%' }
          }
        },
        solarCompare: {
          firstRow: {
            card1: { title: '本月光伏限电', value: '4.51', yearOverYear: '+7.66%', monthOverMonth: '+0.19%' },
            card2: { title: '上月光伏限电', value: '4.32', yearOverYear: '+5.8%', monthOverMonth: '-0.9%' },
            card3: { title: '同期光伏限电', value: '4.19', yearOverYear: '+3.2%', monthOverMonth: '+0.7%' }
          },
          secondRow: {
            card1: { title: '本月限电率', value: '19.54', yearOverYear: '+7.66%', monthOverMonth: '+0.19%' },
            card2: { title: '上月限电率', value: '18.92', yearOverYear: '+6.1%', monthOverMonth: '-1.3%' },
            card3: { title: '同期限电率', value: '18.15', yearOverYear: '+4.2%', monthOverMonth: '+0.8%' }
          }
        }
      }
    }
  },
  
  computed: {
    currentData() {
      return this.tabData[this.activeTab]
    }
  },
  
  methods: {
    switchTab(tabName) {
      this.activeTab = tabName
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
    color: #00ccff;
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
    }
  }
}

</style>
