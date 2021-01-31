import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export const rootComputed = {
  console: () => console,
  ...mapGetters('auth', [
    'loggedIn'
  ]),
  ...mapState('main', [
    'list',
    'yesno'
  ])
}

export const rootMethods = {
  ...mapActions('auth', [
    'login'
  ]),
  ...mapActions('main', [
    'getList',
    'getYesNo'
  ])
}
