<template>
  <div id="watchlistMovies" class="watchlistMovies">
      <Loading v-if="$fetchState.pending"></Loading>

        <div v-else class="container movies">
            <div v-if="movies.hasOwnProperty('results')" class="my-5 mx-2">
                <h2 class="text-light my-5">Your Watchlist - Movies</h2>
                
                <Movies :movies="movies.results"/>
                <Pagination class="my-5" pageName='profile-watchlist-movies' :page="$route.query.page" :totalPages="movies.total_pages" />
            </div>

        </div>
  </div>
</template>

<script>
export default {
    name: 'ProfileWatchlistMoviesPage',
    layout:'default',
    // middleware: 'auth',
    async fetch() {
        await this.$store.dispatch("user/getWatchlistMovies", this.$route.query.page)
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
            return this.$store.getters['user/watchlistMovies']
        }
    }
}
</script>

<style>

</style>