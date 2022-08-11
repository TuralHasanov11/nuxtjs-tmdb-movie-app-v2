<template>
  <div class="popular">

    <Loading v-if="$fetchState.pending"></Loading>

    <div v-else class="container movies">
    
      <div v-if="moviesPopular.hasOwnProperty('results')" class="my-5 mx-2">
        <h2 class="text-light my-5">Popular Movies Now</h2>
        <Movies :movies="moviesPopular.results"/>
        <Pagination class="my-5" page-name='movies-popular' :page="$route.query.page" :total-pages="moviesPopular.total_pages" />
      </div>

    </div>
  </div>
</template>

<script>

export default {
    name: "MoviesPopularPage",

    scrollToTop: true,

    async fetch() {
        await this.$store.dispatch("movies/getPopular", this.$route.query.page)
    },

    head() {
        return {
            title: "Movie App - Popular Movies Now",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Get all the popular movies now",
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: "movies, popular, popular movies",
                },
            ]
        };
    },
    computed: {
        moviesPopular() {
            return this.$store.getters["movies/popular"];
        },
    },
    
    watch: {
        '$route.query': '$fetch'
    },

    fetchDelay: 1000,
}
</script>
