export const state = () => ({
    apiKey: process.env.TMDB_API_KEY,
    langs: { "en": "en-US", "az": "en", "ru": "ru" },
    lang: "en-US",
})

export const mutations = {

}

export const actions = {
   
}

export const getters = {
    apiKey: s => s.APIKey,
}