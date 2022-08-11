<template>
  <div id="watchlistTvShows" class="watchlistTvShows">
       <Loading v-if="$fetchState.pending"></Loading>

        <div v-else class="container movies">
            <div v-if="shows.hasOwnProperty('results')" class="my-5 mx-2">
                <h2 class="text-light my-5">Your Watchlist - TV Shows</h2>
                <TVShows :shows="shows.results"/>
                <Pagination class="my-5" page-name='profile-watchlist-tv-shows' :page="$route.query.page" :total-pages="shows.total_pages" />
            </div>
        </div>
  </div>
</template>

<script>
import TVShows from "@/components/tv/TVShows.vue"
export default {
    name: "ProfileWatchlistTvShowsPage",
    components: { TVShows },
    layout: "default",
    scrollToTop: true,
    // middleware: 'auth',
    async fetch() {
        await this.$store.dispatch("user/getWatchlistTvShows", this.$route.query.page);
    },
    head: {
        titleTemplate: "%s Watchlist TV Shows",
        meta: [
            {
                hid: "description",
                name: "description",
                content: "Watchlist TV Shows"
            },
            {
                hid: "keywords",
                name: "keywords",
                content: "profile, watchlist, TV shows",
            },
        ]
    },
    computed: {
        shows() {
            return this.$store.getters["user/watchlistTvShows"];
        }
    },
    watch: {
        "$route.query": "$fetch"
    },
    fetchDelay: 1000
}
</script>

<style>

</style>