<template>
    <div class="site-status-container">
      <div 
        v-for="site in sites" 
        class="site-item"
      >
        <div class="site-header">
          <span class="site-name">{{ site.metric_name }}<i></i></span>
          <span class="site-percentage">{{ formatPercentage(site.metric_value) }}<i>{{ site.unit }}</i></span>
        </div>
        
        <div class="progress-bar-container">
          <div 
            class="progress-bar" 
            :style="{ 
              width: site.metric_value + '%',
              background: getProgressColor(site.metric_value)
            }"
          ></div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'SiteStatus',
  props: {
    sites: {
      type: Array,
      default: () => []
    },
    showAnimation: {
      type: Boolean,
      default: true
    }
  },
  methods: {
     stringToNumber(str) {
		// 自定义转换逻辑
		return Number(str);
    },
    // 格式化百分比显示
    formatPercentage(percentage) {
      return this.stringToNumber(percentage).toFixed()
    },
    
    // 根据百分比获取进度条颜色
    getProgressColor(percentage) {
        if (percentage >= 90) {
            return 'linear-gradient(90deg, #66A9CCB2 0%, #7ECCE5E5 30%, #CCEEFF 100%)'
        } else if (percentage >= 70) {
            return 'linear-gradient(90deg, #66A9CCB2 0%, #7ECCE5E5 50%, #CCEEFF 100%)'
        } else {
            return 'linear-gradient(90deg, #66A9CCB2 0%, #7ECCE5E5 70%, #CCEEFF 100%)'
        }
    }
  },
  mounted(){

  },
  created() {
    console.log(123,this.sites)
	},
}
</script>

<style scoped>
.site-status-container {
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
  width: 100%;
  margin-top: 20px;
  height: 380px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.site-item {
  width: 100%;
  height: 60px;
  font-size: 24px;
}

.site-item:last-child {
  margin-bottom: 0;
}

.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  height: 42px;
  line-height: 42px;
}

.site-name {
  color: #A3C5FF;
  font-size: 24px;
  font-weight: 400;
  i{
    background: url("../../assets/images/CompanyOverview/Frame 427320549.png") center center no-repeat;
    width: 16px;
    height: 28px;
    display: inline-block;
    position: relative;
    left: 20px;
    top: 2px;
  }
}

.site-percentage {
  color: #27FFFF;
  font-size: 24px;
  font-weight: 600;
  text-shadow: 0 0 5px rgba(0, 212, 255, 0.3);
  i{
    color: #67717D;
    font-size: 24px;
  }
}

.progress-bar-container {
  width: 100%;
  height: 8px;
  background-color: #2a3b5c;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #00a6d6 0%, #00d4ff 100%);
  border-radius: 4px;
  transition: width 0.3s ease-in-out;
  position: relative;
}

/* 方案1：使用transform旋转的斜线 */
.progress-bar::after {
  content: '';
  position: absolute;
  top: -2px;
  right: -1px;
  width: 6px;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 8px rgba(0, 212, 255, 0.8);
  transform: skewX(-50deg); /* 创建斜线效果 */
  border-radius: 1px;
}

</style>
