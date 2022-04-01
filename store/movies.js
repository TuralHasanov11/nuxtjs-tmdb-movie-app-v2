import axios from 'axios'

export const state = () => ({
    upComing:{},
    nowPlaying: {},
    popular:{},
    topRated:{},
    movie:{},
})
  
export const mutations = {
    setUpComing(state, data){
        state.upComing = data
    },
    setNowPlaying(state, data){
        state.nowPlaying = data
    },
    setPopular(state, data){
        state.popular = data
    },
    setTopRated(state, data){
        state.topRated = data
    },
    setMovie(state,data){
        state.movie = data
    }
}

export const actions = {
    async getNowPlaying({commit, rootState }, page=1){
        const res = await this.$axios.$get(`movie/now_playing?api_key=${rootState.apiKey}&language=en-US&page=${page}`)
        commit('setNowPlaying', res)
    },

    async getPopular({commit, rootState }, page=1){
        const res = await this.$axios.$get(`movie/popular?api_key=${rootState.apiKey}&language=en-US&page=${page}`)
        commit('setPopular', res)
    },

    async getTopRated({commit, rootState }, page=1){
        const res = await this.$axios.$get(`movie/top_rated?api_key=${rootState.apiKey}&language=en-US&page=${page}`)
        commit('setTopRated', res)
    },

    async getUpComing({commit, rootState }, page=1){
        const res = await this.$axios.$get(`movie/upcoming?api_key=${rootState.apiKey}&language=en-US&page=${page}`)
        commit('setUpComing', res)
    },

    async getMovie({commit, rootState }, movie){
        axios.all(
            [
                await this.$axios.$get(`movie/${movie}?api_key=${rootState.apiKey}&language=en-US`),
                await this.$axios.$get(`movie/${movie}/images?api_key=${rootState.apiKey}&language=en-US`), 
    
            ]).then(axios.spread((...responses) => {
            const movie = responses[0]
            const images = responses[1]
            movie.images = images

            commit('setMovie', movie)
        }))

    },
}

export const getters = {
    nowPlaying: s => s.nowPlaying,
    popular: s => s.popular,
    topRated: s => s.topRated,
    upComing: s => s.upComing,
    movie: s => s.movie,
}