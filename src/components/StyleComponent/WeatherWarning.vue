<template>
    <div class="weatherwarning-div">
      <div class="scroll-container" ref="scrollContainer">
        <div class="scroll-content" ref="scrollContent">
          <!-- 原始数据 -->
          <div 
            v-for="(item, index) in stations" 
            :key="`original-${index}`"
            class="weather-item"
          >
            <p>
              {{ item.name }} 
              <span>{{ item.temperature }} {{ item.weather }}</span>
            </p>
            <p>{{ item.description }}</p>
          </div>
          
          <!-- 复制数据用于无缝滚动 -->
          <div 
            v-for="(item, index) in stations" 
            :key="`copy-${index}`"
            class="weather-item"
          >
            <p>
              {{ item.name }} 
              <span>{{ item.temperature }} {{ item.weather }}</span>
            </p>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WeatherWarning',
    data() {
      return {
        scrollTimer: null,
        scrollSpeed: 1, // 滚动速度，数值越大滚动越快
        stations: [
          {
            name: 'Xxx风电场站',
            temperature: '15/28°',
            weather: '晴天',
            description: '场站运行状态良好，最大风速12.01m/s 最小风速站运行状态良好，最大风速12.01m/s 最小风速为9.812.01m/s, 平均风速为10.31m/s。'
          },
          {
            name: 'Yyy风电场站',
            temperature: '18/30°',
            weather: '多云',
            description: '场站运行状态良好，最大风速11.85m/s 最小风速站运行状态良好，最大风速11.85m/s 最小风速为8.92m/s, 平均风速为9.88m/s。'
          },
          {
            name: 'Zzz风电场站',
            temperature: '16/25°',
            weather: '阴天',
            description: '场站运行状态良好，最大风速13.21m/s 最小风速站运行状态良好，最大风速13.21m/s 最小风速为10.15m/s, 平均风速为11.02m/s。'
          }
        ]
      }
    },
    mounted() {
      this.startAutoScroll();
    },
    beforeUnmount() {
      this.stopAutoScroll();
    },
    methods: {
      startAutoScroll() {
        const container = this.$refs.scrollContainer;
        const content = this.$refs.scrollContent;
        
        if (!container || !content) return;
        
        this.scrollTimer = setInterval(() => {
          container.scrollTop += this.scrollSpeed;
          
          // 当滚动到一半时（原始内容结束），重置到顶部
          const halfHeight = content.scrollHeight / 2;
          if (container.scrollTop >= halfHeight) {
            container.scrollTop = 0;
          }
        }, 20); // 每20毫秒滚动一次，越小越流畅
      },
      
      stopAutoScroll() {
        if (this.scrollTimer) {
          clearInterval(this.scrollTimer);
          this.scrollTimer = null;
        }
      },
      
      // 鼠标悬停暂停滚动
      handleMouseEnter() {
        this.stopAutoScroll();
      },
      
      // 鼠标离开继续滚动
      handleMouseLeave() {
        this.startAutoScroll();
      }
    }
  }
  </script>
  
  <style scoped>
  .weatherwarning-div {
    width: 617px;
    height: 480px;
    margin-top: 20px;
    position: relative;
    overflow: hidden;
  }
  
  .scroll-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  
  .scroll-content {
    width: 100%;
  }
  
  .weather-item {
    padding: 30px;
    width: 557px;
    background: url("../../assets/images/CompanyOverview/di.png") center center no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;
    box-sizing: border-box;
    border-radius: 10px;
  }
  
  .weather-item p:first-child {
    font-size: 32px;
    font-weight: 700;
    height: 44px;
    line-height: 44px;
    text-align: left;
    color: #DDF0FF;
    margin: 0;
  }
  
  .weather-item p:first-child span {
    color: #A3C5FF;
    text-align: right;
    font-size: 26px;
    float: right;
  }
  
  .weather-item p:nth-child(2) {
    font-size: 26px;
    text-align: center;
    color: #a6c7ff;
    margin: 0;
    margin-top: 10px;
  }
  
  /* 鼠标悬停效果 */
  .weatherwarning-div:hover .scroll-container {
    /* 可以添加暂停滚动的视觉提示 */
  }
  </style>
  