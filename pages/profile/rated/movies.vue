<template>
  <div id="ratedMovies" class="ratedMovies">
       <Loading v-if="$fetchState.pending"></Loading>

        <div v-else class="container movies">
            <div v-if="moviesUpComing.hasOwnProperty('results')" class="my-5 mx-2">
                <h2 class="text-light my-5">Your Ratings</h2>
                
                <Movies :movies="moviesUpComing.results"/>
                <Pagination class="my-5" pageName='movies-up-coming' :page="$route.query.page" :totalPages="moviesUpComing.total_pages" />
            </div>

        </div>
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