const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    id: 1,
    account: 'admin',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    id: 2,
    account: 'editor',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/auth/login',
    type: 'post',
    response: config => {
      const { account } = config.query
      const token = tokens[account]

      // mock error
      if (!token) {
        return {
          code: 102,
          msg: 'Incorrect username or password',
          data: null
        }
      }

      return {
        code: 0,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/my',
    type: 'get',
    response: config => {
      const token = tokens['admin'].token
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 2,
          msg: 'need login'
        }
      }
      return {
        code: 0,
        msg: '',
        data: info
      }
    }
  },

  // user logout
  {
    url: '/my',
    type: 'delete',
    response: _ => {
      return {
        code: 0,
        msg: 'logout success'
      }
    }
  }
]
