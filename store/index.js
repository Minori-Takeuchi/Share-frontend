import createPersistedState from 'vuex-persistedstate'

export const state = () => ({
  user: '4E3TL1H8rpajw9759NHIdfJzJt33',
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

plugins: [createPersistedState(
    { // ストレージのキーを指定
      key: 'share_app',
      // ストレージの種類を指定
      storage: window.sessionStorage
    }
)]