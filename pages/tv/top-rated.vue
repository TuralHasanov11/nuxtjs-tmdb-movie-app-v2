<template>
  <div class="now-playing">

    <Loading v-if="$fetchState.pending"></Loading>

    <div v-else class="container movies">
    
      <div v-if="topRated.hasOwnProperty('results')" class="my-5 mx-2">
        <h2 class="text-light my-5">Top Rated TV Shows</h2>
        <TVShows :shows="topRated.results"/>
        <Pagination class="my-5" pageName='tv-top-rated' :page="$route.query.page" :totalPages="topRated.total_pages" />
      </div>

    </div>
  </div>
</template>

<script>
import TVShows from "../../components/tv/TVShows.vue";

export default {
    name: "TVTopRated",
    async fetch() {
        await this.$store.dispatch("tv/getTopRated", this.$route.query.page);
    },

    watch: {
        '$route.query': '$fetch'
    },
    
    scrollToTop: true,
    fetchDelay: 1000,
    
    head() {
        return {
            title: "Movie App - Top Rated TV Shows",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Get all the TV shows that are top rated",
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: "tv, tv shows, top rated",
                },
            ]
        };
    },
    computed: {
        topRated() {
            return this.$store.getters["tv/topRated"];
        },
    },
    components: { TVShows }
}
</script>

<style scoped>


</style>