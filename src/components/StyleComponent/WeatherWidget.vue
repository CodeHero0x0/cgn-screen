<template>
    <div class="weather-widget">
      <!-- 天气图标 -->
      <div class="weather-icon">
        <div class="icon-container" :class="weatherIconClass">
          <div class="icon-element" v-for="n in iconElements" :key="n"></div>
        </div>
      </div>
      
      <!-- 天气信息 -->
      <div class="weather-info">
        <div class="temperature">
          <span> {{ temperature }}</span>
          <i>°C</i>
        </div>
        <div class="divider"></div>
        <div class="pm-value">
          PM {{ pmValue }}
        </div>
        <div class="location" v-if="showLocation">
          {{ currentLocation }}
        </div>
      </div>
      
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WeatherWidget',
    props: {
      showLocation: {
        type: Boolean,
        default: false
      },
      autoRefresh: {
        type: Boolean,
        default: true
      },
      refreshInterval: {
        type: Number,
        default: 10 // 分钟
      }
    },
    
    data() {
      return {
        loading: false,
        temperature: 32,
        pmValue: 2.0,
        currentLocation: '北京市',
        weatherCondition: 'rainy', // sunny, cloudy, rainy, snowy, foggy, thunderstorm
        refreshTimer: null
      }
    },
    
    computed: {
      // 根据天气条件返回对应的CSS类
      weatherIconClass() {
        return `weather-${this.weatherCondition}`
      },
      
      // 根据天气条件返回图标元素数量
      iconElements() {
        const elementCounts = {
          sunny: 8,      // 太阳光线
          cloudy: 3,     // 云朵层数
          rainy: 6,      // 雨滴数量
          snowy: 8,      // 雪花数量
          foggy: 4,      // 雾气层数
          thunderstorm: 5 // 闪电+云
        }
        return elementCounts[this.weatherCondition] || 3
      }
    },
    
    mounted() {
      this.initWeather()
      if (this.autoRefresh) {
        this.startAutoRefresh()
      }
    },
    
    beforeDestroy() {
      this.stopAutoRefresh()
    },
    
    methods: {
      // 初始化天气数据
      async initWeather() {
        this.loading = true
        try {
          await this.getCurrentLocation()
          await this.getWeatherData()
        } catch (error) {
          console.error('获取天气数据失败:', error)
          // 使用模拟数据
          this.generateMockData()
        } finally {
          this.loading = false
        }
      },
      
      // 获取当前位置
      async getCurrentLocation() {
        return new Promise((resolve, reject) => {
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords
                try {
                  // 这里可以调用逆地理编码API获取城市名称
                  this.currentLocation = await this.getCityName(latitude, longitude)
                  resolve({ latitude, longitude })
                } catch (error) {
                  this.currentLocation = '当前位置'
                  resolve({ latitude, longitude })
                }
              },
              (error) => {
                console.log('获取位置失败:', error)
                this.currentLocation = '北京市'
                resolve(null)
              },
              {
                timeout: 10000,
                enableHighAccuracy: false
              }
            )
          } else {
            this.currentLocation = '北京市'
            resolve(null)
          }
        })
      },
      
      // 获取天气数据
      async getWeatherData() {
        try {
          // 这里集成真实的天气API
          // 示例：使用和风天气API、高德天气API等
          
          // const response = await fetch(`你的天气API接口`)
          // const data = await response.json()
          
          // 模拟API调用
          await this.delay(1000)
          
          // 模拟真实数据
          const mockWeatherData = this.generateRealisticWeatherData()
          
          this.temperature = mockWeatherData.temperature
          this.pmValue = mockWeatherData.pmValue
          this.weatherCondition = mockWeatherData.condition
          
        } catch (error) {
          throw new Error('天气API调用失败')
        }
      },
      
      // 生成真实的天气数据
      generateRealisticWeatherData() {
        const conditions = ['sunny', 'cloudy', 'rainy', 'snowy', 'foggy']
        const condition = conditions[Math.floor(Math.random() * conditions.length)]
        
        // 根据季节和时间生成合理的温度
        const now = new Date()
        const month = now.getMonth() + 1
        const hour = now.getHours()
        
        let baseTemp = 20
        
        // 季节调整
        if (month >= 12 || month <= 2) baseTemp = 5  // 冬季
        else if (month >= 3 && month <= 5) baseTemp = 18 // 春季
        else if (month >= 6 && month <= 8) baseTemp = 30 // 夏季
        else baseTemp = 22 // 秋季
        
        // 时间调整
        if (hour >= 6 && hour <= 18) baseTemp += 5 // 白天
        else baseTemp -= 3 // 夜晚
        
        const temperature = Math.round(baseTemp + (Math.random() - 0.5) * 10)
        
        // PM值根据天气条件调整
        let pmValue = 2.5
        if (condition === 'foggy') pmValue = 15.0 + Math.random() * 10
        else if (condition === 'rainy') pmValue = 1.0 + Math.random() * 2
        else pmValue = 2.0 + Math.random() * 8
        
        return {
          temperature,
          pmValue: parseFloat(pmValue.toFixed(1)),
          condition
        }
      },
      
      // 生成模拟数据
      generateMockData() {
        this.temperature = Math.floor(Math.random() * 35) + 5
        this.pmValue = parseFloat((Math.random() * 20 + 1).toFixed(1))
        const conditions = ['sunny', 'cloudy', 'rainy', 'snowy', 'foggy', 'thunderstorm']
        this.weatherCondition = conditions[Math.floor(Math.random() * conditions.length)]
      },
      
      // 获取城市名称（需要地理编码API）
      async getCityName(lat, lng) {
        try {
          // 这里可以使用高德地图、百度地图等逆地理编码API
          // const response = await fetch(`逆地理编码API?lat=${lat}&lng=${lng}`)
          // const data = await response.json()
          // return data.city
          
          // 模拟返回
          await this.delay(500)
          return '当前位置'
        } catch (error) {
          return '未知位置'
        }
      },
      
      // 开始自动刷新
      startAutoRefresh() {
        this.refreshTimer = setInterval(() => {
          this.getWeatherData()
        }, this.refreshInterval * 60 * 1000)
      },
      
      // 停止自动刷新
      stopAutoRefresh() {
        if (this.refreshTimer) {
          clearInterval(this.refreshTimer)
          this.refreshTimer = null
        }
      },
      
      // 手动刷新
      refresh() {
        this.initWeather()
      },
      
      // 延迟函数
      delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .weather-widget {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 12px;
    padding: 20px;
    color: #ffffff;
    min-width: 280px;
    overflow: hidden;
  }
  
  // 天气图标区域
  .weather-icon {
    margin-right: 30px;
    .icon-container {
      width: 80px;
      height: 80px;
      background-size:100% 100%;
    }
  }
  
  // 天气信息区域
  .weather-info {
    flex: 1;
    
    .temperature {
      font-size: 35px;
      line-height: 1;
      margin-bottom: 8px;
      
      text-align:top;
      span{
        font-family: 'Orbitron', 'Arial', monospace;
        font-weight: 900;
      }
      i{
        font-size:24px;
        position:absolute;
        top:17px;
      }
    }
    
    .divider {
      width: 80px;
      height: 2px;
      background: rgba(255, 255, 255, 0.6);
      margin: 8px 0;
    }
    
    .pm-value {
      font-size: 21px;
      font-weight: 500;
      color: #B3B5B7;
      letter-spacing: 1px;
    }
    
    .location {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 8px;
    }
  }
  
  // 晴天图标
  .weather-sunny {
    background: url("../../assets/images/weather/weather-icon-qing.png") 100% 100% no-repeat;
    
  }
  
  // 多云图标
  .weather-cloudy {
    background: url("../../assets/images/weather/weather-icon-duoyun.png") 100% 100% no-repeat;
  }
  
  // 雨天图标
  .weather-rainy {
    background: url("../../assets/images/weather/weather-icon-yu.png") 100% 100% no-repeat;
  }
  
  // 雪天图标
  .weather-snowy {
    background: url("../../assets/images/weather/weather-icon-xue.png") 100% 100% no-repeat;
  }
  
  // 雾天图标
  .weather-foggy {
    background: url("../../assets/images/weather/weather-icon-wutian.png") 100% 100% no-repeat;
  }
  
  // 雷暴图标
  .weather-thunderstorm {
    background: url("../../assets/images/weather/weather-icon-leiyu.png") 100% 100% no-repeat;
  }
  
  // 加载状态
  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    
    .spinner {
      width: 30px;
      height: 30px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top: 3px solid #ffffff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
  
 
  </style>
  