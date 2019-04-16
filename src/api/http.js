/**
 * json格式
 * {
  "code":0,
  "msg":"成功",
  "data":{
  "user":{
    "nick-name":"土小贵",
      "username":"1012610779",
      "password":"123456"
  }
}
}
 */

/**
 * 封装get、post方法
 */

import axios from 'axios'
import qs from 'qs'
import * as Constant from './constant.js'
import {log} from "@/utils/log-util";
import user from "../vuex/model/user";
import {getToken} from "../utils/func";

const instance = axios.create({
  baseURL: Constant.BASE_URL,
  timeout: Constant.TIME_OUT,
  headers: {'x-requested-with': 'XMLHttpRequest'}
})

// 请求拦截器
instance.interceptors.request.use(config => {
  const token = user.state.user.token
  if (token) {
    config.headers['X-Token'] = getToken()
  }
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
});


// 响应拦截器
instance.interceptors.response.use(res => {
  if (res.data.code == Constant.SUCCESS) { // 请求成功且是期望的结果
    log('请求成功: ' + JSON.stringify(res.data))
    // 返回响应体
    return res.data
  } else {
    log('请求成功，但不是所期望的结果' + JSON.stringify(res.data))
    return Promise.reject(res.data.msg)
  }

}, error => {
  log('请求失败' + error.toString())
  return Promise.reject("网络请求失败")
})

/**
 * 集中处理响应体
 * @param isPost
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
function handleResponse(isPost, url, params, config) {
  return new Promise((resolve, reject) => {
    if (!isPost && !isEmpty(params)) {
      if (isEmpty(config)) {
        config = {}
      }
      config.params = params
      log('构造的config为：' + config)
    }
    let promise = isPost ? instance.post(url, params, config) : instance.get(url, config);
    promise.then(response => {
      log('直接返回想要的数据' + JSON.stringify(response.data))
      resolve(response.data);
    }, err => {
      reject(err);
    })
      .catch((error) => {
        reject(error)
      })
  })
}

function isEmpty(val) {
  if (val != null && val != undefined && val != '') {
    return false;
  } else {
    return true
  }
}

/**
 * 请求体采用json格式
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
export function get(url, params) {
  return handleResponse(false, url, params, null)
}

/**
 * 请求体采用json格式
 * @param url
 * @param params
 */
export function post(url, params) {
  return handleResponse(true, url, params, null)
}


export function getBySerialize(url, params) {
  return handleResponse(false, url, qs.stringify(params), {
    headers: {'x-requested-with': 'XMLHttpRequest', 'content-type': 'application/x-www-form-urlencoded'}
  })
}

export function postBySerialize(url, params, onSuccess, onFail) {
  return handleResponse(true, url, qs.stringify(params), {
    headers: {'x-requested-with': 'XMLHttpRequest', 'content-type': 'application/x-www-form-urlencoded'}
  })
}

