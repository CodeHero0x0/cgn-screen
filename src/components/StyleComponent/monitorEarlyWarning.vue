<template>
	<div class="event-panel" @mouseenter="stopEventScroll" @mouseleave="startEventScroll">
	  <div class="event-header">
		<div 
		  class="header-item" 
		  v-for="column in finalColumns" 
		  :key="column.key"
		  :style="{ flex: column.flex || '1' }"
		>
		  {{ column.title }}
		</div>
	  </div>
	  
	  <div class="event-list" ref="eventList" @wheel.prevent="handleWheelScroll">
		<div 
		  class="event-item"
		  v-for="event in events" 
		  :key="event.id"
		  :class="{ 'overdue-item': isOverdueItem(event) }"
		>
		  <div 
			v-for="column in finalColumns" 
			:key="column.key"
			:class="getColumnClass(column.key, event)"
			:style="{ flex: column.flex || '1' }"
		  >
			{{ getColumnValue(event, column) }}
		  </div>
		</div>
	  </div>
	</div>
</template>

<script>
export default {
  name: 'EventPanel',
  props: {
	// echartsData数据
	echartsData: {
	  type: Array,
	  default: () => []
	},
	// predictionData 列配置数据
	predictionData: {
	  type: Array,
	  default: () => []
	},
	// 实际的事件数据（如果需要的话）
	eventData: {
	  type: Array,
	  default: () => []
	},
	// 是否启用自动滚动
	autoScroll: {
	  type: Boolean,
	  default: true
	},
	// 滚动速度（毫秒）
	scrollSpeed: {
	  type: Number,
	  default: 50
	}
  },
  data() {
	return {
	  scrollTimer: null,
	  scrollPosition: 0
	}
  },
  computed: {
	// 最终的列配置 - 直接使用 predictionData
	finalColumns() {
	  return this.predictionData || [];
	},
	
	// 合并数据源
	events() {
	  // 处理 echartsData，根据列配置映射字段
	  const echartsEvents = this.echartsData.map((item, index) => {
		const event = { id: `echarts_${index}` };
		
		// 根据当前列配置映射 echartsData 的字段
		this.finalColumns.forEach((column, colIndex) => {
		  switch(colIndex) {
			case 0: // 第一列
			  event[column.key] = item.sub_category || '';
			  break;
			case 1: // 第二列
			  event[column.key] = item.four_category || '';
			  break;
			case 2: // 第三列
			  event[column.key] = item.metric_name || '';
			  break;
			case 3: // 第四列
			  event[column.key] = item.metric_value || '';
			  break;
			case 4: // 第五列
			  event[column.key] = item.unit || '';
			  break;
			case 5: // 第六列
			  event[column.key] = item.description || '';
			  break;
			default:
			  event[column.key] = '';
		  }
		});
		
		return event;
	  });

	  // 处理额外的事件数据（如果有的话）
	  const additionalEvents = this.eventData.map((item, index) => ({
		id: `event_${index}`,
		...item
	  }));

	  return [...echartsEvents, ...additionalEvents];
	}
  },
  mounted() {
	// 组件挂载后检查是否有数据，有数据则启动滚动
	this.checkAndStartScroll();
  },
  beforeUnmount() {
	this.stopEventScroll();
  },
  watch: {
	// 监听 echartsData 变化
	echartsData: {
	  handler(newVal, oldVal) {
		console.log('echartsData 数据变化:', newVal);
		// 数据变化后重新检查并启动滚动
		this.$nextTick(() => {
		  this.checkAndStartScroll();
		});
	  },
	  deep: true,
	  immediate: true
	},
	
	// 监听 predictionData 列配置变化
	predictionData: {
	  handler(newVal, oldVal) {
		console.log('predictionData 列配置变化:', newVal);
		// 配置变化后重新检查并启动滚动
		this.$nextTick(() => {
		  this.checkAndStartScroll();
		});
	  },
	  deep: true,
	  immediate: true
	},

	// 监听 eventData 变化
	eventData: {
	  handler(newVal, oldVal) {
		console.log('eventData 数据变化:', newVal);
		// 数据变化后重新检查并启动滚动
		this.$nextTick(() => {
		  this.checkAndStartScroll();
		});
	  },
	  deep: true,
	  immediate: true
	},

	// 监听 autoScroll 配置变化
	autoScroll(newVal) {
	  if (newVal) {
		this.checkAndStartScroll();
	  } else {
		this.stopEventScroll();
	  }
	},

	// 监听合并后的事件数据变化
	events: {
	  handler(newVal) {
		console.log('合并后的事件数据变化:', newVal);
		// 重置滚动位置
		this.scrollPosition = 0;
		if (this.$refs.eventList) {
		  this.$refs.eventList.scrollTop = 0;
		}
	  },
	  deep: true
	}
  },
  methods: {
	// 检查是否为超期项目
	isOverdueItem(event) {
	  // 查找"是否超期"列的数据
	  const overdueColumn = this.finalColumns.find(col => col.title === '是否超期');
	  if (!overdueColumn) return false;
	  
	  const overdueValue = this.getColumnValue(event, overdueColumn);
	  return overdueValue === '已超期';
	},

	// 检查数据并启动滚动
	checkAndStartScroll() {
	  if (this.autoScroll && this.events.length > 0) {
		// 先停止之前的滚动
		this.stopEventScroll();
		// 启动新的滚动
		this.startEventScroll();
	  }
	},

	startEventScroll() {
	  // 只有当有数据时才启动滚动
	  if (this.events.length === 0) {
		return;
	  }

	  this.scrollTimer = setInterval(() => {
		const eventList = this.$refs.eventList;
		if (eventList && this.events.length > 0) {
		  this.scrollPosition += 1;
		  if (this.scrollPosition >= eventList.scrollHeight - eventList.clientHeight) {
			this.scrollPosition = 0;
		  }
		  eventList.scrollTop = this.scrollPosition;
		}
	  }, this.scrollSpeed);
	},
	
	stopEventScroll() {
	  if (this.scrollTimer) {
		clearInterval(this.scrollTimer);
		this.scrollTimer = null;
	  }
	},
	
	// 鼠标滚轮事件处理
	handleWheelScroll(event) {
	  const eventList = this.$refs.eventList;
	  if (eventList) {
		// 临时停止自动滚动
		this.stopEventScroll();
		eventList.scrollTop += event.deltaY;
		
		// 2秒后恢复自动滚动
		setTimeout(() => {
		  if (this.autoScroll) {
			this.checkAndStartScroll();
		  }
		}, 2000);
	  }
	},

	// 获取列样式类
	getColumnClass(columnKey, event) {
	  const baseClass = `event-${columnKey}`;
	  
	  // 如果是超期项目且是"是否超期"列，添加特殊样式
	  if (this.isOverdueItem(event)) {
		const overdueColumn = this.finalColumns.find(col => col.title === '是否超期');
		if (overdueColumn && overdueColumn.key === columnKey) {
		  return `${baseClass} overdue-content`;
		}
	  }
	  
	  return baseClass;
	},

	// 获取列显示值
	getColumnValue(event, column) {
	  // 支持嵌套属性访问，如 'user.name'
	  const keys = column.key.split('.');
	  let value = event;
	  for (const key of keys) {
		value = value?.[key];
	  }
	  
	  // 如果有格式化函数
	  if (column.formatter && typeof column.formatter === 'function') {
		return column.formatter(value, event);
	  }
	  
	  return value || '';
	}
  }
}
</script>

