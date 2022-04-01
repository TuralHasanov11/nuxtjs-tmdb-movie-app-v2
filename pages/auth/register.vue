<template>
  <div id="register" class="register">
      
  </div>
</template>

<script>
export default {
    name: 'AuthRegisterPage',
    layout:'default',

    methods:{
        register(){

        }
    },

    head:{
        titleTemplate: '%s Register',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: 'Register'
            },
            {
                hid: "keywords",
                name: "keywords",
                content: "authentication, auth, register, register",
            },
        ]
    },
}
</script>

<style>

</style>