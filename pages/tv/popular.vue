<template>
  <div class="now-playing">

    <Loading v-if="$fetchState.pending"></Loading>

    <div v-else class="container movies">
    
      <div v-if="popular.hasOwnProperty('results')" class="my-5 mx-2">
        <h2 class="text-light my-5">Popular TV Shows</h2>
        <TVShows :shows="popular.results"/>
        <Pagination class="my-5" page-name='tv-popular' :page="$route.query.page" :total-pages="popular.total_pages" />
      </div>

    </div>
  </div>
</template>

<script>
import TVShows from "../../components/tv/TVShows.vue";

export default {
    name: "TVPopular",
    components: { TVShows },
    
    scrollToTop: true,
    async fetch() {
        await this.$store.dispatch("tv/getPopular", this.$route.query.page);
    },
    head() {
        return {
            title: "Movie App - Popular TV Shows",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Get all the TV shows that are popular now",
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: "tv, tv shows, popular",
                },
            ]
        };
    },
    computed: {
        popular() {
            return this.$store.getters["tv/popular"];
        },
    },
    
    watch: {
        '$route.query': '$fetch'
    },
    fetchDelay: 1000
}
</script>
