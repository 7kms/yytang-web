import * as types from './mutation-types';
import $api from 'api'

const state = {
    userInfo: {},
    userNav: [],
    subscribeInfo: {}
}

const actions = {
    [types.SET_SUBSCRIBE] ({ commit, state, dispatch }, subscribArr) {
        commit(types.SET_SUBSCRIBE, subscribArr);
        commit(types.SET_SELFNAV, subscribArr);
    }
}

const getters = {
    [types.GET_SUBSCRIBE]: (state) => {
        return state
    }
}

const mutations = {
    [types.SET_SUBSCRIBE] (state, subscribArr) {
        state.subscribeInfo = subscribArr;
    },
    [types.SET_SELFNAV] (state, subscribArr) {
        
    }
}

function generateNav (subscribeArr) {
    let navArr = [
        { title: '首页', path: '/timeline' },
        { title: '专栏', path: '/special' },
        { title: '收藏集', path: '/collection' },
        { title: '发现', path: '/discover' }
    ];
    let categoryArr = [
            {
                label:'Android',
                category: 'android'
            },
            {
                label:'前端',
                category: 'frontend'
            },
            {
                label:'IOS',
                category: 'ios'
            },
            {
                label:'后端',
                category: 'backend'
            },
            {
                label:'工具资源',
                category: 'tool'
            },
            {
                label:'阅读',
                category: 'read'
            }
    ];
    let subNavObj = {
        title: '首页',
        active: true,
        list:[]
    };
    navArr.map((nav,index) => {
        var obj = {};
        obj.title = nav.title;
        obj.active = false;
        obj.list = [];
        if(nav.title == '首页'){
            obj.list.push({
                label: '我关注的',
                path: `${nav.path}`
            });
            subscribeArr.map(sub => {
                if(sub.tag.showOnNav){
                    obj.list.push({
                        label: sub.tag.title,
                        category: sub.tag.alias.split(/\s+/)[0],
                        path: `${nav.path}/${sub.tag.alias.split(/\s+/)[0]}`
                    });
                }
            });
        }else if(nav.title == '专栏' || nav.title == '发现'){
            categoryArr.forEach((item,index) => {
                if(index == 0){
                    obj.list.push({
                        label: '全部',
                        path: `${nav.path}`
                    });
                }else{
                    obj.list.push(Object.assign({path:`${nav.path}/${item.category}`},item));
                }
            });
        }else if(nav.title == '收藏集'){
            obj.list.push({
                label: '全部',
                path: `${nav.path}`
            });
            obj.list.push({
                label: '编辑推荐',
                path: `${nav.path}/recommend`
            });
        }
        this.navList.push(obj);
    });
}

export default {
    state,
    getters,
    actions,
    mutations
}