<template>
  <div class="top-rated">

    <Loading v-if="$fetchState.pending"></Loading>

    <div v-else class="container movies">
    
      <div v-if="moviesUpComing.hasOwnProperty('results')" class="my-5 mx-2">
        <h2 class="text-light my-5">Up Coming Movies</h2>
        <Movies :movies="moviesUpComing.results"/>
        <Pagination class="my-5" page-name='movies-up-coming' :page="$route.query.page" :total-pages="moviesUpComing.total_pages" />
      </div>

    </div>
  </div>
</template>

<script>

export default {
    name: "MoviesUpComingPage",

    scrollToTop: true,
    async fetch() {
        await this.$store.dispatch("movies/getUpComing", this.$route.query.page)
    },
    head() {
        return {
            title: "Movie App - Up Coming Movies",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Get all the Up Coming Movies",
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: "movies, up coming, coming",
                },
            ]
        };
    },
    computed: {
        moviesUpComing() {
            return this.$store.getters["movies/upComing"];
        },
    },

    // watchQuery(newQuery, oldQuery) {
    //     setTimeout(() => {
    //         this.$fetch()
    //         window.scrollTo(0,0)
    //     }, 100);
    //     return newQuery.page && oldQuery.page
    // },

    watch: {
        '$route.query': '$fetch'
    },

    fetchDelay: 1000,
}
</script>

<style scoped>


</style>