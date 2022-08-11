<template>
  <div class="celebrities">
    <Loading v-if="$fetchState.pending"></Loading>

    <div v-else class="container movies">
      <div v-if="people.hasOwnProperty('results')" class="my-5 mx-2">
        <h2 class="text-light my-5">Popular Celebrities</h2>
        <People :people="people.results" />
        <Pagination class="my-5" page-name='celebrities-popular' :page="$route.query.page" :total-pages="people.total_pages" />
      </div>

    </div>

  </div>
</template>

<script>
import People from "../../components/people/People.vue";

export default {
    name: "CelebritiesPage",

    components: { People },

    scrollToTop: true,
    async fetch() {
        await this.$store.dispatch("people/getPopular", this.$route.query.page);

    },

    head() {
        return {
            title: "Movie App - Most Popular Celebrities",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Get all the popular celebrities",
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: "people, celebrities, popular celebrities",
                },
            ]
        };
    },
    computed: {
        people() {
            return this.$store.getters["people/popular"];
        },
    },

    watch: {
        '$route.query': '$fetch'
    },
    fetchDelay: 1000,

}
</script>

