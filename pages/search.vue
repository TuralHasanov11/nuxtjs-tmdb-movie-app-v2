<template>
  <div class="search">
    
    <Loading v-if="$fetchState.pending"></Loading>

    <div v-else class="container movies">
    
        <h2 class="text-light my-5">Search Results</h2>
        
        <div v-if="movies.hasOwnProperty('results')" class="my-5 mx-2">
            <h2 class="text-light my-5 border-bottom border-danger">Movies</h2>
            <Movies :movies="movies.results"/>
        </div>

        <div v-if="tvshows.hasOwnProperty('results')" class="my-5 mx-2">
            <h2 class="text-light my-5 border-bottom border-danger">TV Shows</h2>
            <TVShows :shows="tvshows.results"/>
        </div>

    </div>
    

  </div>
</template>

<script>
import Movies from "../components/movies/Movies.vue";
import TVShows from "../components/tv/TVShows.vue";

export default {
    name: "SearchPage",

    components: { Movies, TVShows },
    scrollToTop: true,
   
    async fetch() {
        await this.$store.dispatch("search/getSearch", this.$route.query.search);
    },
    fetchDelay: 1000,

    head() {
        return {
            title: "Movie App - Search",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Get movies, tv shows and people according to your search",
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: "search, searching, search results",
                },
            ]
        };
    },

    computed: {
        movies() {
            return this.$store.getters["search/movies"];
        },

        tvshows() {
            return this.$store.getters["search/tvshows"];
        },

        people() {
            return this.$store.getters["search/people"];
        }
    },
    
}
</script>
