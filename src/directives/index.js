import toolTip from './tooltip';
const yDirectives = {
    toolTip
}
const install = function (Vue) {
     Object.keys(yDirectives).forEach((key) => {
        Vue.directive(key, yDirectives[key]);
    });
}
module.exports = Object.assign(yDirectives, { install });
