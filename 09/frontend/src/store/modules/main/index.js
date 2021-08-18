import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = () => ({
  test: 'main',
  list: [],
  yesno: {}
})

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
