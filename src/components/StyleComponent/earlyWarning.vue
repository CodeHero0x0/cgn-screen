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
      
      <div class="event-list" ref="eventList">
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
        default: () => [
        ]
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
  }
  
  .event-item {
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: background-color 0.3s ease;
    height: 42px;
    line-height: 42px;
    padding: 15px 15px 15px 0px;
    div:nth-of-type(2){
        padding-left: 30px;
    }
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
    padding: 15px 20px;
    font-size: 26px;
    text-align: center;
    color: #A3C5FF;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* 事件优先级颜色 */
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