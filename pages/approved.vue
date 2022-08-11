<template>
  <div class="approved">
      <h1 class="text-center" style="font-size: 1.2em;">
          <button class="btn btn-outline-danger btn-lg" @click="verify">Verify Account</button>
      </h1>
  </div>
</template>

<script>

export default {
    name: "ApprovedPage",
    auth: 'guest_user',

    head() {
        return {
            title: "Movie App - Approved",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "TMDB Account Approved",
                },
            ]
        };
    },
   
    methods:{
        async verify(){
                const {data} = await this.$auth.loginWith('customStrategy', { data: {request_token:localStorage.getItem('tmdb_request_token')} })
                window.localStorage.getItem('account_id', data.account_id)
                window.localStorage.getItem('access_token', data.access_token)
                window.localStorage.removeItem('tmdb_request_token')
                if(data.success){
                    const sessionData = await this.$axios.$post(`authentication/session/convert/4?api_key=${this.$store.state.apiKey}`,{
                        access_token: data.access_token,
                    })
                    this.$auth.$storage.setLocalStorage('tmdb_session_id', sessionData.session_id)
                    localStorage.setItem('tmdb_session_id', sessionData.session_id)
                    window.location.replace('/')
                }

              
               
        }
    },

    fetchDelay: 1000,
    
}
</script>

<style scoped>
.approved{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

}
</style>
