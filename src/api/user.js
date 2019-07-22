import request from '@/utils/request'
import qs from 'qs'

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
    data: qs.stringify(data)
  })
}
