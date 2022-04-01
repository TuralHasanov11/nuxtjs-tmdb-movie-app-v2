import axios from 'axios'

export const state = () => ({
   popular:{},
   person:{},
})
  
export const mutations = {
    setPopular(state, data){
        state.popular = data
    },

    setPerson(state, data){
        state.person = data
    },
}

export const actions = {

    async getPopular({commit, rootState }, page=1){
        const res = await this.$axios.$get(`person/popular?api_key=${rootState.apiKey}&language=en-US&page=${page}`)
        commit('setPopular', res)
    },

    async getPerson({commit, rootState }, person){

        axios.all(
            [
                await this.$axios.$get(`person/${person}?api_key=${rootState.apiKey}&language=en-US`),
                await this.$axios.$get(`person/${person}/combined_credits?api_key=${rootState.apiKey}&language=en-US`), 
            ]).then(axios.spread((...responses) => {
            const person = responses[0]
            const credits = responses[1]
            person.credits = credits.cast

            commit('setPerson', person)
        }))

    },
}

export const getters = {
    popular: s => s.popular,
    person: s => s.person,
}