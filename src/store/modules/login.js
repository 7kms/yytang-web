import * as types from '../mutation-types'
import $api from '../../api'
const state = {
    accountInfo: '',
    loading: false
}
const getters = {
    isLoading: state => state.loading
}
const actions = {
    login ({ commit, state }, accountInfo) {
        commit(types.LOGIN, { isLoading: true });
        $api.post('/login', accountInfo)
        .then(res => {
            console.log(res)
            commit(types.LOGIN_SUCCESS, res.data)
        }, res => {
            console.log(res)
            commit(types.LOGIN_FAILE, res.data)
        })
    }
}
const mutations = {
    [types.LOGIN] (state, { isLoading }) {
        state.loading = isLoading
    },
    [types.LOGIN_SUCCESS] (state, accountInfo) {
        state.accountInfo = accountInfo;
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
