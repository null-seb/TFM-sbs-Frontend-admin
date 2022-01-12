import request from '@/utils/request'

export default {

  removeByVodId(id) {
    return request({
      baseURL: 'http://127.0.0.1:8130',
      url: `/vod/media/remove/${id}`,
      method: 'delete'
    })
  }
}
