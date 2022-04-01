export const state = () => ({
    trending:{},
})
  
export const mutations = {
    setTrending(state, data){
        state.trending = data
    },
}

export const actions = {
    async getTrending({commit, rootState }){
        const res = await this.$axios.$get(`trending/all/day?api_key=${rootState.apiKey}`)
        commit('setTrending', res)
    }
}

export const getters = {
    trending: s => s.trending
}