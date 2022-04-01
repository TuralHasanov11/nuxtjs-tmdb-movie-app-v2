<template>
<div class="movies-grid">
    <div v-for="(show,index) in shows" :key="index" v-show="show.poster_path" class="movie">
        <div class="movie-img">
            <img :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`" alt="">
            <p class="review">{{show.vote_average}}</p>
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
    props:['shows']
}
</script>

<style scoped>

.movies-grid {
  display: grid;
  column-gap: 32px;
  row-gap: 64px;
  grid-template-columns: 1fr; 
}

.movies-grid .movie {
  position: relative;
  display: flex;
  flex-direction: column;

}

.movies-grid .movie .info {
    margin-top: auto;
   
}

.movies-grid .movie .info .title {
  margin-top: 8px;
  color: #fff;
  font-size: 20px;
}
.movies-grid .movie .info .release {
  margin-top: 8px;
  color: #c9c9c9;
}
.movies-grid .movie .info .button {
  margin-top: 8px;
}

.movie .movie-img {
  position: relative;
  overflow: hidden;
}

.movie .movie-img .review {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: #c92502;
    color: #fff;
    border-radius: 0 0 16px 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
.movie .movie-img .overview {
    line-height: 1.5;
    position: absolute;
    bottom: 0;
    background-color: rgba(201, 38, 2, 0.9);
    padding: 12px;
    color: #fff;
    transform: translateY(120%);
    transition: 0.3s ease-in-out all;
  }

.movie .movie-img img {
  display: block;
  width: 100%;
  height: 100%;
}

.movie:hover .overview {
   transform: translateY(1em);
}

@media (min-width: 500px) {
  .movies-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  
}
@media (min-width: 750px) {
  .movies-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
@media (min-width: 1100px) {
  .movies-grid {
    grid-template-columns: repeat(4, 1fr) !important;
  }
}

</style>