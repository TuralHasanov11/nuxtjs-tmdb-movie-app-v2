<template>
  <div class="hero">
      <img src="@/assets/images/movieHero.jpg" alt="">
      <div class="text-container">
          <div class="text">
              <span class="mini-heading">
                  Now Streaming
              </span>
              <h1><span>Now</span> Streaming</h1>
              <a href="#movies-now-playing" class="button">View Movies</a>
              <a href="#tv-shows-airing-today" class="btn btn-outline-light">View TV Shows</a>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'Hero',
}
</script>

<style scoped>
.hero {
  height: 400px;
  position: relative;

}

.hero img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  

.hero .text-container {
    z-index: 99;
    position: absolute;
    top: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.hero .text-container  .text {
    padding: 0 16px;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    font-size: 1.2em;
}

.hero .mini-heading {
      font-weight: 600;
      font-size: 18px;
      text-transform: uppercase;
      color: #c92502;
      margin-bottom: 8px;
      
}
   
@media (min-width: 750px) {
    .hero .mini-heading{
        font-size: 22px;
    }   
}

.hero  h1 {
      color: #fff;
      font-size: 64px;
      font-weight: 200;
      margin-bottom: 8px;
}

@media (min-width: 750px) {
    .hero h1{
        font-size: 84px;
    }
}

.hero h1 span {
    font-weight: 500;
}

.hero::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
}

@media (min-width: 750px) {
    .hero{
        height: 500px;
    }
}

</style>