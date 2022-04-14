<template>
    <Loading v-if="$fetchState.pending"></Loading>
    <div v-else>
        <div v-if="show" class="container single-show">
            <div class="show-info">
                <div class="show-img">
                    <img :src="`https://image.tmdb.org/t/p/w500/${show.poster_path}`"/>
                </div>
                <div class="show-content">
                    <h1>Name: {{ show.name }}</h1>
                    <h2>Original name: <em>"{{ show.original_name }}"</em></h2>
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
                    <p class="show-fact tagline">
                        <span class="text-main">Tagline:</span> "{{ show.tagline }}"
                    </p>
                    <p class="show-fact">
                        <span class="text-main">TMDB Score:</span> <span class="badge bg-danger">{{show.vote_average}}</span> &#8226; {{show.vote_count}}
                    </p>
                    <p class="show-fact">
                        <span class="text-main">Genres:</span> <span v-for="(genre,index) in show.genres" :key="index" class="badge bg-danger">{{genre.name}}</span>
                    </p>
                   
                    <p class="show-fact">
                        <span class="text-main">Last episode release date:</span>
                        {{new Date(show.last_air_date).toLocaleString('en-us', {month: 'long', day: 'numeric',year: 'numeric',})}}
                    </p>

                    <p class="show-fact">
                        <span class="text-main">Creators:</span>  
                        <span v-for="(person,index) in show.created_by" :key="index" class="text-decoration-none">
                            {{person.name}} <span v-if="index < show.created_by-1">, </span>
                        </span>
                    </p>

                    <p class="show-fact">
                        <span class="text-main">Number of seasons:</span> {{ show.number_of_seasons }}
                        <br>
                        <span class="text-main">Number of episodes:</span> {{ show.number_of_episodes }} 
                    </p>

                    <p class="show-fact">
                        <span class="text-main">Origin Country:</span>  
                        <span v-for="(country,index) in show.origin_country" :key="index" class="text-decoration-none">
                            {{country}}
                        </span>
                        <br>
                        <span class="text-main">Original language:</span> {{ show.original_language }} 
                    </p>

                    <p class="show-fact"><span class="text-main">Overview:</span> {{ show.overview }}</p>

                    <p class="show-fact">
                        <span class="text-main">Production Companies:</span>  
                        <span v-for="(company,index) in show.production_companies" :key="index" class="badge bg-danger">
                            {{company.name}}
                        </span>
                    </p>

                </div>
            </div>
             <div v-if="show.hasOwnProperty('seasons')" class="container">
                <h1 class="text-light mb-3">Seasons:</h1>
                <div v-for="(season,index) in show.seasons" :key="index" class="card border-none mb-3 text-light bg-body">
                    <div class="row g-0">
                        <div class="col-sm-4 col-md-3 col-lg-2">
                            <img style="width:100%; max-height: 20em;" :src="`https://image.tmdb.org/t/p/w500${season.poster_path!==null?season.poster_path:show.poster_path}`" class="img-fluid rounded-start">
                        </div>
                        <div class="col-sm-8 col-md-9 col-lg-10">
                            <div class="card-body">
                                <h5 class="card-title"><span v-if="season.season_number!==0">Season {{season.season_number}}:</span> {{season.name}}</h5>
                                <h6>Release date: {{season.air_date}}</h6>
                                <h6>{{season.episode_count}} episodes</h6>
                                <p class="card-text">{{season.overview}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

export default {
    name: "TVShow",

    validate({ params }) {
        return /^\d+$/.test(params.show); 
    },

    async fetch() {
        await this.$store.dispatch("tv/getShow", this.$route.params.show);
    },

    head() {
        return {
            title: this.show.name,
        };
    },

    fetchDelay: 1000,

    computed: {
        show() {
            return this.$store.getters["tv/show"];
        }
    },

}
</script>

<style scoped>
.single-show {
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 16px;
 
}

.single-show  .button {
    align-self: flex-start;
    margin-bottom: 32px;
  }
  

.single-show .show-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    margin: 2em auto;
    color: #fff;
}

.single-show .show-info .show-content h1 {
    font-size: 56px;
    font-weight: 400; 
}

.single-show .show-info .show-content .show-fact {
    margin-top: 12px;
    font-size: 20px;
    line-height: 1.5;
}

.single-show .show-info .show-content .show-fact span:not(.badge) {
    font-weight: 600;
}

.single-show .show-info .show-content .tagline {
    font-style: italic;
}

.single-show .show-info .show-content .tagline span {
    font-style: normal;
}


.single-show .show-info .show-img img{
        max-height: 500px;
        width: 100%;
}

.show-fact .badge{
    margin: 0 0.25em;
    text-decoration:none;
}

@media (min-width: 800px) {
    .single-show .show-info .show-img img{
        max-height: 700px;
        width: initial;
    }
}

@media (min-width: 800px) {
    .single-show .show-info{
        flex-direction: row;
        align-items: flex-start;
    } 
}


</style>