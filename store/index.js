export const state = () => ({
  user: '',
})

export const mutations = {
  login(state, user) {
    state.user = user
  },
  logout(state) {
    state.user = null
  }
}
export const actions = {
  loginAction({ commit }, user) {
    commit('login', user);
  }
}
// export default ({ store }) => {
//   createPersistedState(
//     {
//       key: 'share_app',
//       storage: window.sessionStorage
//     })
//   state: () => 
//     {
//       user:''
//     }
// }
