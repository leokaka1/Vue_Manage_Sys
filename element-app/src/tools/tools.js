import Vue from 'vue'
import jwt_decode from 'jwt-decode'

// 解析token
function getToken(){
    const token = localStorage.getItem('token')
    const tokenJwt = jwt_decode(token)
    const isEmpty = !this.$isEmpty(tokenJwt)
    return {isEmpty,tokenJwt}
}


// 判断是否为空
function isEmpty(value){
    return(
        value === undefined || 
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    )
}

Vue.prototype.$isEmpty = isEmpty
Vue.prototype.$getToken = getToken