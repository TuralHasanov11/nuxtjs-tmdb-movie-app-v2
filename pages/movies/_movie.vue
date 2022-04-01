<template>
    <Loading v-if="$fetchState.pending"></Loading>
    <div v-else>
        <div v-if="movie" class="container single-movie">
            <div class="movie-info">
                <div class="movie-img">
                    <img
                        :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
                        alt=""
                    />
                </div>
                <div class="movie-content">
                    <h1>Title: {{ movie.title }}</h1>
                    <h2>Original title: <em>"{{ movie.original_title }}"</em></h2>
                    <p class="movie-fact tagline">
                        <span class="text-main" >Tagline:</span> "{{ movie.tagline }}"
                    </p>
                    <p class="movie-fact">
                        <span class="text-main" >TMDB Score:</span> <span class="badge bg-danger">{{movie.vote_average}}</span> &#8226; {{movie.vote_count}}
                    </p>
                    <p class="movie-fact">
                        <span class="text-main" >Genres:</span> <span v-for="(genre,index) in movie.genres" :key="index" class="badge bg-danger">{{genre.name}}</span>
                    </p>
                    <p class="movie-fact">
                        <span class="text-main" >Released:</span>
                        {{
                            new Date(movie.release_date).toLocaleString('en-us', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                            })
                        }}
                    </p>
                    <p class="movie-fact">
                        <span class="text-main" >Duration:</span> {{ movie.runtime }} minutes
                    </p>
                    <p class="movie-fact">
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
                    <p class="movie-fact">
                        <span class="text-main" >Production Companies:</span>  
                        <span v-for="(company,index) in movie.production_companies" :key="index" class="badge bg-danger">
                            {{company.name}}
                        </span>
                    </p>
                    <p class="movie-fact"><span class="text-main" >Overview:</span> {{ movie.overview }}</p>
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

<style scoped>
.single-movie {
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 16px;
 
}

.single-movie  .button {
    align-self: flex-start;
    margin-bottom: 32px;
  }
  

.single-movie .movie-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    color: #fff;
}

.single-movie .movie-info .movie-content h1 {
    font-size: 56px;
    font-weight: 400; 
}

.single-movie .movie-info .movie-content .movie-fact {
    margin-top: 12px;
    font-size: 20px;
    line-height: 1.5;
}

.single-movie .movie-info .movie-content .movie-fact span:not(.badge) {
    font-weight: 600;
}

.single-movie .movie-info .movie-content .tagline {
    font-style: italic;
}

.single-movie .movie-info .movie-content .tagline span {
    font-style: normal;
}


.single-movie .movie-info .movie-img img{
        max-height: 500px;
        width: 100%;
}

.movie-fact .badge{
    margin: 0 0.25em;
    text-decoration:none;
}

@media (min-width: 800px) {
    .single-movie .movie-info .movie-img img{
        max-height: 700px;
        width: initial;
    }
}

@media (min-width: 800px) {
    .single-movie .movie-info{
        flex-direction: row;
        align-items: flex-start;
    } 
}


</style>