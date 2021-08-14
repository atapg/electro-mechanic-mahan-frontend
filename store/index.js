export const state = () => ({
  user: null,
  siteInfo: {},
})

export const mutations = {
  addUser(state, user) {
    state.user = user
  },
  addSiteInfo(state, siteinfo) {
    state.siteInfo = siteinfo
  },
}

export const getters = {
  getTypings: (state) => state.siteInfo.typings,
}
