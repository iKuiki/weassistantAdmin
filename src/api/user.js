import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/user',
    method: 'get',
    params: data
  })
}
