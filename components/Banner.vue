<template>
  <div id="banner" class="banner mx-auto my-5">
        <div id="bannerCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button v-for="(item, index) in trending.results" :key="index" type="button" data-bs-target="#bannerCarousel" :data-bs-slide-to="index" :class="{'active':index==0}" :aria-current="index==0" :aria-label="`Slide ${index+1}`"></button>
            </div>
            <div class="carousel-inner">
                <div v-for="(item, index) in trending.results" :key="index" class="carousel-item" :class="{'active':index==0}">
                    <img :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`" class="d-block">
                    <div class="carousel-caption">
                        <h3>{{item.title}}</h3>
                        <p>{{item.overview}}</p>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
  </div>
</template>

<script>
export default {
    name:'Banner',

    props:['trending']

}
</script>

<style scoped>
    .banner{
        width: 50% !important;
        height: 75vh !important;
    }

    .carousel, .carousel .carousel-inner, .carousel-item img{
        width: 100%;
        height: 100%;
    }

    .carousel-caption{
        position: absolute;
        top: 0;
        right: 2em;
        max-width: 70%;
    }

    .carousel-inner{
        position: relative;
        font-size: 1.5em;
        background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.575));
    }

    .carousel-inner h3{
        font-size: 1.5em;
    }

</style>