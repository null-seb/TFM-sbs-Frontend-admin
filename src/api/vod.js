import request from '@/utils/request'

export default {

  removeByVodId(id) {
    return request({
      url: `/vod/media/remove/${id}`,
      method: 'delete'
    })
  }
}
