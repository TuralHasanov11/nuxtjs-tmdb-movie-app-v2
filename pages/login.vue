<template>
  <div id="login" class="login">
      <h1 class="text-center" style="font-size: 1.2em;">
          <button class="btn btn-outline-danger btn-lg" @click="login">Sign In</button>
      </h1>
  </div>
</template>

<script>
export default {
    name: 'LoginPage',
    layout:'default',
    middleware:'guest_user',

    methods:{
        async login(){
            await this.$store.dispatch('user/createRequestTokenAndSession')
        },
    },

    head:{
        titleTemplate: '%s Login',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: 'Login'
            },
            {
                hid: "keywords",
                name: "keywords",
                content: "authentication, auth, login, register",
            },
        ]
    },
}
</script>

<style scoped>
.login{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

}
</style>