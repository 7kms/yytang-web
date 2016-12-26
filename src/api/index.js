import Vue from 'vue'
import VueResource from 'vue-resource'
import * as config from '../config'
Vue.use(VueResource)
var configHttpOptions = () => {
    Vue.http.options.credentials = true;
    // Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
    Vue.http.options.timeout = 15000;
    Vue.http.options.emulateJSON = true;
}
var baseConfig = {
    credentials: true,
    timeout: 15000
    // headers: {
    //     'Content-Type': 'application/json'
    // }
}
configHttpOptions();
export default {
    get: (url, dataObj) => {
        return new Promise((resolve, reject) => {
            var absoluteUrl = config.serverUrl + url;
            var options = Object.assign({}, baseConfig)
            options.params = dataObj;
            Vue.http.get(absoluteUrl, options).then(res => {
                resolve(res)
            }, res => {
                reject(res)
            })
        })
    },
    post: (url, dataObj) => {
        return new Promise((resolve, reject) => {
            var absoluteUrl = config.serverUrl + url;
            var options = Object.assign({}, baseConfig)
            Vue.http.post(absoluteUrl, dataObj, options).then(res => {
                resolve(res.body)
            }, res => {
                reject(res.body)
            })
        })
    }
}
