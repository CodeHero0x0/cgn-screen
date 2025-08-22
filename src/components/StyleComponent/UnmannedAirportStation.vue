<template>
	<div class="event-panel" v-if="hasData" @mouseenter="stopEventScroll" @mouseleave="startEventScroll">
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
		>
		  <div 
			v-for="column in finalColumns" 
			:key="column.key"
			:class="getColumnClass(column.key, event)"
			:style="{ flex: column.flex || '1' }"
		  >
			{{ shouldShowContent(column.key, event) ? getColumnValue(event, column) : '' }}
		  </div>
		</div>
	  </div>
	</div>
	<!-- 可选：显示加载状态或空状态 -->
	<div v-else class="empty-state">
	  <div class="loading-text">等待数据加载中...</div>
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
    },
    // 字段映射关系 - 如果没有提供则使用默认映射
    fieldMapping: {
      type: Object,
      default: () => ({
        sub_category: 'sub_category',
        four_category: 'four_category', 
        metric_name: 'metric_name',
        metric_value: 'metric_value',
        unit: 'unit'
      })
    }
  },
  data() {
    return {
      scrollTimer: null,
      scrollPosition: 0,
      // 模拟等级数据（您可以根据实际业务逻辑调整）
      levelOptions: ['一般', '重要', '紧急'],
      // 组件是否已初始化
      isInitialized: false
    }
  },
  computed: {
    // ... existing computed properties ...
    // 检查是否有数据
    hasData() {
      const hasEchartsData = this.echartsData && Array.isArray(this.echartsData) && this.echartsData.length > 0;
      const hasPredictionData = this.predictionData && Array.isArray(this.predictionData) && this.predictionData.length > 0;
      return hasEchartsData && hasPredictionData;
    },

    // 最终的列配置 - 直接使用 predictionData
    finalColumns() {
      return this.predictionData || [];
    },
    
    // 合并数据源
    events() {
      if (!this.hasData) {
        return [];
      }

      // 处理 echartsData，根据 predictionData 动态映射字段
      const echartsEvents = this.echartsData.map((item, index) => {
        const event = { id: `echarts_${index}` };
        
        // 遍历列配置，动态映射字段
        this.finalColumns.forEach(column => {
          const sourceKey = this.getSourceKey(column.key);
          
          if (column.key === 'content2') {
            // 等级字段特殊处理 - 随机生成或根据业务逻辑
            event[column.key] = this.getRandomLevel();
          } else if (sourceKey && item.hasOwnProperty(sourceKey)) {
            // 从源数据中获取对应字段的值
            event[column.key] = item[sourceKey] || '';
          } else {
            // 如果源数据中没有对应字段，尝试直接使用 column.key
            event[column.key] = item[column.key] || '';
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
  // ... existing mounted, beforeUnmount, watch ...
  mounted() {
    console.log('组件已挂载，检查数据状态...');
    this.initComponent();
  },
  beforeUnmount() {
    this.stopEventScroll();
  },
  watch: {
    // 监听 echartsData 变化
    echartsData: {
      handler(newVal, oldVal) {
        console.log('echartsData 数据变化:', this.echartsData);
        this.handleDataChange();
      },
      deep: true,
      immediate: true
    },
    
    // 监听 predictionData 列配置变化
    predictionData: {
      handler(newVal, oldVal) {
        console.log('predictionData 列配置变化:', {
          newLength: newVal ? newVal.length : 0,
          oldLength: oldVal ? oldVal.length : 0,
          newVal
        });
        
        this.handleDataChange();
      },
      deep: true,
      immediate: true
    },

    // 监听 eventData 变化
    eventData: {
      handler(newVal, oldVal) {
        console.log('eventData 数据变化:', newVal);
        this.handleDataChange();
      },
      deep: true,
      immediate: true
    },

    // 监听 hasData 变化
    hasData: {
      handler(newVal, oldVal) {
        console.log('数据状态变化:', { newVal, oldVal });
        
        if (newVal && !oldVal) {
          // 数据从无到有，初始化组件
          console.log('数据加载完成，初始化组件...');
          this.$nextTick(() => {
            this.initComponent();
          });
        } else if (!newVal && oldVal) {
          // 数据从有到无，停止滚动
          console.log('数据清空，停止滚动...');
          this.stopEventScroll();
          this.isInitialized = false;
        }
      },
      immediate: true
    },

    // 监听 autoScroll 配置变化
    autoScroll(newVal) {
      if (newVal && this.hasData) {
        this.checkAndStartScroll();
      } else {
        this.stopEventScroll();
      }
    },

    // 监听合并后的事件数据变化
    events: {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          console.log('合并后的事件数据变化:', newVal.length);
          // 重置滚动位置
          this.scrollPosition = 0;
          if (this.$refs.eventList) {
            this.$refs.eventList.scrollTop = 0;
          }
        }
      },
      deep: true
    }
  },
  methods: {
    // ... existing methods ...
    
    // 获取源数据字段名
    getSourceKey(columnKey) {
      // 如果提供了字段映射关系，使用映射关系
      if (this.fieldMapping && this.fieldMapping[columnKey]) {
        return this.fieldMapping[columnKey];
      }
      
      // 否则直接使用 columnKey
      return columnKey;
    },

    // 判断是否应该显示内容
    shouldShowContent(columnKey, event) {
      if (columnKey === 'metric_value' && event) {
        const level = event[columnKey];
        // 如果是等级值，则不显示文字内容
        return !['一般', '重要', '紧急'].includes(level);
      }
      return true;
    },

    // 处理数据变化
    handleDataChange() {
      if (this.hasData) {
        this.$nextTick(() => {
          this.initComponent();
        });
      } else {
        this.stopEventScroll();
        this.isInitialized = false;
      }
    },

    // 初始化组件
    initComponent() {
      if (this.hasData && !this.isInitialized) {
        console.log('正在初始化组件...');
        this.isInitialized = true;
        
        // 延迟一小段时间确保DOM完全渲染
        setTimeout(() => {
          this.checkAndStartScroll();
        }, 100);
      }
    },

    // 随机生成等级（您可以根据实际业务逻辑调整）
    getRandomLevel() {
      return this.levelOptions[Math.floor(Math.random() * this.levelOptions.length)];
    },

    // 检查数据并启动滚动
    checkAndStartScroll() {
      if (this.autoScroll && this.hasData && this.events.length > 0) {
        console.log('启动自动滚动...');
        // 先停止之前的滚动
        this.stopEventScroll();
        // 启动新的滚动
        this.startEventScroll();
      }
    },

    startEventScroll() {
      // 只有当有数据时才启动滚动
      if (!this.hasData || this.events.length === 0) {
        console.log('没有数据，无法启动滚动');
        return;
      }

      console.log('开始滚动，事件数量:', this.events.length);

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
        console.log('停止滚动');
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
          if (this.autoScroll && this.hasData) {
            this.checkAndStartScroll();
          }
        }, 2000);
      }
    },

    // 获取列样式类
    getColumnClass(columnKey, event) {
      const baseClass = `event-${columnKey}`;
      
      // 如果是 metric_value 列（等级列），根据等级添加不同的样式类
      if (columnKey === 'metric_value' && event) {
        const level = event[columnKey];
        switch(level) {
          case '一般':
            return `${baseClass} level-normal`;
          case '重要':
            return `${baseClass} level-important`;
          case '紧急':
            return `${baseClass} level-urgent`;
          default:
            return baseClass;
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
/* ... existing styles ... */

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
  height: 72px;
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
  min-height: 72px;
  padding-left: 50px;
  align-items: stretch;
}

.event-item div {
  font-size: 26px;
  font-weight: 600;
  text-align: left;
  color: #A3C5FF;
  font-family: "Alibaba PuHuiTi 2.0";
  line-height: 1.4;
  padding: 12px 8px;
  padding-left: 0px;
  display: flex;
  align-items: center;
  word-wrap: break-word;
  word-break: break-all;
  overflow-wrap: break-word;
  white-space: normal;
}

.event-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

/* 空状态样式 */
.empty-state {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #A3C5FF;
  font-family: "Alibaba PuHuiTi 2.0";
}

.loading-text {
  font-size: 28px;
  opacity: 0.7;
}

/* 基础列样式 */
.event-sub_category {
  font-size: 26px;
  font-weight: 400;
  color: #A3C5FF;
}

.event-four_category {
  font-size: 26px;
  text-align: left;
  color: #A3C5FF;
}

.event-metric_name {
  font-size: 26px;
  text-align: left;
  color: #A3C5FF;
}

.event-metric_value {
  font-size: 26px;
  text-align: left;
  color: #A3C5FF;
}

.event-unit {
  font-size: 26px;
  text-align: left;
  color: #A3C5FF;
}

/* 等级列的不同状态样式 - 只显示背景图，不显示文字 */
.event-metric_value.level-normal {
    background: url("../../assets/images/equipmentManagement/yiban.png") -10% center no-repeat;
    background-size: contain;
    min-height: 40px;
    padding: 0px;
    position: relative;
    left: -30px;
}

.event-metric_value.level-important {
    background: url("../../assets/images/equipmentManagement/yanzhong.png") -10% center no-repeat;
    background-size: contain;
    min-height: 40px;
    padding: 0px;
    position: relative;
    left: -30px;
  
}

.event-metric_value.level-urgent {
    background: url("../../assets/images/equipmentManagement/weiji.png") -10% center no-repeat;
    background-size: contain;
    min-height: 40px;
    padding: 0px;
    position: relative;
    left: -30px;
  
}
</style>
