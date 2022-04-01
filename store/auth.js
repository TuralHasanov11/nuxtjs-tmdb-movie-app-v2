import axios from 'axios'

export const state = () => ({
    user:'',
    // isAuthenticated:this.$auth.is,
    sessionId:null,
    profile:{},
    watchlistMovies:{},
    watchlistTvShows:{},
    ratedMovies:{},
    ratedTvShows:{},
})
  
export const mutations = {
    setSessionId(state, data){
        state.sessionId = data
    },

    setProfile(state, data){
        state.profile = data
    },

    setWatchlistMovies(state, data){
        state.watchlistMovies = data
    },

    setWatchlistTvShows(state, data){
        state.watchlistTvShows = data
    },

    addToWatchlist(state, payload){
        if(payload.type === 'tv'){
            state.watchlistTvShows.results.push(payload.media)
            state.watchlistTvShows.results.pop()
        }else if(payload.type === 'movie'){
            state.watchlistMovies.results.push(payload.media)
            state.watchlistMovies.results.pop()
        }
    },

    setRatedMovies(state, data){
        state.ratedMovies = data
    },

    setRatedTvShows(state, data){
        state.ratedTvShows = data
    },
}

export const actions = {

    // async createRequestTokenAndSession({commit, rootState }){
    //     const requestToken = await this.$axios.$get(`authentication/token/new?api_key=${rootState.apiKey}`)
    //     window.open(`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://www.yourapp.com/approved`, '_blank').focus();

    //     try {
    //         const sessionData = await this.$axios.$post(`authentication/session/new?api_key=${rootState.apiKey}`,{
    //             request_token: requestToken
    //         })
            
    //         const res = await this.$axios.$post(`app/api/account/tmdb-session`,{
    //             sessionId:sessionData.session_id
    //         })

    //         commit('setSessionId', sessionData.session_id)
    //     } catch (error) {
    //         return new Error('Session ID Failed!')
    //     }
    // },

    async getProfile({commit, rootState }){
        const res = await this.$axios.$get(`account?api_key=${rootState.apiKey}`)
        commit('setProfile', res)
    },

    async getWatchlistMovies({state, commit, rootState }, page=1, sortBy='created_at.desc'){
        const res = await this.$axios.$get(`account/${state.user.tmdb_id}/watchlist/movies?api_key=${rootState.apiKey}&session_id=${state.sessionId}&language=en-US&sort_by=${sortBy}&page=${page}`)
        commit('setWatchlistMovies', res)
    },

    async getWatchlistTvShows({state, commit, rootState }, page=1, sortBy='created_at.desc'){
        const res = await this.$axios.$get(`account/${state.user.tmdb_id}/watchlist/tv?api_key=${rootState.apiKey}&session_id=${state.sessionId}&language=en-US&sort_by=${sortBy}&page=${page}`)
        commit('setWatchlistTvShows', res)
    },

    async addToWatchlist({state, commit, rootState }, media, type='movie'){ // type = movie, tv
        try {
            const res = await this.$axios.$post(`account/${state.user.tmdb_id}/watchlist?api_key=${rootState.apiKey}`,{
                media_type: type,
                media_id: media.id,
                watchlist: true
            })

            console.log(res)
            commit('addToWatchlist', {media, type})

        } catch (error) {
            throw new Error('Failed!')
        }
        
    },

    async getRatedMovies({state, commit, rootState }, page=1, sortBy='created_at.desc'){
        const res = await this.$axios.$get(`account/${state.user.tmdb_id}/rated/movies?api_key=${rootState.apiKey}&session_id=${state.sessionId}&language=en-US&sort_by=${sortBy}&page=${page}`)
        commit('setRatedMovies', res)
    },

    async getRatedTvShows({state, commit, rootState }, page=1, sortBy='created_at.desc'){
        const res = await this.$axios.$get(`account/${state.user.tmdb_id}/rated/tv?api_key=${rootState.apiKey}&session_id=${state.sessionId}&language=en-US&sort_by=${sortBy}&page=${page}`)
        commit('setRatedTvShows', res)
    },
}

export const getters = {
    profile:s=>s.profile,
    watchlistMovies:s=>s.watchlistMovies,
    watchlistTvShows:s=>s.watchlistTvShows,
    ratedMovies:s=>s.ratedMovies,
    ratedTvShows:s=>s.ratedTvShows
}