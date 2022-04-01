<template>
  <div class="now-playing">

    <Loading v-if="$fetchState.pending"></Loading>

    <div v-else class="container movies">
    
      <div v-if="airingToday.hasOwnProperty('results')" class="my-5 mx-2">
        <h2 class="text-light my-5">Airing Today</h2>
        <TVShows :shows="airingToday.results"/>
        <Pagination class="my-5" pageName='tv-airing-today' :page="$route.query.page" :totalPages="airingToday.total_pages" />
      </div>

    </div>
  </div>
</template>

<script>
import TVShows from "../../components/tv/TVShows.vue";

export default {
    name: "TVAiringTodayPage",
    async fetch() {
        await this.$store.dispatch("tv/getAiringToday", this.$route.query.page);
    },

    watch: {
        '$route.query': '$fetch'
    },

    scrollToTop: true,
    fetchDelay: 1000,

    head() {
        return {
            title: "Movie App - TV shows Airing Today",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Get all the TV shows that are airing today",
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: "tv, tv shows, airing today",
                },
            ]
        };
    },
    computed: {
        airingToday() {
            return this.$store.getters["tv/airingToday"];
        },
    },
    components: { TVShows }
}
</script>

<style scoped>


</style>