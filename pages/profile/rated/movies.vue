<template>
  <div id="ratedMovies" class="ratedMovies">
       <Loading v-if="$fetchState.pending"></Loading>

        <div v-else class="container movies">
            <div v-if="movies.hasOwnProperty('results')" class="my-5 mx-2">
                <h2 class="text-light my-5">Your Ratings - Movies</h2>
                
                <Movies :movies="movies.results"/>
                <Pagination class="my-5" page-name='profile-rated-movies' :page="$route.query.page" :total-pages="movies.total_pages" />
            </div>

        </div>
  </div>
</template>

<script>
export default {
    name: 'ProfileRatedMoviesPage',
    layout:'default',

    scrollToTop: true,
    // middleware: 'auth',
    async fetch() {
        await this.$store.dispatch("user/getRatedMovies", this.$route.query.page)
    },

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
            return this.$store.getters['user/ratedMovies']
        }
    },
    
    watch: {
        '$route.query': '$fetch'
    },

    fetchDelay: 1000
}
</script>

<style>

</style>