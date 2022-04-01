<template>
  <div id="profile" class="profile">
      <NuxtChild />
  </div>
</template>

<script>
export default {
    name: 'ProfilePage',

    layout:'default',

    head:{
        titleTemplate: 'Profile - %s',
        meta: [
        {
            hid: 'description',
            name: 'description',
            content: 'Profile'
        },
        {
            hid: "keywords",
            name: "keywords",
            content: "Profile",
        },
        ]
    },
}
</script>

<style>

</style>