import * as types from './mutation-types'
import $api from 'api'
const state = {
    loginInfo: {
        loading: false
    },
    regInfo: {
        loading: false
    },
    accountInfo: {
        
    }
}
const getters = {
    loginLoading: state => state.loginInfo.loading,
    regLoading: state => state.regInfo.loading,
    accountInfo: state => state.accountInfo
}
const actions = {
    [types.LOGIN_SUCCESS] ({ commit, state, dispatch }, data) {
        commit(types.LOGIN_SUCCESS, data);
    },
    [types.LOGIN_FAILE] ({ commit, state, dispatch }, data) {
        commit(types.LOGIN_FAILE, data);
    },
    loginout ({ commit, state, dispatch, rootState }) {
        return new Promise((resolve, reject) => {
             $api.post('/user/loginout')
            .then(data => {
                commit(types.LOGIN_OUT);
                rootState.store.user.commit('user/SET_USERINFO', data);
                resolve(data);
            }, data => {
                reject(data);
            })
        })
    },
    registure ({ commit, state, dispatch }, accountInfo) {
        commit(types.LOGIN, { isLoading: true });
        return new Promise((resolve, reject) => {
             $api.post('/registure', accountInfo)
            .then(data => {
                commit(types.REGISTURE_SUCCESS, data)
                resolve(data);
            }, data => {
                commit(types.REGISTURE_FAILE, data);
                reject(data);
            })
        })
    }
}
const mutations = {
    [types.LOGIN] (state, { isLoading }) {
        state.loginInfo.loading = isLoading
    },
    [types.LOGIN_SUCCESS] (state, userData) {
        state.accountInfo = userData;
        state.loginInfo.loading = false;
    },
    [types.LOGIN_FAILE] (state, accountInfo) {
        state.accountInfo = '';
        state.loginInfo.loading = false;
    },
    [types.REGISTURE] (state, { isLoading }) {
        state.regInfo.loading = isLoading
    },
    [types.REGISTURE_SUCCESS] (state, { user }) {   
        state.accountInfo = user;
        state.regInfo.loading = false;
    },
    [types.REGISTURE_FAILE] (state, accountInfo) {
        state.accountInfo = '';
        state.regInfo.loading = false;
    },
    [types.LOGIN_OUT] (state, accountInfo) {
        state.accountInfo = {};
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
