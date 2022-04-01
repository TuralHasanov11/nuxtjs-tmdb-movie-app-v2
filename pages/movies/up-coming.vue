<template>
  <div class="top-rated">

    <Loading v-if="$fetchState.pending"></Loading>

    <div v-else class="container movies">
    
      <div v-if="moviesUpComing.hasOwnProperty('results')" class="my-5 mx-2">
        <h2 class="text-light my-5">Up Coming Movies</h2>
        <Movies :movies="moviesUpComing.results"/>
        <Pagination class="my-5" pageName='movies-up-coming' :page="$route.query.page" :totalPages="moviesUpComing.total_pages" />
      </div>

    </div>
  </div>
</template>

<script>

export default {
    name: "MoviesUpComingPage",
    async fetch() {
        await this.$store.dispatch("movies/getUpComing", this.$route.query.page)
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

    scrollToTop: true,

    fetchDelay: 1000,
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
}
</script>

<style scoped>


</style>