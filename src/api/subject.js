import request from '@/utils/request'

export default {
  getNestedTreeList() {
    return request({
      url: '/edu/subject/nested-list',
      method: 'get'
    })
  }
}
