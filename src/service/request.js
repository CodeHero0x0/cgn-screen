import axios from 'axios'
import qs from 'qs'
import { SM4Util } from '../utils/sm4encry'
import { setToken, getToken, removeToken} from '../utils/auth'
import { Message } from 'element-ui'
// 在config.js文件中统一存放一些公共常量，方便之后维护
const baseURL = 'http://cgn-cloud-gateway:18080/data-service'

const BACKEND_SERVICE_PREFIX = '/data-service'
window.SM4Util = SM4Util
// 添加请求拦截器，在发送请求之前做些什么(**具体查看axios文档**)
axios.interceptors.request.use(function (config) {
  if (getToken() !== 'undefined' && getToken() !== '' && getToken() !== undefined && getToken() !== null) {
    config.headers = {
      Authorization: 'Bearer ' + getToken()
    }
  }
  // console.log(config)
  return config
}, function (error) {
  // 请求错误时弹框提示，或做些其他事
  // Message.error(error || '数据获取失败！')
  // return Promise.reject(error)
})

// 添加响应拦截器(**具体查看axios文档**)
axios.interceptors.response.use(function (response) {
  // 如果只需要返回体中数据，则如下，如果需要全部，则 return response 即可
  return response
}, function (error) {
  // 对响应错误做点什么
  // Message.error({ message: error || '数据获取失败！' })
  errorState(error)
  // return Promise.reject(error)
})

// 封装数据返回失败提示函数
function errorState (response) {
  if (response && response.request && response.request.status === 401) {
    Message.error('登录状态无效，请重新登录')
    console.log('登录状态无效，请重新登录')
    removeToken()
    location.href = '/login'
  } else if (response && response.request && response.request.status === 403) {
    Message.error('您的权限不足，请联系管理员！')
  } else {
    console.log(response)
  }
}
// 封装数据返回成功提示函数
function businessInter (businessData, cb, reject) {
  if (typeof businessData !== 'object') {
    cb(businessData)
    return
  }
  // 统一判断业务层接口返回的错误码(错误码与后台协商而定)
  if ('data' in businessData && businessData.data.code === '0') {
    Message.error({ message: businessData.msg })
    reject()
  } else {
    if ('data' in businessData && businessData.data.code) {
      cb(businessData.data.data)
    } else {
      cb(businessData)
    }
  }
}

const getPostData = (params, type, encryptFlag) => {
  if (encryptFlag) {
    return { obj: params === undefined ? '' : SM4Util.encryptData_ECB(JSON.stringify(params)), encryptFlag }
  } else {
    if (type === 'formData') {
      return qs.stringify(params)
    }
    return params
  }
}

const getHeaders = (type) => {
  if (type === 'formData') {
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      'subname': 'xiongchuang',
      'username': 'xiongchuang',
      'password': 'xiongchuang123.',
      'sign': 'a2d4326b8fe3eec54f3224ebcbf513df',
    }
  }else if (type === 'sx_idp') {
    return {
        'Content-Type': 'application/json; charset=utf-8',
        'subname': 'xiongchuang',
        'username': 'xiongchuang',
        'password': 'xiongchuang123.',
        'sign': 'a2d4326b8fe3eec54f3224ebcbf513df',
    }
  }else {
    return {
      'Content-Type': 'application/json; charset=utf-8',
      'subname': 'xiongchuang',
      'username': 'xiongchuang',
      'password': 'xiongchuang123.',
      'sign': 'a2d4326b8fe3eec54f3224ebcbf513df',
    }
  }
}

// 封装axios
function apiAxios (method = 'GET', url, params, type, encryptFlag) {

  const finalUrl = BACKEND_SERVICE_PREFIX + url;
  let httpDefault = {
    method: method,
    baseURL: '/api',
    url: finalUrl,
    params: method === 'GET' ? params : {},
    data: method === 'POST' ? getPostData(params, type, encryptFlag) : {},
    timeout: 500000,
    headers: getHeaders(type),
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  }
  // 处理请求返回体
  return new Promise((resolve, reject) => {
    axios(httpDefault).then((res) => {
      const productData = res.data
      if (productData.decryptFlag) {
        productData.data = JSON.parse(SM4Util.decryptData_ECB(productData.data))
      }

      if (res.data.code === 200 || res.data.status === 200 || res.data.status === 0 || (res.data.status && res.data.code === 8000000)) {
        businessInter(productData, (data) => {
          resolve(data)
        }, reject)
      } else if(res.status == '200'){ //三峡数据
        businessInter(productData, (data) => {
            resolve(data)
          }, reject)
      }
       else if ('status' in res.data && res.data.status === 5004) {
        Message.error(res.data.data)
        reject()
      } else if ('status' in res.data && res.data.status === 1000) {
        Message.error(res.data.data)
        reject()
      } else {
        Message.error(res.data.data)
        reject()
      }
    }).catch((response) => {
      errorState(response)
    })
  })
}
// 用来 获取本地的json数据
function apiAxiosTest (method = 'GET', url, params) {
  return new Promise((resolve, reject) => {
    axios(url).then((res) => {
      resolve(res)
    }).catch((response) => {
      errorState(response)
    })
  })
}
// 增加获取文件流 待补充
export const http = {
  getAxios: function (url, params, type, encryptFlag) {
    return apiAxios('GET', url, params, type, encryptFlag)
  },
  postAxios: function (url, params, type, encryptFlag) {
    return apiAxios('POST', url, params, type, encryptFlag)
  }
}
