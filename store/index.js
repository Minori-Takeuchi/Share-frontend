export const state = () => ({
  user: 'hZYDcL7vCrTALfduSVjWqH6wCqx2',
})

export const mutations = {
  // ログインユーザー管理用
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