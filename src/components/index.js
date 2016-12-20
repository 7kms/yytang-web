import Toast from './toast';
const yview = {
    Toast
};
const install = function (Vue) {
    Object.keys(yview).forEach((key) => {
        Vue.component(key, yview[key]);
    });
    Vue.prototype.$Toast = Toast;
}

module.exports = Object.assign(yview, { install });
