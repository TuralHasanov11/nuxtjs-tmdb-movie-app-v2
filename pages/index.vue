<template>
  <div class="home">

    <!-- Hero -->
    <Hero/>
    
    <Loading v-if="$fetchState.pending"></Loading>

    <div v-else class="container">
      <div v-if="moviesNowPlaying.hasOwnProperty('results')" id="movies-now-playing" class="py-3 my-5 mx-2">
        <h2 class="text-light my-5 border-bottom border-danger">On theatres</h2>
        <Movies :movies="moviesNowPlaying.results"/>
      </div>

      <div v-if="tvshowsAiringToday.hasOwnProperty('results')" id="tv-shows-airing-today" class="py-3 my-5 mx-2">
        <h2 class="text-light my-5 border-bottom border-danger">On TV today</h2>
        <TVShows :shows="tvshowsAiringToday.results"/>
      </div>

    </div>

  </div>
</template>

<script>
import Movies from "../components/movies/Movies.vue";
import TVShows from "../components/tv/TVShows.vue";

export default {
    name: "IndexPage",
    components: { Movies, TVShows },
   
    async fetch() {
        await this.$store.dispatch("movies/getNowPlaying");
        await this.$store.dispatch("tv/getAiringToday");
    },

    scrollToTop: true,
    fetchDelay: 1000,

    head() {
        return {
            title: "Movie App - Latest Streaming Movie Info",
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

        tvshowsAiringToday() {
            return this.$store.getters["tv/airingToday"];
        },
    },
    
}
</script>
