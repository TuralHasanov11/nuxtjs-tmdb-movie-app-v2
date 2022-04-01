<template>
  <div id="ratedTvShows" class="ratedTvShows">
      
  </div>
</template>

<script>
export default {
    name: 'ProfileRatedTvShowsPage',
    layout:'default',
    // middleware: 'auth',
    async fetch() {
        await this.$store.dispatch("auth/getRatedTvShows", this.$route.query.page)
    },
    
    watch: {
        '$route.query': '$fetch'
    },

    scrollToTop: true,

    fetchDelay: 1000,

    head:{
        titleTemplate: '%s Rated TV Shows',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: 'Rated TV Shows'
            },
            {
                hid: "keywords",
                name: "keywords",
                content: "profile, rated, TV shows",
            },
        ]
    },

    computed:{
        shows(){
            return $store.getters['auth/ratedTvShows']
        }
    }
}
</script>

<style>

</style>