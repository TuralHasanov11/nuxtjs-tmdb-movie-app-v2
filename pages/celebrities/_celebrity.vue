<template>
    <Loading v-if="$fetchState.pending"></Loading>
    <div v-else>
        <div v-if="person" class="container single-person py-5">
            <div class="person-info">
                <div class="person-img">
                    <img :src="`https://image.tmdb.org/t/p/w500/${person.profile_path}`" />
                </div>
                <div class="person-content">
                    <h1>{{ person.name }}</h1>
                    <p class="person-fact">
                        <span class="text-main">Born:</span> {{new Date( person.birthday).toLocaleString('en-us', {month: 'long', day: 'numeric',year: 'numeric'})}} 
                        <br>
                        <template v-if="person.deathday!==null">
                            <span class="text-main">Death:</span>{{new Date( person.birthday).toLocaleString('en-us', {month: 'long', day: 'numeric',year: 'numeric'})}}  
                        </template>
                    </p>
                    <p class="person-fact">
                        <span class="text-main">Profession:</span> {{person.known_for_department}}
                    </p>
                    <p class="person-fact">
                        <span class="text-main">Place of birth:</span> {{person.place_of_birth}}
                    </p>
                     <p class="person-fact"><span class="text-main" >Biography:</span> {{ person.biography }}</p>
                </div>
            </div>
        </div>
        <div v-if="person.hasOwnProperty('credits')" class="container">
            <h1 class="text-light mb-3">Starred in</h1>
            <div v-for="(credit,index) in person.credits" :key="index" class="card border-none mb-3 text-light bg-body">
                <div class="row g-0">
                    <div class="col-sm-4 col-md-3 col-lg-2">
                        <img v-if="credit.poster_path" style="width:100%; max-height: 20em;" :src="`https://image.tmdb.org/t/p/w500${credit.poster_path}`" class="img-fluid rounded-start">
                        <div v-else class="bg-light" style="width:100%; max-height: 20em;"></div>
                    </div>
                    <div class="col-sm-8 col-md-9 col-lg-10">
                        <div class="card-body">
                            <h5 class="card-title">{{credit.title ? credit.title : credit.name}}</h5>
                            <h6>Character name: {{credit.character}}</h6>
                            <h6>Score: {{credit.vote_average}}</h6>
                            <p class="card-text">{{credit.overview}}</p>
                            <p class="card-text">
                                <NuxtLink v-if="credit.title" no-prefetch class="button button-light" :to="{name:'movies-movie', params:{movie:credit.id}}">
                                    More Info
                                </NuxtLink>
                                <NuxtLink v-else-if="credit.name" no-prefetch class="button button-light" :to="{name:'tv-show', params:{show:credit.id}}">
                                    More Info
                                </NuxtLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Person",

    validate({ params }) {
        return /^\d+$/.test(params.celebrity);
    },

    async fetch() {
        await this.$store.dispatch("people/getPerson", this.$route.params.celebrity);
    },

    head() {
        return {
            title: this.person.name,
        };
    },

    fetchDelay: 1000,

    computed: {
        person() {
            return this.$store.getters["people/person"];
        }
    },

}
</script>

<style scoped>
.single-person {
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.single-person  .button {
    align-self: flex-start;
    margin-bottom: 32px;
  }
  

.single-person .person-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    color: #fff;
}

.single-person .person-info .person-content h1 {
    font-size: 56px;
    font-weight: 400; 
}

.single-person .person-info .person-content .person-fact {
    margin-top: 12px;
    font-size: 20px;
    line-height: 1.5;
}

.single-person .person-info .person-img img{
        max-height: 500px;
        width: 100%;
}

.person-fact .badge{
    margin: 0 0.25em;
    text-decoration:none;
}

@media (min-width: 800px) {
    .single-person .person-info .person-img img{
        max-height: 700px;
        width: initial;
    }
}

@media (min-width: 800px) {
    .single-person .person-info{
        flex-direction: row;
        align-items: flex-start;
    } 
}


</style>