import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export const rootComputed = {
  console: () => console,
  ...mapGetters('auth', [
    'loggedIn'
  ])
}

export const rootMethods = {}
