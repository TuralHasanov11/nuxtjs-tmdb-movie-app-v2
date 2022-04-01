<template>
<div class="people-grid">
    <div v-for="(people,index) in people" :key="index" v-show="people.profile_path" class="people">
        <div class="people-img">
            <img :src="`https://image.tmdb.org/t/p/w500${people.profile_path}`" alt="">
        </div>
        <div class="info">
            <p class="title">
                {{people.name}} 
            </p>
            <NuxtLink no-prefetch class="button button-light" :to="{name:'celebrities-celebrity', params:{celebrity:people.id}}">
                More Info
            </NuxtLink>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name:'People',
    props:['people']
}
</script>

<style scoped>

.people-grid {
  display: grid;
  column-gap: 32px;
  row-gap: 64px;
  grid-template-columns: 1fr; 
}

.people-grid .people {
  position: relative;
  display: flex;
  flex-direction: column;

}

.people-grid .people .info {
    margin-top: auto;
   
}

.people-grid .people .info .title {
  margin-top: 8px;
  color: #fff;
  font-size: 20px;
}

.people-grid .people .info .button {
  margin-top: 8px;
}

.people .people-img {
  position: relative;
  overflow: hidden;
}


.people .people-img img {
  display: block;
  width: 100%;
  height: 100%;
}


@media (min-width: 500px) {
  .people-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  
}
@media (min-width: 750px) {
  .people-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
@media (min-width: 1100px) {
  .people-grid {
    grid-template-columns: repeat(4, 1fr) !important;
  }
}

</style>