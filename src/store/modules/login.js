import * as types from '../mutation-types'
import api from '../../api'
const state = {
    account: ''
}
const getters = {

}
const actions = {
    login ({ commit, state }, accountInfo) {
        api.post()
        .then(() => {
            commit.dispatch(types.LOGIN_SUCCESS)
        })
    }
}
