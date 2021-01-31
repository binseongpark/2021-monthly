import client from './client'
import mockData from './mock-data'

const LATENCY = 1000


export default {
  login: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, LATENCY)
    })
  },
  yesno: () => {
    // https://yesno.wtf/api
    return new Promise((resolve, reject) => {
      client.get(`https://yesno.wtf/api`)
        .then((response) => resolve(response.data))
        .catch((error) => { reject(new Error(error.response.data.message || error.message)) })
    })
  },
  // user list
  getList: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockData.USER_LIST)
      }, LATENCY)
    })
  }
  // youtube list
}
