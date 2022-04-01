export const state = () => ({
    airingToday:{},
    onTheAir: {},
    popular:{},
    topRated:{},
    show:{},
})
  
export const mutations = {
    setAiringToday(state, data){
        state.airingToday = data
    },
    setOnTheAir(state, data){
        state.onTheAir = data
    },
    setPopular(state, data){
        state.popular = data
    },
    setTopRated(state, data){
        state.topRated = data
    },

    setShow(state, data){
        state.show = data
    },
}

export const actions = {
    async getAiringToday({commit, rootState }, page=1){
        const res = await this.$axios.$get(`tv/airing_today?api_key=${rootState.apiKey}&language=en-US&page=${page}`)
        commit('setAiringToday', res)
    },

    async getPopular({commit, rootState }, page=1){
        const res = await this.$axios.$get(`tv/popular?api_key=${rootState.apiKey}&language=en-US&page=${page}`)
        commit('setPopular', res)
    },

    async getTopRated({commit, rootState }, page=1){
        const res = await this.$axios.$get(`tv/top_rated?api_key=${rootState.apiKey}&language=en-US&page=${page}`)
        commit('setTopRated', res)
    },

    async getOnTheAir({commit, rootState }, page=1){
        const res = await this.$axios.$get(`tv/on_the_air?api_key=${rootState.apiKey}&language=en-US&page=${page}`)
        commit('setOnTheAir', res)
    },

    async getShow({commit, rootState }, show){
        const res = await this.$axios.$get(`tv/${show}?api_key=${rootState.apiKey}&language=en-US`)
        commit('setShow', res)
    },
}

export const getters = {
    airingToday: s => s.airingToday,
    popular: s => s.popular,
    topRated: s => s.topRated,
    onTheAir: s => s.onTheAir,
    show: s => s.show
}