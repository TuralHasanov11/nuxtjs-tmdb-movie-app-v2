
export const state = () => ({
    user:'',
    profile:{},
    watchlistMovies:{},
    watchlistTvShows:{},
    ratedMovies:{},
    ratedTvShows:{},
    // {"avatar":{"gravatar":{"hash":"8f9e6d35026566e5e87646f5e6b5120d"},"tmdb":{"avatar_path":null}},"id":11815292,"iso_639_1":"en","iso_3166_1":"AZ","name":"","include_adult":false,"username":"turalhasanov"}
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

    async createRequestTokenAndSession({commit, rootState }){

        const requestToken = await this.$axios.$post(`https://api.themoviedb.org/4/auth/request_token`,{
            redirect_to:"http://localhost:3000/approved"
        },{
            "headers": {
                "content-type": "application/json;charset=utf-8",
                "authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Yjc5NTgzNWUxNzNmOTNiMDE5ODdiMjc1Nzk4MGRhNSIsInN1YiI6IjYxZWU5OTFkOWU0NTg2MDEwNzMwN2FhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OGiw669SoQAu6kK8N43Vp3H0Zzo_rFpax83gX9KZPlQ`
            },
        })
        localStorage.setItem('tmdb_request_token', requestToken.request_token)
        window.location.replace(`https://www.themoviedb.org/auth/access?request_token=${requestToken.request_token}&redirect_to=http://localhost:3000/approved`)
    },


    async logout({commit, rootState }){
        try {
            const res = await this.$axios.$delete(`authentication/session?api_key=${rootState.apiKey}`,{
                session_id:  this.$auth.$storage.getState('tmdb_session_id')
            })

            if(res.success){
                localStorage.removeItem('tmdb_session_id')
                this.$auth.$storage.removeLocalStorage('tmdb_session_id')
                commit('setSessionId', '')
                // window.location.replace('/')
            }
            
        } catch (error) {
            throw new Error('Session ID delete Failed!')
        }
    },

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