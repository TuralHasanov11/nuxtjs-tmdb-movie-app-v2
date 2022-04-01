<template>
  <div id="auth" class="auth">
      <NuxtChild />
  </div>
</template>

<script>
export default {
    name: 'AuthPage',

    layout:'default',

    head:{
        titleTemplate: 'Auth - %s',
        meta: [
        {
            hid: 'description',
            name: 'description',
            content: 'Authentication'
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