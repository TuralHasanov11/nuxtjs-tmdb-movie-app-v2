
export const state = () => ({
    user:'',
    profile:{},
    watchlistMovies:{},
    watchlistTvShows:{},
    ratedMovies:{},
    ratedTvShows:{},
})

export const getters = {
    profile:s=>s.profile,
    watchlistMovies:s=>s.watchlistMovies,
    watchlistTvShows:s=>s.watchlistTvShows,
    ratedMovies:s=>s.ratedMovies,
    ratedTvShows:s=>s.ratedTvShows,
    watchlistMoviesIds: s => s.watchlistMovies.results?s.watchlistMovies.results.map(el => el.id):[],
    watchlistTvShowsIds: s => s.watchlistTvShows.results?s.watchlistTvShows.results.map(el => el.id):[]
}
  
export const mutations = {

    setProfile(state, data){
        state.profile = data
    },

    setWatchlistMovies(state, data){
        console.log(1)
        state.watchlistMovies = data
    },

    setWatchlistTvShows(state, data){
        state.watchlistTvShows = data
    },

    addToWatchlist(state, payload){
        if(payload.type === 'tv'){
            state.watchlistTvShows.results.push(payload.media)
        }else if(payload.type === 'movie'){
            state.watchlistMovies.results.push(payload.media)
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
                "authorization": `Bearer ${rootState.accessToken}`
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
        const res = await this.$axios.$get(`account/${this.$auth.user.id}/watchlist/movies?api_key=${rootState.apiKey}&session_id=${this.$auth.$storage.getLocalStorage('tmdb_session_id')}&language=en-US&sort_by=${sortBy}&page=${page}`)
        commit('setWatchlistMovies', res)
    },

    async getWatchlistTvShows({state, commit, rootState }, page=1, sortBy='created_at.desc'){
        const res = await this.$axios.$get(`account/${this.$auth.user.id}/watchlist/tv?api_key=${rootState.apiKey}&session_id=${this.$auth.$storage.getLocalStorage('tmdb_session_id')}&language=en-US&sort_by=${sortBy}&page=${page}`)
        commit('setWatchlistTvShows', res)
    },

    async addToWatchlist({state, commit, rootState }, media, watchlist=true, type='movie'){ // type = movie, tv
        try {
            const res = await this.$axios.$post(`account/${this.$auth.user.id}/watchlist?api_key=${rootState.apiKey}&session_id=${this.$auth.$storage.getLocalStorage('tmdb_session_id')}`,{
                media_type: type,
                media_id: media.id,
                watchlist
            })

            if(res.status_code === 1 && res.success === true){
                commit('addToWatchlist', {media, type})
            }

        } catch (error) {
            throw new Error('Failed!')
        }
        
    },

    async getRatedMovies({commit, rootState }, page=1, sortBy='created_at.desc'){
        const res = await this.$axios.$get(`account/${this.$auth.user.id}/rated/movies?api_key=${rootState.apiKey}&session_id=${this.$auth.$storage.getLocalStorage('tmdb_session_id')}&language=en-US&sort_by=${sortBy}&page=${page}`)
        commit('setRatedMovies', res)
    },

    async getRatedTvShows({commit, rootState }, page=1, sortBy='created_at.desc'){
        const res = await this.$axios.$get(`account/${this.$auth.user.id}/rated/tv?api_key=${rootState.apiKey}&session_id=${this.$auth.$storage.getLocalStorage('tmdb_session_id')}&language=en-US&sort_by=${sortBy}&page=${page}`)
        commit('setRatedTvShows', res)
    },
}
