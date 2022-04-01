<template>
  <div class="now-playing">

    <Loading v-if="$fetchState.pending"></Loading>

    <div v-else class="container movies">
    
      <div v-if="onTheAir.hasOwnProperty('results')" class="my-5 mx-2">
        <h2 class="text-light my-5">On The Air</h2>
        <TVShows :shows="onTheAir.results"/>
        <Pagination class="my-5" pageName='tv-on-the-air' :page="$route.query.page" :totalPages="onTheAir.total_pages" />
      </div>

    </div>
  </div>
</template>

<script>
import TVShows from "../../components/tv/TVShows.vue";

export default {
    name: "TVOnTheAirPage",
    async fetch() {
        await this.$store.dispatch("tv/getOnTheAir", this.$route.query.page);
    },
    
    watch: {
        '$route.query': '$fetch'
    },

    scrollToTop: true,
    fetchDelay: 1000,
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
    components: { TVShows }
}
</script>

<style scoped>


</style>