<style scoped>
.event-panel {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.event-header {
  display: flex;
  flex-shrink: 0;
  background: url("../../assets/images/CompanyOverview/yunxing1.png") center center no-repeat;
  background-size: 100% 100%;
  padding-left: 50px;
}

.header-item {
  color: #A3C5FF;
  font-family: "Alibaba PuHuiTi 2.0";
  font-size: 26px;
  font-style: normal;
  font-weight: 500;
  line-height: 72px;
  height: 72px; /* 保持固定高度 */
}

.header-item:last-child {
  border-right: none;
}

.event-list {
  flex: 1;
  overflow: hidden;
}

.event-item {
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background-color 0.3s ease;
  min-height: 72px; /* 改为最小高度 */
  padding-left: 50px;
  align-items: stretch; /* 让子元素拉伸至父元素高度 */
}

/* 超期项目的背景色 */
.event-item.overdue-item {
  background-color: rgba(255, 102, 102, 0.06); /* #FF66660F 透明度 6% */
}

.event-item div {
  font-size: 26px;
  font-weight: 600;
  text-align: left;
  color: #A3C5FF;
  font-family: "Alibaba PuHuiTi 2.0";
  line-height: 1.4; /* 改为相对行高 */
  padding: 12px 8px; /* 添加内边距 */
  display: flex;
  align-items: center; /* 垂直居中 */
  word-wrap: break-word; /* 允许单词换行 */
  word-break: break-all; /* 强制换行 */
  overflow-wrap: break-word; /* 兼容性 */
  white-space: normal; /* 允许换行 */
}

.event-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

/* 超期项目hover时保持红色背景 */
.event-item.overdue-item:hover {
  background-color: rgba(255, 102, 102, 0.1);
}

/* 超期内容的特殊样式 */
.overdue-content {
  color: #FF4949 !important;
  font-weight: 600;
}

/* 动态生成的列样式 */
.event-priority {
  font-size: 26px;
  font-weight: 400;
  color: #A3C5FF;
}

.event-content {
  font-size: 26px;
  text-align: left;
  color: #A3C5FF;
}

.event-content1 {
  font-size: 26px;
  text-align: left;
  color: #A3C5FF;
}

.event-content2 {
  font-size: 26px;
  text-align: left;
  color: #A3C5FF;
}

.event-content3 {
  font-size: 26px;
  text-align: left;
  color: #A3C5FF;
}

.event-time {
  font-size: 26px;
  text-align: left;
  color: #A3C5FF;
}
</style>
