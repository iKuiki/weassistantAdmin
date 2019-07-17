const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  uid: state => state.user.uid,
  account: state => state.user.account,
  name: state => state.user.name
}
export default getters
