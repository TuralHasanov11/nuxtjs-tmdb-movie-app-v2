<template>
  <div id="ratedTvShows" class="ratedTvShows">
       <Loading v-if="$fetchState.pending"></Loading>

        <div v-else class="container movies">
        
        <div v-if="shows.hasOwnProperty('results')" class="my-5 mx-2">
            <h2 class="text-light my-5">Your Ratings - TV Shows</h2>
            <TVShows :shows="shows.results"/>
            <Pagination class="my-5" pageName='profile-rated-tv-shows' :page="$route.query.page" :totalPages="shows.total_pages" />
        </div>

        </div>
  </div>
</template>

<script>
import TVShows from "@/components/tv/TVShows.vue"
export default {
    name: "ProfileRatedTvShowsPage",
    layout: "default",
    // middleware: 'auth',
    async fetch() {
        await this.$store.dispatch("user/getRatedTvShows", this.$route.query.page);
    },
    watch: {
        "$route.query": "$fetch"
    },
    scrollToTop: true,
    fetchDelay: 1000,
    head: {
        titleTemplate: "%s Rated TV Shows",
        meta: [
            {
                hid: "description",
                name: "description",
                content: "Rated TV Shows"
            },
            {
                hid: "keywords",
                name: "keywords",
                content: "profile, rated, TV shows",
            },
        ]
    },
    computed: {
        shows() {
            return this.$store.getters["user/ratedTvShows"];
        }
    },
    components: { TVShows }
}
</script>

<style>

</style>