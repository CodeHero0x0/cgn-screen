<template>
  <div class="event-panel">
    <div class="event-header">
      <div 
        class="header-item" 
        v-for="column in columns" 
        :key="column.key"
        :style="{ flex: column.flex || '1' }"
      >
        {{ column.title }}
      </div>
    </div>
    
    <div 
      class="event-list" 
      ref="eventList"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @wheel="handleWheel"
    >
      <div 
        class="event-item"
        v-for="(event, index) in events" 
        :key="index"
        :class="getPriorityClass(event)"
      >
        <div 
          v-for="column in columns" 
          :key="column.key"
          :class="getColumnClass(column.key)"
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
  // 事件数据列表
  events: {
    type: Array,
    default: () => []
  },
  // 列配置
  columns: {
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
    scrollPosition: 0,
    isMouseInside: false, // 标记鼠标是否在滚动区域内
    shouldAutoScroll: true // 标记是否应该自动滚动
  }
},
mounted() {
  if (this.autoScroll) {
    this.startEventScroll();
  }
},
beforeUnmount() {
  this.stopEventScroll();
},
watch: {
  autoScroll(newVal) {
    this.shouldAutoScroll = newVal;
    if (newVal && !this.isMouseInside) {
      this.startEventScroll();
    } else {
      this.stopEventScroll();
    }
  }
},
methods: {
  startEventScroll() {
    // 只有在应该自动滚动且鼠标不在内部时才开始滚动
    if (!this.shouldAutoScroll || this.isMouseInside) {
      return;
    }
    
    this.scrollTimer = setInterval(() => {
      const eventList = this.$refs.eventList;
      if (eventList && !this.isMouseInside) {
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

  // 鼠标移入事件
  handleMouseEnter() {
    this.isMouseInside = true;
    this.stopEventScroll();
    
    // 同步当前滚动位置
    const eventList = this.$refs.eventList;
    if (eventList) {
      this.scrollPosition = eventList.scrollTop;
    }
  },

  // 鼠标移出事件
  handleMouseLeave() {
    this.isMouseInside = false;
    
    // 同步当前滚动位置
    const eventList = this.$refs.eventList;
    if (eventList) {
      this.scrollPosition = eventList.scrollTop;
    }
    
    // 恢复自动滚动
    if (this.shouldAutoScroll) {
      this.startEventScroll();
    }
  },

  // 滚轮事件处理
  handleWheel(event) {
    event.preventDefault(); // 阻止默认滚动行为
    
    const eventList = this.$refs.eventList;
    if (!eventList) return;
    
    // 根据滚轮方向调整滚动位置
    const delta = event.deltaY;
    const scrollStep = 30; // 每次滚动的像素数
    
    this.scrollPosition += delta > 0 ? scrollStep : -scrollStep;
    
    // 限制滚动范围
    const maxScroll = eventList.scrollHeight - eventList.clientHeight;
    this.scrollPosition = Math.max(0, Math.min(this.scrollPosition, maxScroll));
    
    // 应用滚动位置
    eventList.scrollTop = this.scrollPosition;
  },

  // 获取优先级样式类 - 基于 mid_category
  getPriorityClass(event) {
    if (event.mid_category) {
      const priority = event.mid_category;
      if (priority === '一级') {
        return 'priority-1';
      } else if (priority === '二级') {
        return 'priority-2';
      } else if (priority === '三级') {
        return 'priority-3';
      }
    }
    return '';
  },

  // 获取列样式类
  getColumnClass(columnKey) {
    const baseClass = `event-${columnKey}`;
    if (columnKey === 'mid_category') {
      return `${baseClass} event-priority`;
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
display: flex;
flex-direction: column;
}

.event-header {
display: flex;
flex-shrink: 0;
background: url("../../assets/images/CompanyOverview/yunxing1.png") center center no-repeat;
background-size: 100% 100%;
padding: 15px 15px 15px 50px;
}

.header-item {
font-size: 26px;
font-weight: 600;
text-align: left;
color: #A3C5FF;
font-family: "Alibaba PuHuiTi 2.0";
font-weight: 500;
line-height: 42px; /* 161.538% */
height: 42px;
}

.header-item:last-child {
border-right: none;
}

.event-list {
flex: 1;
overflow: hidden;
cursor: default; /* 添加默认光标样式 */
}

.event-item {
display: flex;
border-bottom: 1px solid rgba(255, 255, 255, 0.05);
transition: background-color 0.3s ease;
height: 42px;
line-height: 42px;
padding: 15px 15px 15px 0px;
}

.event-item:hover {
background: rgba(255, 255, 255, 0.05);
}

.event-priority {
display: flex;
align-items: center;
justify-content: center;
font-size: 26px;
font-weight: 400;
padding-left: 40px;
color: #A3C5FF;
}

.event-content {
font-size: 26px;
display: flex;
align-items: center;
color: #A3C5FF;
}

.event-location {
padding: 15px 20px;
font-size: 26px;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
color: #A3C5FF;
}

.event-time {
font-size: 26px;
text-align: left;
position: relative;
left: 15px;
color: #A3C5FF;
align-items: center;
justify-content: center;
}

/* 事件优先级颜色 - 基于 mid_category */
.priority-1 .event-priority {
color: #A3C5FF;
background: url("../../assets/images/CompanyOverview/yiji.png") 0% center no-repeat;
}

.priority-2 .event-priority {
color: #A3C5FF;
background: url("../../assets/images/CompanyOverview/erji.png") 0% center no-repeat;
}

.priority-3 .event-priority {
color: #A3C5FF;
background: url("../../assets/images/CompanyOverview/sanji.png") 0% center no-repeat;
}
</style>
