import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/user',
    method: 'get',
    params: data
  })
}

export function create(data) {
  return request({
    url: '/user',
    method: 'post',
    params: data
  })
}
