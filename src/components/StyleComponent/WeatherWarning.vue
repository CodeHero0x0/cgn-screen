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
			  <p class="station-name" :class="{ 'long-name': isLongName(item.mid_category) }">{{ item.mid_category }}</p>
			  <span class="weather-info" :class="{ 'wrap-line': isLongName(item.mid_category) }">{{ item.sub_category }} {{ item.four_category }}</span>
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
			  <p class="station-name" :class="{ 'long-name': isLongName(item.mid_category) }">{{ item.mid_category }}</p>
			  <span class="weather-info" :class="{ 'wrap-line': isLongName(item.mid_category) }">{{ item.sub_category }} {{ item.four_category }}</span>
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
	props: [
		'stationWeatherWarningData'
	],
	data() {
	  return {
		scrollTimer: null,
		scrollSpeed: 1,
		stations: [
		]
	  }
	},
	watch: {
	// 监听父组件数据变化，更新图表
		stationWeatherWarningData: {
			handler() {
				this.stations = this.stationWeatherWarningData;
			},
			deep: true
		}
	},
	mounted() {
		this.stations = this.stationWeatherWarningData;
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
  