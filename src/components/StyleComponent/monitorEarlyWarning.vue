<template>
    <div class="event-panel" @mouseenter="stopEventScroll" @mouseleave="startEventScroll">
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
      
      <div class="event-list" ref="eventList" @wheel.prevent="handleWheelScroll">
        <div 
          class="event-item"
          v-for="event in events" 
          :key="event.id"
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
    },
    // 优先级配置
    priorityConfig: {
      type: Object,
      default: () => ({
        1: { text: '一级', color: '#ff4757' },
        2: { text: '二级', color: '#ffa726' },
        3: { text: '三级', color: '#2ed573' }
      })
    }
  },
  data() {
    return {
      scrollTimer: null,
      scrollPosition: 0
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
      if (newVal) {
        this.startEventScroll();
      } else {
        this.stopEventScroll();
      }
    }
  },
  methods: {
    startEventScroll() {
      this.scrollTimer = setInterval(() => {
        const eventList = this.$refs.eventList;
        if (eventList) {
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
      eventList.scrollTop += event.deltaY; // 根据滚轮滚动的距离调整 scrollTop
    },
  
    // 获取优先级样式类
    getPriorityClass(event) {
      if (event.priority) {
        return `priority-${event.priority}`;
      }
      return '';
    },
  
    // 获取列样式类
    getColumnClass(columnKey) {
      const baseClass = `event-${columnKey}`;
      if (columnKey === 'priority') {
        return `${baseClass} event-priority`;
      }
      return baseClass;
    },
  
    // 获取列显示值
    getColumnValue(event, column) {
      if (column.type === 'priority' && event.priority) {
        return this.priorityConfig[event.priority]?.text || event.priority;
      }
      
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
  line-height: 72px; /* 161.538% */
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
  height: 72px;
  line-height: 72px;
  padding-left: 50px;
}

.event-item div {
  font-size: 26px;
  font-weight: 600;
  text-align: left;
  color: #A3C5FF;
  font-family: "Alibaba PuHuiTi 2.0";
  line-height: 72px; /* 161.538% */
  height: 72px;
}

.event-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.event-priority {
  font-size: 26px;
  font-weight: 400;
  color: #A3C5FF;
}

.event-location {
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
