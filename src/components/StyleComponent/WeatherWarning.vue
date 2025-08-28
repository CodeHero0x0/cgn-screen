<template>
	<div 
	  class="weatherwarning-div"
	  @mouseenter="handleMouseEnter"
	  @mouseleave="handleMouseLeave"
	>
	  <div class="scroll-container" ref="scrollContainer">
		<div class="scroll-content" ref="scrollContent">
		  <!-- 原始数据 -->
		  <div 
			v-for="(item, index) in stations" 
			:key="`original-${index}`"
			class="weather-item"
		  >
			<div class="weather-header">
			  <p class="station-name" :class="{ 'long-name': isLongName(item.name) }">{{ item.name }}</p>
			  <span class="weather-info" :class="{ 'wrap-line': isLongName(item.name) }">{{ item.temperature }} {{ item.weather }}</span>
			</div>
			<p class="description">{{ item.description }}</p>
		  </div>
		  
		  <!-- 复制数据用于无缝滚动 -->
		  <div 
			v-for="(item, index) in stations" 
			:key="`copy-${index}`"
			class="weather-item"
		  >
			<div class="weather-header">
			  <p class="station-name" :class="{ 'long-name': isLongName(item.name) }">{{ item.name }}</p>
			  <span class="weather-info" :class="{ 'wrap-line': isLongName(item.name) }">{{ item.temperature }} {{ item.weather }}</span>
			</div>
			<p class="description">{{ item.description }}</p>
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
		scrollSpeed: 1,
		stations: [
		  {
			name: '青河光伏电站',
			temperature: '14/27°',
			weather: '晴间多云',
			description: '场站运行状态良好，最大风速11.8m/s，最小风速8.3m/s，平均风速9.6m/s。'
		  },
		  {
			name: '图木舒克光伏电站',
			temperature: '22/35°',
			weather: '多云有扬沙',
			description: '场站运行状态良好，最大风速13.2m/s，最小风速9.1m/s，平均风速11.2m/s。'
		  },
		  {
			name: '英吉沙光伏电站',
			temperature: '20/33°',
			weather: '阴有浮尘',
			description: '场站运行状态良好，最大风速12.5m/s，最小风速8.7m/s，平均风速10.3m/s。'
		  },
		  {
			name: '34团光伏电站',
			temperature: '19/36°',
			weather: '晴有沙尘',
			description: '场站运行状态良好，最大风速14.3m/s，最小风速10.2m/s，平均风速12.1m/s。'
		  },
		  {
			name: '巴州若羌风电项目',
			temperature: '18/38°',
			weather: '晴有高温',
			description: '场站运行状态良好，最大风速15.8m/s，最小风速11.3m/s，平均风速13.2m/s。'
		  },
		  {
			name: '巴州若羌二期风电项目',
			temperature: '18/38°',
			weather: '晴有高温',
			description: '场站运行状态良好，最大风速16.2m/s，最小风速12.1m/s，平均风速13.8m/s。'
		  },
		  {
			name: '和田洛浦光储电站',
			temperature: '21/37°',
			weather: '晴间多云',
			description: '场站运行状态良好，最大风速9.3m/s，最小风速5.6m/s，平均风速7.2m/s。'
		  },
		  {
			name: '和田洛浦二期光伏项目',
			temperature: '21/37°',
			weather: '晴间多云',
			description: '场站运行状态良好，最大风速8.7m/s，最小风速4.9m/s，平均风速6.5m/s。'
		  },
		  {
			name: '烟墩7C风电场',
			temperature: '17/32°',
			weather: '大风黄色预警',
			description: '场站运行状态良好，最大风速21.5m/s，最小风速16.8m/s，平均风速18.9m/s。'
		  },
		  {
			name: '和田独立储能项目',
			temperature: '22/36°',
			weather: '晴',
			description: '场站运行状态良好，最大风速7.2m/s，最小风速3.8m/s，平均风速5.3m/s。'
		  },
		  {
			name: '和田独立储能二期项目部',
			temperature: '22/36°',
			weather: '晴',
			description: '场站运行状态良好，最大风速7.5m/s，最小风速4.1m/s，平均风速5.6m/s。'
		  },
		  {
			name: '玛依塔斯三期风电项目',
			temperature: '12/28°',
			weather: '大风橙色预警',
			description: '场站运行状态良好，最大风速24.7m/s，最小风速18.3m/s，平均风速21.2m/s。'
		  },
		  {
			name: '达坂城风电场',
			temperature: '15/29°',
			weather: '大风红色预警',
			description: '场站运行状态良好，最大风速31.6m/s，最小风速25.4m/s，平均风速28.1m/s。'
		  },
		  {
			name: '巴州若羌独立储能项目部',
			temperature: '19/39°',
			weather: '晴有高温',
			description: '场站运行状态良好，最大风速6.9m/s，最小风速3.3m/s，平均风速4.9m/s。'
		  },
		  {
			name: '达坂城二期风电场',
			temperature: '14/28°',
			weather: '大风红色预警',
			description: '场站运行状态良好，最大风速29.8m/s，最小风速23.7m/s，平均风速26.3m/s。'
		  },
		  {
			name: '托克逊风电场',
			temperature: '20/41°',
			weather: '晴有极端高温',
			description: '场站运行状态良好，最大风速15.2m/s，最小风速10.8m/s，平均风速12.7m/s。'
		  },
		  {
			name: '哈密分散式风电场',
			temperature: '18/34°',
			weather: '晴有阵风',
			description: '场站运行状态良好，最大风速13.8m/s，最小风速9.2m/s，平均风速11.3m/s。'
		  },
		  {
			name: '哈密分散式二期风电场',
			temperature: '18/34°',
			weather: '晴有阵风',
			description: '场站运行状态良好，最大风速12.7m/s，最小风速8.5m/s，平均风速10.4m/s。'
		  },
		  {
			name: '哈密烟墩风电场',
			temperature: '17/33°',
			weather: '大风黄色预警',
			description: '场站运行状态良好，最大风速18.7m/s，最小风速13.9m/s，平均风速16.1m/s。'
		  },
		  {
			name: '哈密十三间房风电场',
			temperature: '16/32°',
			weather: '大风橙色预警',
			description: '场站运行状态良好，最大风速26.4m/s，最小风速20.1m/s，平均风速23.2m/s。'
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
	  // 判断站名是否过长（大于8个字符就认为过长）
	  isLongName(name) {
		return name.length > 8;
	  },
	  
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
		}, 20);
	  },
	  
	  stopAutoScroll() {
		if (this.scrollTimer) {
		  clearInterval(this.scrollTimer);
		  this.scrollTimer = null;
		}
	  },
	  
	  handleMouseEnter() {
		console.log('鼠标进入，停止滚动');
		this.stopAutoScroll();
	  },
	  
	  handleMouseLeave() {
		console.log('鼠标离开，继续滚动');
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
  
  .weather-header {
	position: relative;
	min-height: 44px;
  }
  
  .station-name {
	font-size: 32px;
	font-weight: 700;
	height: 44px;
	line-height: 44px;
	text-align: left;
	color: #DDF0FF;
	margin: 0;
	display: inline-block;
  }
  
  .station-name.long-name {
	width: 100%;
	height: auto;
	line-height: 44px;
  }
  
  .weather-info {
	color: #A3C5FF;
	text-align: right;
	font-size: 26px;
	position: absolute;
	top: 10px;
	right: 0;
	white-space: nowrap;
  }
  
  .weather-info.wrap-line {
	position: static;
	display: block;
	text-align: right;
	margin-top: 5px;
  }
  
  .description {
	font-size: 26px;
	text-align: left;
	color: #a6c7ff;
	margin: 0;
	margin-top: 10px;
  }
  
  /* 鼠标悬停效果 */
  .weatherwarning-div:hover .scroll-container {
	/* 可以添加暂停滚动的视觉提示 */
  }
  </style>
  