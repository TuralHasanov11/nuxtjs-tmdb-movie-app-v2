<template>
  <div class="now-playing">

    <Loading v-if="$fetchState.pending"></Loading>

    <div v-else class="container movies">
    
      <div v-if="moviesNowPlaying.hasOwnProperty('results')" class="my-5 mx-2">
        <h2 class="text-light my-5">Now Playing</h2>
        <Movies :movies="moviesNowPlaying.results"/>
        <Pagination class="my-5" page-name='movies-now-playing' :page="$route.query.page" :total-pages="moviesNowPlaying.total_pages" />
      </div>

    </div>
  </div>
</template>

<script>

export default {
    name: "MoviesNowPlayingPage",
    
    scrollToTop: true,

    async fetch() {
        await this.$store.dispatch("movies/getNowPlaying", this.$route.query.page)
    },

    head() {
        return {
            title: "Movie App - Latest Streaming Movie",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Get all the latest streaming movies in theaters & online",
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: "movies, stream, streaming",
                },
            ]
        };
    },
    computed: {
        moviesNowPlaying() {
            return this.$store.getters["movies/nowPlaying"];
        },
    },

    watch: {
        '$route.query': '$fetch'
    },

    fetchDelay: 1000,
}
</script>
