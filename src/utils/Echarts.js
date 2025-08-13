// echarts 实例管理
import * as echarts from 'echarts'
import z_light from '/static/js/theme/echarts/z_light.project.json'
import z_dark from '/static/js/theme/echarts/z_dark.project.json'

function around(obj, prop, advice){
  var exist = obj[prop];
  var previous = function(){
    return exist.apply(obj, arguments);
  };
  var advised = advice(previous);
  obj[prop] = function(){
    //当调用remove后，advised为空
    //利用闭包的作用域链中可以访问到advised跟previous变量，根据advised是否为空可以来决定调用谁
    return advised ? advised.apply(obj, arguments) : previous.apply(obj, arguments);
  };

  return {
    remove: function(){
      //利用闭包的作用域链，在remove时将advised置空，这样执行过程中不会进入本次around
      //这几个不能删
      //obj[prop] = exist;
      advised = null;
      advice = null;
      //previous = null;
      //exist = null;
      //obj = null;
    }
  }
}
// var count = 1;
// advice = function(originalFunc){
//   var current = count++;
//   return function() {
//     console.log("before function " + current);
//     originalFunc.apply(this, arguments);
//     console.log("after function " + current);
//   }
// }
// var obj = {
//   foo: function(arg){
//     console.log(this.name + " and " + arg);
//   },
//   name: "obj"
// }
//
// h1 = around(obj, 'foo', advice);
// h2 = around(obj, 'foo', advice);
// obj.foo('hello world');
// h1.remove();
// obj.foo('hello world');
// h2.remove();
// obj.foo('hello world');

/**
 * 数据拦截器：
 *
 *     对复杂类型数据做深度递归，提供修改拦截属性，回调中可对属性，值等做处理
 *
 * @param {*} data  object/array  需要拦截的目标(数组或对象)
 * @param {*} callback1 function  回调函数 在内部对最内层(value为基础类型，再无嵌套)的value做一些事情，回调参数为一个obj
 * @param {*} callback2 function  同上，区别在于value为复杂类型，有嵌套
 * 回调参数说明：
 *      {
            type: 'Object',// 'Object'|'Array' 父节点的类型
            obj: data,      //  父节点对象(引用)
            key: key,       //  当前的key(ps:type为'Array'即为当前索引)
            value: value    //  当前的value
        }
 *  应用场景1：
 当你的项目中需要对特殊数据做处理的时候，比如测试说页面不能出现null！
 此时你可以在数据渲染之前调用此函数，在callback1中对value做一些处理

 应用场景2(最初写此函数的目的)：
 对echarts的options进行个性化设置，data支持多种配置方式，不同的方式
 做不同的处理，用此函数在callback2中对data做一些处理后再setOption
 */
function dataInterceptor(data, callback1, callback2) {

  again(data)

  function again(data) {

    if (type(data) === 'Object') {

      for (var key in data) {
        // console.log('key------',key)   ----所有的key都经过这里
        if (typeof data[key] === "object") {
          // 父节点是对象，值为复杂类型
          if (callback2) callback2({
            type: 'Object',
            obj: data,
            key: key,
            value: data[key]
          })
          again(data[key])
        } else {
          // console.log(data[key])
          //  父节点是对象，值为基础类型
          if (callback1) callback1({
            type: 'Object',
            obj: data,
            key: key,
            value: data[key]
          })
        }
      }

    } else if (type(data) === 'Array') {
      data.forEach(function (item, index) {
        if (typeof item === "object") {
          // 父节点是数组 ，值为复杂类型
          if (callback2) callback2({
            type: 'Array',
            obj: data,
            key: index,
            value: item
          })
          again(item)
        } else {
          //  父节点是数组，值为基础类型--->数组的每一项
          // console.log(item)
          if (callback1) callback1({
            type: 'Array',
            obj: data,
            key: index,
            value: item
          })
        }
      })
    }
  }

  function type(data) {
    return Object.prototype.toString.call(data).slice(8, -1)
  }
}

function ChangeFontSize(fontSize) {
  let docEl = document.documentElement;
  let clientWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (!clientWidth) return;
  let scale = (clientWidth / 4860);
  return (scale * fontSize) + 5;
}


const Echarts = {
    theme: 'light',
    flag: false,
    around: false, // 是否拦截转换字体大小
    echartsMap: {},
    // 添加标记
    init(dom, theme, params, themeFunc) {
      if (!this.flag){
        // 给echart 注册主题
        echarts.registerTheme('light', z_light.theme)
        echarts.registerTheme('dark', z_dark.theme)
        this.flag = true
      }
      let echart = echarts.init(dom, theme ? theme : this.theme, params || {})
      if (this.around) {
        // 拦截方法之前干点啥，能获取到参数,如果是固定比例则注释掉
        around(echart, 'setOption', (originalFunc)=>{
          return function() {
            // 获取原始options
            let options = arguments[0]
            console.log(options, 'options 改变之前')
            function changeSize(data) {
              if(data.key === 'fontSize') {
                data.obj.fontSize = ChangeFontSize (Number(data.value))
              }
            }
            dataInterceptor(options,changeSize,null)
            console.log(options, 'options 改变之后')
            originalFunc.apply(this, [options])
          }
        })
      }
      this.echartsMap[echart.id] = {
        instance: echart,
        domId: dom,
        option: {},
        ownTheme: theme || '',
        themeFunc: themeFunc || null // 主题切换回调，没有办法使用全局主题，就自己加个更新方法，工具类会调用下
      }
      return echart
    },
     remove () {

     },
      setOptionX (func, data) {
        // 这里可以处理下牛逼了
        func(data)
      },
    // 切换主题
    changeTheme (theme) {
      this.theme = theme
      for (let key in this.echartsMap) {
        let item = this.echartsMap[key]
        // item.option = JSON.parse(JSON.stringify(item.instance.getOption()))
        // item.instance.dispose()
        // item.instance = null
        // let echart = echarts.init(item.domId, theme)
        // item.instance = echart
        // 没有主题的跟随主主题
        if (item.ownTheme.length === 0) {
          item.instance.setOption(theme === 'light' ? z_light.theme : z_dark.theme )
        } else {
          if (item.themeFunc) {
            item.themeFunc(theme)
          }
        }
      }
    },
    // 浏览器缩放
    resize() {
      for (let key in this.echartsMap) {
        let item = this.echartsMap[key]
        item.instance.resize()
      }
    }
}

export default Echarts;
