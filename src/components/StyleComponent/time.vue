<template>
  <div class="digital-clock">
    <div class="time-display">
      <span class="digit-box">{{ timeDigits[0] }}</span>
      <span class="digit-box">{{ timeDigits[1] }}</span>
      <span class="separator">:</span>
      <span class="digit-box">{{ timeDigits[2] }}</span>
      <span class="digit-box">{{ timeDigits[3] }}</span>
      <span class="separator">:</span>
      <span class="digit-box">{{ timeDigits[4] }}</span>
      <span class="digit-box">{{ timeDigits[5] }}</span>
    </div>
    <div class="date-display">
      <span class="date-text">{{ currentDate }}</span>
      <span class="weekday"> |{{ currentWeekday }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DigitalClock',
  data() {
    return {
      currentTime: new Date(),
      timer: null
    }
  },
  
  computed: {
    // 获取时间数字数组 [时,时,分,分,秒,秒]
    timeDigits() {
      const hours = String(this.currentTime.getHours()).padStart(2, '0')
      const minutes = String(this.currentTime.getMinutes()).padStart(2, '0')
      const seconds = String(this.currentTime.getSeconds()).padStart(2, '0')
      
      return [
        hours[0], hours[1],    // 小时的十位和个位
        minutes[0], minutes[1], // 分钟的十位和个位
        seconds[0], seconds[1]  // 秒钟的十位和个位
      ]
    },
    
    // 获取当前日期 格式：DD/MM/YYYY
    currentDate() {
      const day = String(this.currentTime.getDate()).padStart(2, '0')
      const month = String(this.currentTime.getMonth() + 1).padStart(2, '0')
      const year = this.currentTime.getFullYear()
      return `${day}/${month}/${year}`
    },
    
    // 获取当前星期
    currentWeekday() {
      const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      return weekdays[this.currentTime.getDay()]
    }
  },
  
  mounted() {
    // 组件挂载后开始定时器
    this.startTimer()
  },
  
  beforeDestroy() {
    // 组件销毁前清除定时器
    this.clearTimer()
  },
  
  methods: {
    // 开始定时器，每秒更新一次时间
    startTimer() {
      this.updateTime()
      this.timer = setInterval(() => {
        this.updateTime()
      }, 1000)
    },
    
    // 更新当前时间
    updateTime() {
      this.currentTime = new Date()
    },
    
    // 清除定时器
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

.digital-clock {
  width: 100%;
}

.time-display {
  text-align: left;
  width:100%;
}

.digit-box {
  display: inline-block;
  height: 80px;
  color: #fff;
  font-family: 'Orbitron', 'DS-Digital', monospace;
  font-size: 35px;
  font-weight: 900;
  line-height: 80px;
  text-align: left;
  border-radius: 8px;
}

.separator {
  font-family: 'Orbitron', monospace;
  font-size: 35px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.date-display {
  margin-top: 0px;
  padding-left:5px;
}

.date-text {
  font-family: 'Arial', sans-serif;
  font-size: 24px;
  color: #ffffff;
  font-weight: normal;
}

.weekday {
  font-family: 'Microsoft YaHei', '微软雅黑', sans-serif;
  font-size: 24px;
  color: #B3B5B7;
  font-weight: normal;
}
</style>
