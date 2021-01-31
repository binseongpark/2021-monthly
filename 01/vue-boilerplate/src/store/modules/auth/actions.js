import api from '@/api'
import * as types from './mutation-types'

export default {
  login({ commit }) {
    return api.login()
      .then(data => {
        console.log('@@@@ success')

        // 쿠키방식으로 수정
        commit(types.DEFAULT_ASSIGN, {
          key: 'loggedIn',
          value: true
        })
      })
      .catch(error => { throw error })

  }
}
