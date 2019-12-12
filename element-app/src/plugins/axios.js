"use strict";

import Vue from 'vue';
import axios from "axios";
import {Message, Loading} from 'element-ui'

let loading
// 开始加载动画
function startLoading(){
  loading = Loading.service({
    lock:true,
    text:"拼命加载中...",
    background:"rgba(0,0,0,0.7)"
  })
}

// 结束加载动画
function endLoading(){
  loading.close()
}

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // 开始动画
    startLoading()
    return config;
  },
  function(error) {
    // Do something with request error
    endLoading()
    Message.error(error.response.data)
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // 结束动画 
    endLoading()
    return response;
  },
  function(error) {
    // Do something with response error
    endLoading()
    Message.error(error.response.data)
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.prototype.$axios = axios
Vue.use(Plugin)
// 挂载到Vue实例上

export default Plugin;
