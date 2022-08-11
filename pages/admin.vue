<template>
  <div id="admin" class="admin">
    
    <Loading v-if="$fetchState.pending"></Loading>

    <div v-else class="container">
      

    </div>

  </div>
</template>

<script>

export default {
    name: "AdminPage",
    layout:'admin',

    scrollToTop: true,
   
    async fetch() {
       
    },
    fetchDelay: 1000,

    head() {
        return {
            title: "Admin",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Admin",
                },
            ]
        };
    },
    computed: {

    },
    
}
</script>
