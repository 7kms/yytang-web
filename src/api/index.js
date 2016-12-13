import Vue from 'vue'
import VueResource from 'vue-resource'
import * as config from '../config'
Vue.use(VueResource)
var generateOption = (type, dataObj) => {
    var obj = {
        credientials: true,
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 15000
    }
    if (type == 'get') {
        obj.params = dataObj
    } else {
        obj.body = dataObj
    }
    return obj
}
export default {
    get: (url, dataObj) => {
        return new Promise((resolve, reject) => {
            var absoulteUrl = config.serverUrl + url;
            Vue.http.get(absoulteUrl, generateOption('get', dataObj)).then(res => {
                console.log(res)
                resolve(res)
            }, res => {
                reject(res)
            })
        })
    },
    post: (url, dataObj) => {
        return new Promise((resolve, reject) => {
            var absoulteUrl = config.serverUrl + url;
            Vue.http.get(absoulteUrl, generateOption('get', dataObj)).then(res => {
                console.log(res)
                resolve(res)
            }, res => {
                reject(res)
            })
        })
    }
}
