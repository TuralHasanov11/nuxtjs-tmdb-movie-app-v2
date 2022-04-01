<template>
  <div id="watchlistTvShows" class="watchlistTvShows">
      
  </div>
</template>

<script>
export default {
    name: 'ProfileWatchlistTvShowsPage',
    layout:'default',
    // middleware: 'auth',
    async fetch() {
        await this.$store.dispatch("auth/getWatchlistTvShows", this.$route.query.page)
    },
    
    watch: {
        '$route.query': '$fetch'
    },

    scrollToTop: true,

    fetchDelay: 1000,

    head:{
        titleTemplate: '%s Watchlist TV Shows',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: 'Watchlist TV Shows'
            },
            {
                hid: "keywords",
                name: "keywords",
                content: "profile, watchlist, TV shows",
            },
        ]
    },

    computed:{
        shows(){
            return $store.getters['auth/watchlistTvShows']
        }
    }
}
</script>

<style>

</style>