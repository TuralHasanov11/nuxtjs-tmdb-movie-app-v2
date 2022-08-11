<template>
  <div class="now-playing">

    <Loading v-if="$fetchState.pending"></Loading>

    <div v-else class="container movies">
    
      <div v-if="onTheAir.hasOwnProperty('results')" class="my-5 mx-2">
        <h2 class="text-light my-5">On The Air</h2>
        <TVShows :shows="onTheAir.results"/>
        <Pagination class="my-5" page-name='tv-on-the-air' :page="$route.query.page" :total-pages="onTheAir.total_pages" />
      </div>

    </div>
  </div>
</template>

<script>
import TVShows from "../../components/tv/TVShows.vue";

export default {
    name: "TVOnTheAirPage",
    components: { TVShows },

    scrollToTop: true,
    async fetch() {
        await this.$store.dispatch("tv/getOnTheAir", this.$route.query.page);
    },
    head() {
        return {
            title: "Movie App - TV shows On The Air",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Get all the TV shows that are on the air",
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: "tv, tv shows, on the air",
                },
            ]
        };
    },
    computed: {
        onTheAir() {
            return this.$store.getters["tv/onTheAir"];
        },
    },
    
    watch: {
        '$route.query': '$fetch'
    },
    fetchDelay: 1000
}
</script>

<style scoped>


</style>