import api from '@/api'
import * as types from './mutation-types'

export default {
  getList({ commit }) {
    return api.getList()
      .then(data => {
        console.log('@@@@ success')
        console.log(data)

        commit(types.DEFAULT_ASSIGN, {
          key: 'list',
          value: data
        })
      })
      .catch(error => { throw error })
  }
}
