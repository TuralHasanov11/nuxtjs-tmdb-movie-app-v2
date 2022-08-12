<template>
<div class="posts-grid">
    <div v-for="(movie,index) in movies" v-show="movie.poster_path" :key="index" class="post">
        <div class="post-img">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="">
            <p class="review">{{movie.vote_average.toFixed(1)}}</p>
            <span class="user-post-info">
              <span v-if="$auth.user" class="watchlist-toggle" :class="{active:watchlistMoviesIds.includes(movie.id)}" data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Watchlist" @click="watchlistToggle(movie)"><i class="bi bi-plus-lg"></i></span>
              <span v-if="movie.rating" style="border-radius: 0 0 0 1em;" class="rating-toggle border-top border-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Your rating"><span class="mx-1">{{movie.rating}}</span> <span><i class="bi bi-star-fill"></i></span></span>
            </span>
            <p v-if="movie.overview!==''" class="overview">{{movie.overview}}</p>
        </div>
        <div class="info">
            <p class="title">
                {{movie.title.slice(0,25)}} 
                <span v-if="movie.title.length>25">...</span>
            </p>
              <p class="release">
                Released:
                {{
                new Date(movie.release_date).toLocaleString('en-us', {
                    month: 'numeric',
                    day: 'numeric',
                    year: 'numeric',
                })
                }}
              </p>
            <NuxtLink no-prefetch class="button button-light" :to="{name:'movies-movie', params:{movie:movie.id}}">
                More Info
            </NuxtLink>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name:'Movies',
    props:{
      movies:{
        type: Array,
        default: () => []
      }
    },

    computed:{
      watchlistMoviesIds(){
          return this.$store.getters['user/watchlistMoviesIds']
      }
    },

    methods:{
      watchlistToggle(movie){
        this.$store.dispatch("user/addToWatchlist", movie, this.watchlistMoviesIds.includes(movie.id))
      }
    }
}
</script>
