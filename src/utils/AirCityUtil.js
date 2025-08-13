// interface Marker{
//     id: string;
//     coordinate: number[];
//     imagePath:string;
//     text:string;
//     textOffset?: number[]
//     imageSize?: number[]
//     info?: any
// }

const airCityUtil = {
  timer1: null,
  timer2: null,
  timer3: null,
  // 添加标记
  addMarker(data) {
    const o = {
      id: data.id,
      coordinate: data.coordinate, //坐标位置
      coordinateType: 0, //坐标系类型
      anchors: [-16, 32], //锚点
      range: [0, 10], //可视范围
      imagePath: data.imagePath, //显示图片路径

      imageSize: data.imageSize ? data.imageSize : [150, 130], //图片的尺寸
      useTextAnimation: false,
      text: data.text, //显示的文字
      textRange: [0, 100], //文本可视范围[近裁距离, 远裁距离]
      textOffset: data.textOffset ? data.textOffset : [-100, -38], // 文本偏移
      // textBackgroundColor: [1.0,1.0,1.0,0.1],//文本背景颜色
      textBackgroundColor: [0, 0, 0, 0.5], //文本背景颜色
      fontSize: 12, //字体大小
      fontOutlineSize: 0.5, //字体轮廓线大小
      fontColor: "#FFFFFF", //字体颜色
      fontOutlineColor: "#FFFFFF", //字体轮廓线颜色

      showLine: true, //标注点下方是否显示垂直牵引线
      lineSize: [1, 100], //垂直牵引线宽度和高度[width, height]
      lineColor: Color.White, //垂直牵引线颜色
      lineOffset: [30, 0], //垂直牵引线偏移

      autoHeight: false, // 自动判断下方是否有物体
      displayMode: 2, //显示模式
      priority: 0, //避让优先级
      occlusionCull: false, //是否参与遮挡剔除
      userData: data.info ? data.info : null,
    }
    __g.marker.add(o)
  },
  returnMarker(data) {
    const markerObj = {
      id: data.id,
      coordinate: data.coordinate, //坐标位置
      coordinateType: 0, //坐标系类型
      anchors: data.anchors ? data.anchors : [-16, 32], //锚点
      range: data.range ? data.range : [0, 20], //可视范围
      imagePath: data.imagePath, //显示图片路径

      imageSize: data.imageSize ? data.imageSize : [150, 130], //图片的尺寸
      useTextAnimation: false,
      text: data.text, //显示的文字
      textRange: data.textRange ? data.textRange : [0, 500], //文本可视范围[近裁距离, 远裁距离]
      textOffset: data.textOffset ? data.textOffset : [-100, -38], // 文本偏移
      // textBackgroundColor: [1.0,1.0,1.0,0.1],//文本背景颜色
      textBackgroundColor: data.textBackgroundColor ? data.textBackgroundColor : [0, 0, 0, 0.5], //文本背景颜色
      fontSize: data.fontSize ? data.fontSize : 12, //字体大小
      fontOutlineSize: 0.5, //字体轮廓线大小
      fontColor: "#FFFFFF", //字体颜色
      fontOutlineColor: "#FFFFFF", //字体轮廓线颜色

      showLine: false, //标注点下方是否显示垂直牵引线
      lineSize: [1, 100], //垂直牵引线宽度和高度[width, height]
      lineColor: Color.White, //垂直牵引线颜色
      lineOffset: [30, 0], //垂直牵引线偏移

      autoHeight: false, // 自动判断下方是否有物体
      displayMode: data.displayMode ? data.displayMode : 4, //显示模式
      priority: 0, //避让优先级
      occlusionCull: false, //是否参与遮挡剔除
      userData: data.info ? data.info : null,
    }
    if (data.lineStr === "温度") {
      markerObj.lineSize = [1, 100]
    } else if (data.lineStr === "压力") {
      markerObj.lineSize = [1, 200]
    }
    return markerObj
  },
  returnMarkerText(data) {
    const markerTextObj = {
      id: data.id,
      coordinate: data.coordinate, //坐标位置
      coordinateType: 0, //坐标系类型
      anchors: [-16, 32], //锚点
      range: [0, 10], //可视范围
      imagePath: data.imagePath, //显示图片路径

      imageSize: data.imageSize ? data.imageSize : [150, 130], //图片的尺寸
      useTextAnimation: false,
      text: data.text, //显示的文字
      textRange: [0, 6000], //文本可视范围[近裁距离, 远裁距离]
      textOffset: data.textOffset ? data.textOffset : [-100, -38], // 文本偏移
      // textBackgroundColor: [1.0,1.0,1.0,0.1],//文本背景颜色
      textBackgroundColor: [0, 0, 0, 0.5], //文本背景颜色
      fontSize: 10, //字体大小
      fontOutlineSize: 0.1, //字体轮廓线大小
      fontColor: "#C5C5C5", //字体颜色
      fontOutlineColor: "#C5C5C5", //字体轮廓线颜色

      showLine: false, //标注点下方是否显示垂直牵引线
      // lineSize: [1, 100],//垂直牵引线宽度和高度[width, height]
      lineColor: Color.White, //垂直牵引线颜色
      lineOffset: [30, 0], //垂直牵引线偏移

      autoHeight: false, // 自动判断下方是否有物体
      displayMode: 2, //显示模式
      priority: 0, //避让优先级
      occlusionCull: false, //是否参与遮挡剔除
      userData: data.info ? data.info : null,
    }
    if (data.lineStr === "温度") {
      markerTextObj.lineSize = [1, 100]
    } else if (data.lineStr === "压力") {
      markerTextObj.lineSize = [1, 200]
    }
    return markerTextObj
  },
  //
  boosterStationMove(floor) {
    const layerId = {
      f1: {
        id: "F5263D5545B87927BA1678B57FF4E9DE",
        location: [1164968.2, 3671739.8, 19.0],
        maxStep: 21,
        timer: null,
      },
      f2: {
        id: "8CF5149E46C53D472705CBA1B5008C04",
        location: [1164968.2, 3671739.8, 19.0],
        maxStep: 43,
        timer: null,
      },
      f3: {
        id: "6DE76A504F09E34CB9C0A4A985C3EFA3",
        location: [1164968.2, 3671739.8, 19.0],
        maxStep: 65,
        timer: null,
      },
    }
    __g.tileLayer.setLocation(layerId[floor].id, layerId[floor].location)
    let index = 0
    let stationF1x = layerId[floor].location[0]
    layerId[floor].timer = setInterval(() => {
      if (index < layerId[floor].maxStep) {
        __g.tileLayer.setLocation(layerId[floor].id, [
          (stationF1x += 2),
          layerId[floor].location[1],
          layerId[floor].location[2],
        ])
        index++
      } else {
        clearInterval(layerId[floor].timer)
      }
    }, 50)
  },
  boosterStationReset(floor) {
    const layerId = {
      f1: {
        id: "F5263D5545B87927BA1678B57FF4E9DE",
        location: [1164968.2, 3671739.8, 19.0],
        maxStep: 21,
        timer: null,
      },
      f2: {
        id: "8CF5149E46C53D472705CBA1B5008C04",
        location: [1164968.2, 3671739.8, 19.0],
        maxStep: 43,
        timer: null,
      },
      f3: {
        id: "6DE76A504F09E34CB9C0A4A985C3EFA3",
        location: [1164968.2, 3671739.8, 19.0],
        maxStep: 65,
        timer: null,
      },
    }
    // __g.tileLayer.setLocation(layerId[floor].id, layerId[floor].location)
    let index = 0
    let stationF1x = layerId[floor].location[0] + 2 * layerId[floor].maxStep
    layerId[floor].timer = setInterval(() => {
      if (index < layerId[floor].maxStep) {
        __g.tileLayer.setLocation(layerId[floor].id, [
          (stationF1x -= 2),
          layerId[floor].location[1],
          layerId[floor].location[2],
        ])
        index++
      } else {
        clearInterval(layerId[floor].timer)
      }
    }, 50)
  },
  async layerChange(layerList, flag) {
    let data = []
    const fileIds = []
    const layerIds = []
    //获取图层树信息
    // const res = await window.api.infoTree.get()
    data = window.infotreeData
    data.map(async (item) => {
      if (layerList.includes(item.name)) {
        if (item.type === "EPT_Scene") {
          fileIds.push(item.iD)
        } else {
          layerIds.push(item.iD)
        }
      }
    })
    if (flag) {
      await window.Freedo3D.tileLayer.show(fileIds)
      await window.Freedo3D.infoTree.show(layerIds)
    } else {
      await window.Freedo3D.tileLayer.hide(fileIds)
      await window.Freedo3D.infoTree.hide(layerIds)
    }
  },

  addStationPointOnMap(lng, lat) {
    // 获取地图容器的大小
    const mapWidth = 2347
    const mapHeight = 1782

    // 经纬度坐标
    // var lat = 110.45
    // var lng = 37.698955

    // 地图的中心点经纬度
    const centerLat = 36.5375
    const centerLng = 104.92

    // 计算经纬度与中心点的距离（单位：度）
    const latDelta = lat - centerLat
    const lngDelta = lng - centerLng

    // 计算距离在屏幕坐标上的比例
    const latRatio = latDelta / (75 - centerLat) // 假设地图范围为 90  度
    const lngRatio = lngDelta / (167 - centerLng) // 假设地图范围为 180 度

    // 计算屏幕坐标
    const screenX = mapWidth / 2 + lngRatio * mapWidth
    const screenY = mapHeight / 2 - latRatio * mapHeight

    // 输出屏幕坐标
    // console.log('点位',screenX, screenY)

    return {
      screenX: screenX,
      screenY: screenY,
    }
  },
}

export default airCityUtil
