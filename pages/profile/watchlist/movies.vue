<template>
  <div id="watchlistMovies" class="watchlistMovies">
      
  </div>
</template>

<script>
export default {
    name: 'ProfileWatchlistMoviesPage',
    layout:'default',
    // middleware: 'auth',
    async fetch() {
        await this.$store.dispatch("auth/getWatchlistMovies", this.$route.query.page)
    },
    
    watch: {
        '$route.query': '$fetch'
    },

    scrollToTop: true,

    fetchDelay: 1000,

    head:{
        titleTemplate: '%s Watchlist Movies',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: 'Watchlist Movies'
            },
            {
                hid: "keywords",
                name: "keywords",
                content: "profile, watchlist, movies",
            },
        ]
    },

    computed:{
        movies(){
            return $store.getters['auth/watchlistMovies']
        }
    }
}
</script>

<style>

</style>