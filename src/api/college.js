import request from '@/utils/request'

export default {

  list() {
    return request({
      url: '/edu/college/list',
      method: 'get'
    })
  },
  pageList(page, limit, searchObj) {
    return request({
      url: `/edu/college/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  removeById(id) {
    return request({
      url: `/edu/college/remove/${id}`,
      method: 'delete'
    })
  }
}
