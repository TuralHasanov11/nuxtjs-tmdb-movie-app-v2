<template>
    <Loading v-if="$fetchState.pending"></Loading>
    <div v-else>
        <div v-if="movie" class="container single-post">
            <div class="post-info">
                <div class="post-img">
                    <img
                        :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
                        alt=""
                    />
                </div>
                <div class="post-content">
                    <h1>Title: {{ movie.title }}</h1>
                    <h2>Original title: <em>"{{ movie.original_title }}"</em></h2>
                    <h4>
                        <button class="btn btn-secondary">
                            <i class="bi bi-plus-lg"></i>
                            <span>Add to</span> Watchlist
                        </button>
                        <button class="btn bg-main btn-danger">
                            <i class="bi bi-plus-lg"></i>
                            <span>In</span> Watchlist
                        </button>
                    </h4>
                    <p class="post-fact tagline">
                        <span class="text-main" >Tagline:</span> "{{ movie.tagline }}"
                    </p>
                    <p class="post-fact">
                        <span class="text-main" >TMDB Score:</span> <span class="badge bg-danger">{{movie.vote_average}}</span> &#8226; {{movie.vote_count}}
                    </p>
                    <p class="post-fact">
                        <span class="text-main" >Genres:</span> <span v-for="(genre,index) in movie.genres" :key="index" class="badge bg-danger">{{genre.name}}</span>
                    </p>
                    <p class="post-fact">
                        <span class="text-main" >Released:</span>
                        {{
                            new Date(movie.release_date).toLocaleString('en-us', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                            })
                        }}
                    </p>
                    <p class="post-fact">
                        <span class="text-main" >Duration:</span> {{ movie.runtime }} minutes
                    </p>
                    <p class="post-fact">
                        <span class="text-main" >Revenue:</span>
                        {{
                            movie.revenue.toLocaleString('en-us', {
                                style: 'currency',
                                currency: 'USD',
                            })
                        }}
                        <br>
                        <span class="text-main" >Budget:</span>
                        {{
                            movie.budget.toLocaleString('en-us', {
                                style: 'currency',
                                currency: 'USD',
                            })
                        }}
                    </p>
                    <p class="post-fact">
                        <span class="text-main" >Production Companies:</span>  
                        <span v-for="(company,index) in movie.production_companies" :key="index" class="badge bg-danger">
                            {{company.name}}
                        </span>
                    </p>
                    <p class="post-fact"><span class="text-main" >Overview:</span> {{ movie.overview }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Movie",

    validate({ params }) {
        return /^\d+$/.test(params.movie); // checking if movie id is integer
    },

    async fetch() {
        await this.$store.dispatch("movies/getMovie", this.$route.params.movie);
    },

    head() {
        return {
            title: this.movie.title,
        };
    },

    fetchDelay: 1000,

    computed: {
        movie() {
            return this.$store.getters["movies/movie"];
        }
    },

}
</script>
