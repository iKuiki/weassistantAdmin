import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    params: data
  })
}

export function getInfo() {
  return request({
    url: '/my',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/my',
    method: 'delete'
  })
}

export function updateInfo(data) {
  return request({
    url: '/my',
    method: 'patch',
    data: qs.stringify(data)
  })
}
