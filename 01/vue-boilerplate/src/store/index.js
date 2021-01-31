import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import main from './modules/main'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    main
  },
  strict: process.env.NODE_ENV === 'development'
})

if (module.hot) {
  module.hot.accept(['./modules/auth', './modules/main'], () => {
    const newModuleAuth = require('./modules/auth').default
    const newModuleMain = require('./modules/main').default

    store.hotUpdate({
      module: {
        auth: newModuleAuth,
        main: newModuleMain
      }
    })
  })
}

export default store
