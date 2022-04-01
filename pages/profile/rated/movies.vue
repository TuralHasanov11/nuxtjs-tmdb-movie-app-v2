<template>
  <div id="ratedMovies" class="ratedMovies">
      
  </div>
</template>

<script>
export default {
    name: 'ProfileRatedMoviesPage',
    layout:'default',
    // middleware: 'auth',
    async fetch() {
        await this.$store.dispatch("auth/getRatedMovies", this.$route.query.page)
    },
    
    watch: {
        '$route.query': '$fetch'
    },

    scrollToTop: true,

    fetchDelay: 1000,

    head:{
        titleTemplate: '%s Rated Movies',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: 'Rated Movies'
            },
            {
                hid: "keywords",
                name: "keywords",
                content: "profile, rated, movies",
            },
        ]
    },

    computed:{
        movies(){
            return $store.getters['auth/ratedMovies']
        }
    }
}
</script>

<style>

</style>