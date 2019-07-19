import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    params: data
  })
}

export function getInfo(token) {
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
