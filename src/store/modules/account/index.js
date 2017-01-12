import * as types from './mutation-types'
import $api from 'api'
const state = {
    loginInfo: {
        loading: false
    },
    regInfo: {
        loading: false
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
    [types.LOGIN_OUT] ({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
             $api.post('/user/loginout')
            .then(data => {
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
        state.loginInfo.loading = false;
    },
    [types.LOGIN_FAILE] (state, accountInfo) {
        state.loginInfo.loading = false;
    },
    [types.REGISTURE] (state, { isLoading }) {
        state.regInfo.loading = isLoading
    },
    [types.REGISTURE_SUCCESS] (state, { user }) {   
        state.regInfo.loading = false;
    },
    [types.REGISTURE_FAILE] (state, accountInfo) {
        state.regInfo.loading = false;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
