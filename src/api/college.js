import request from '@/utils/request'

export default {

  list() {
    return request({
      url: '/edu/college/list',
      method: 'get'
    })
  }
}
