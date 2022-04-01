<template>
  <div id="login" class="login">
      
  </div>
</template>

<script>
export default {
    name: 'AuthLoginPage',
    layout:'default',

    methods:{
        login(){

        }
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

<style>

</style>