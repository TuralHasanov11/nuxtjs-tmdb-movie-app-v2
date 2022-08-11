<template>
  <div class="top-rated">

    <Loading v-if="$fetchState.pending"></Loading>

    <div v-else class="container movies">
    
      <div v-if="moviesTopRated.hasOwnProperty('results')" class="my-5 mx-2">
        <h2 class="text-light my-5">Top Rated Movies</h2>
        <Movies :movies="moviesTopRated.results"/>
        <Pagination class="my-5" page-name='movies-top-rated' :page="$route.query.page" :total-pages="moviesTopRated.total_pages" />
      </div>

    </div>
  </div>
</template>

<script>

export default {
    name: "MoviesTopRatedPage",

    scrollToTop: true,
    async fetch() {
        await this.$store.dispatch("movies/getTopRated", this.$route.query.page)
    },
    head() {
        return {
            title: "Movie App - Top Rated Movies",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Get all the top rated movies",
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: "movies, top rated, top",
                },
            ]
        };
    },
    computed: {
        moviesTopRated() {
            return this.$store.getters["movies/topRated"];
        },
    },

    watch: {
        '$route.query': '$fetch'
    },

    fetchDelay: 1000,
}
</script>

<style scoped>


</style>