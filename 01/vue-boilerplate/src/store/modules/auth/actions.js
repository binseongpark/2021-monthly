import api from '@/api'
import * as types from './mutation-types'

export default {
  login({ commit }) {
    commit(types.DEFAULT_ASSIGN, {
      key: '',
      value: ''
    })
  }
}
