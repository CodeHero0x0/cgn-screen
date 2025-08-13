## 三峡能源 尺寸 8640*1890
快速构建项目相关内容
## 运行打包

``` bash
# 安装依赖
npm install && yarn && cnpm i

# 本地开发
npm run dev && make dev

# 打包
npm run build && make pro
```

## 分辨率说明
### 形式一 默认使用等比缩放
在 main.ts 里面使用的 AppScale.vue，并且禁用 postcss.config.js 的字体转换【postcss-pxtorem】

### 形式二 默认使用自适应分辨率
在 main.ts 里面使用的 App.vue，并且启用 postcss.config.js 的字体转换【postcss-pxtorem】
