// 日期格式化函数
export function formatDate(date,fmt) {
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o ={
        'M+': date.getMonth()+1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o){
        if(new RegExp(`(${k})`).test(fmt))
        {
            let str = o[k] + '';
            fmt=fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:padLeftZero(str))
        }

    }
    return fmt
}
function padLeftZero(str){
    return ('00' + str).substr(str.length)
}


//计算一个点是否在多边形里,参数:点{x:1,y:1},多边形数组[{x:1,y:1}]
export function pointInPoly(pt, poly) { 
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
        && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
        && (c = !c);
    return c;
}
export function pointInPoly2(pt, poly) { 
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i][1] <= pt[1] && pt[1] < poly[j][1]) || (poly[j][1] <= pt[1] && pt[1] < poly[i][1]))
        && (pt[0] < (poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0])
        && (c = !c);
    return c;
}

/**
* p :[x,y] ,带判定的P点
* poly: [[x0,y0],[x1,y1]......] 多边形的路径
*/
// export function pointInPoly2(p, poly) {
//     // px，py为p点的x和y坐标
//     let px = p[0],
//         py = p[1],
//         flag = false

//     //这个for循环是为了遍历多边形的每一个线段
//     for(let i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
//         let sx = poly[i][0],  //线段起点x坐标
//             sy = poly[i][1],  //线段起点y坐标
//             tx = poly[j][0],  //线段终点x坐标
//             ty = poly[j][1]   //线段终点y坐标

//         // 点与多边形顶点重合
//         if((sx === px && sy === py) || (tx === px && ty === py)) {
//             return true
//         }

//         // 点的射线和多边形的一条边重合，并且点在边上
//         if((sy === ty && sy === py) && ((sx > px && tx < px) || (sx < px && tx > px))) {
//             return true
//         }

//         // 判断线段两端点是否在射线两侧
//         if((sy < py && ty >= py) || (sy >= py && ty < py)) {
//             // 求射线和线段的交点x坐标，交点y坐标当然是py
//             let x = sx + (py - sy) * (tx - sx) / (ty - sy)

//             // 点在多边形的边上
//             if(x === px) {
//                 return true
//             }

//             // x大于px来保证射线是朝右的，往一个方向射，假如射线穿过多边形的边界，flag取反一下
//             if(x > px) {
//                 flag = !flag
//             }
//         }
//     }

//     // 射线穿过多边形边界的次数为奇数时点在多边形内
//     return flag ? true : false
// }


// const MathUtil = {
//     calculateModulusOfVector(x, y) {
//         return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
//     },
//     calculateAngleOfVector(x2, y2) {
//         const x1 = 1;
//         const y1 = 0;
//         const radian = Math.acos((x1 * x2 + y1 * y2) / (this.calculateModulusOfVector(x1, y1) * this.calculateModulusOfVector(x2, y2)));
//         const angle = this.toDegrees(radian);
//         return y2 > 0 ? angle : 360 - angle;
//     },
//     rotate(x1, y1, x2, y2, rotateDegree) {
//         const arr = [];
//         //根据角度求弧度
//         const radian = (rotateDegree * 1.0 / 180) * Math.PI;
//         //旋转
//         arr[0] = (x1 - x2) * Math.cos(radian) - (y1 - y2) * Math.sin(radian) + x2;
//         arr[1] = (y1 - y2) * Math.cos(radian) + (x1 - x2) * Math.sin(radian) + y2;

//         return arr;
//     },
//     toDegrees(angrad) {
//         return angrad * 180.0 / Math.PI;
//     },
//     getMinimumEnvelopeRectangle(pointList) {
//         将凹多边形转化为凸多边形
//         // pointList = new ConcaveToConvexApi().concaveToConvex(pointList);

//         寻找最小包络矩形
//         const minRectangleArea = 1.7976931348623157e+308;
//         const bestLen = 0;
//         const bestWid = 0;
//         const bestPointArr = [];
//         for (const m = 0; m < pointList.length; m++) {
//             const n = (m + 1) % pointList.length;
//             const mX = pointList[m][0];
//             const mY = pointList[m][1];
//             //求当前边和(1,0)的角度
//             const angle = -this.calculateAngleOfVector(
//                     pointList[n][0] - mX, pointList[n][1] - mY
//             );
//             ///将除了 点m 之外的每个点绕着 点m 旋转， 然后构造矩形
//             const minX = mX;
//             const minY = mY;
//             const maxX = mX;
//             const maxY = mY;
//             for (const i = 0; i < pointList.length; i++) {
//                 if (i == m) {
//                     continue;
//                 }
//                 const pointI = pointList[i];
//                 //旋转
//                 const rotate = this.rotate(pointI[0], pointI[1], mX, mY, angle);
//                 minX = Math.min(minX, rotate[0]);
//                 maxX = Math.max(maxX, rotate[0]);
//                 minY = Math.min(minY, rotate[1]);
//                 maxY = Math.max(maxY, rotate[1]);
//             }
//             ///如果找到更小的矩形，更新最小矩形
//             if ((maxX - minX) * (maxY - minY) < minRectangleArea) {
//                 minRectangleArea = (maxX - minX) * (maxY - minY);
//                 bestLen = maxX - minX;
//                 bestWid = maxY - minY;
//                 if (bestLen < bestWid) {
//                     const temp = bestLen;
//                     bestLen = bestWid;
//                     bestWid = temp;
//                 }
//                 //存储矩形的左下角
//                 bestPointArr[0] = new Point(minX, minY);
//                 //存储矩形的右下角
//                 bestPointArr[1] = new Point(maxX, minY);
//                 //存储矩形的右上角
//                 bestPointArr[2] = new Point(maxX, maxY);
//                 //存储矩形的左上角
//                 bestPointArr[3] = new Point(minX, maxY);
//                 //将矩形的点位旋转回来
//                 for (const point in bestPointArr) {
//                     const rotateArr = this.rotate(point[0], point[1], mX, mY, -angle);
//                     point.setX(rotateArr[0]);
//                     point.setY(rotateArr[1]);
//                 }
//             }

//         }

//         const pointXList = [];
//         const pointYList = [];
//         for (const point in pointList) {
//             pointXList.add(point[0]);
//             pointYList.add(point[1]);
//         }
//         pointXList.add(pointList[0][0]);
//         pointYList.add(pointList[0][1]);

//         // return new Rectangle(bestLen, bestWid, bestPointArr, pointXList, pointYList);

//     }
// }
