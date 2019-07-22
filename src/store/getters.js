const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.auth.token,
  uid: state => state.auth.uid,
  account: state => state.auth.account,
  name: state => state.auth.name,
  lastLoginAt: state => state.auth.lastLoginAt,
  lastLoginIP: state => state.auth.lastLoginIP
}
export default getters
