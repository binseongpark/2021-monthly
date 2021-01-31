import * as types from './mutation-types'

export default {
  [types.DEFAULT_ASSIGN]: (state, payload) => {
    state[payload.key] = payload.value
  }
}
