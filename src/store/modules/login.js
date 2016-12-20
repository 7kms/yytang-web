import * as types from '../mutation-types'
import $api from '../../api'
const state = {
    accountInfo: {},
    loading: false
}
const getters = {
    isLoading: state => state.loading,
    accountInfo: state => state.accountInfo
}
const actions = {
    login ({ commit, state, dispatch }, accountInfo) {
        commit(types.LOGIN, { isLoading: true });
        return new Promise((resolve, reject) => {
             $api.post('/login', accountInfo)
            .then(data => {
                commit(types.LOGIN_SUCCESS, data)
                // dispatch('toast', { data: res.body.user.name })
                resolve(data);
            }, data => {
                commit(types.LOGIN_FAILE, data);
                reject(data);
            })
        })
    }
}
const mutations = {
    [types.LOGIN] (state, { isLoading }) {
        state.loading = isLoading
    },
    [types.LOGIN_SUCCESS] (state, { user }) {
        state.accountInfo = user;
        state.loading = false;
    },
    [types.LOGIN_FAILE] (state, accountInfo) {
        state.accountInfo = '';
        state.loading = false;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
