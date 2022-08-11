<template>
<div class="posts-grid">
    <div v-for="(show,index) in shows" v-show="show.poster_path" :key="index" class="post">
        <div class="post-img">
            <img :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`" alt="">
            <p class="review">{{show.vote_average}}</p>
            <span class="user-post-info">
              <span class="watchlist-toggle" :class="{active:watchlistTvShowsIds.includes(show.id)}" data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Watchlist" @click="watchlistToggle(show.id)"><i class="bi bi-plus-lg"></i></span>
              <span v-if="show.rating" style="border-radius: 0 0 0 1em;" class="rating-toggle border-top border-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Your rating"><span class="mr-1">{{show.rating}}</span> <i class="bi bi-star-fill"></i></span>
            </span>
            <p v-if="show.overview!==''" class="overview">{{show.overview}}</p>
        </div>
        <div class="info">
            <p class="title">
                {{show.name.slice(0,25)}} 
                <span v-if="show.name.length>25">...</span>
            </p>
              <p class="release">
                First show date:
                {{
                new Date(show.first_air_date).toLocaleString('en-us', {
                    month: 'numeric',
                    day: 'numeric',
                    year: 'numeric',
                })
                }}
              </p>
            <NuxtLink no-prefetch class="button button-light" :to="{name:'tv-show', params:{'show':show.id}}">
                More Info
            </NuxtLink>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name:'TVShows',
    props:{
      shows:{
        type: Array,
        default: () => []
      }
    },

    computed:{
      watchlistTvShowsIds(){
         return this.$store.getters["user/watchlistTvShowsIds"];
      }
    },

    methods:{
      watchlistToggle(show){
        this.$store.dispatch("user/addToWatchlist", show, this.watchlistTvShowsIds.includes(show.id))
      }
    }
}
</script>
