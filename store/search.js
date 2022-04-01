import axios from 'axios'

export const state = () => ({
   movies:{},
   tvshows:{},
   people:{}
})
  
export const mutations = {
    setMovies(state, data){
        state.movies = data
    },
    setTvshows(state, data){
        state.tvshows = data
    },
    setPeople(state, data){
        state.people = data
    },
}

export const actions = {

    async getSearch({commit, rootState }, search){
        axios.all(
            [
                await this.$axios.$get(`search/movie?api_key=${rootState.apiKey}&language=en-US&page=1&query=${search}&include_adult=false`),
                await this.$axios.$get(`search/tv?api_key=${rootState.apiKey}&language=en-US&page=1&query=${search}&include_adult=false`), 
            ])
            .then(axios.spread((...responses) => {
                const movies = responses[0]
                const tvshows = responses[1]

                commit('setMovies', movies)
                commit('setTvshows', tvshows)
            }))
    },
}

export const getters = {
    movies: s => s.movies,
    tvshows: s => s.tvshows,
    people: s => s.people,
}