import api from '@/api'

export default {
  //
  getList: ({ commit }, { }) => {
    return api.getList()
      .then(data => {
        console.log('@@@@ success')
        console.log(data)
      })
      .catch(error => { throw error })
  }
}
