<template>
  <div id="profileIndex" class="profileIndex">
      <div class="container profile-area">
          <div class="profile-info">
              <div class="profile-img">
                  <img 
                        v-if="$auth.user.avatar.tmdb.avatar_path"
                      :src="`${$auth.user.avatar.tmdb.avatar_path}`"
                      alt=""
                  />
                  <span v-else>
                     <i class="bi bi-person-circle"></i>
                  </span>
              </div>
              <div class="profile-content">
                  <h1>{{ $auth.user.username }}</h1>
                  <!-- <h2><em>{{ $auth.user?.name }}</em></h2> -->
                  <h4 v-if="$auth.user.include_adult">
                     <span class="text-main" >Adult Content included</span>
                  </h4>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ProfileIndex',
    layout:'default',

    scrollToTop: true,

    fetchDelay: 1000,
}
</script>

<style>
.profile-area {
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start; 
  align-items: center;
  padding: 3em 1em;
}

.profile-area  .button {
    align-self: flex-start;
    margin-bottom: 32px;
  }
  

.profile-area .profile-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    color: #fff;
}

.profile-area .profile-info .profile-content h1 {
    font-size: 2.75em;
    font-weight: 400; 
}

.profile-area .profile-info .profile-content .post-fact {
    margin-top: 0.75em;
    font-size: 1.25em;
    line-height: 1.5;
}

.profile-area .profile-info .profile-content .post-fact span:not(.badge) {
    font-weight: 600;
}

.profile-area .profile-info .profile-content .tagline {
    font-style: italic;
}

.profile-area .profile-info .profile-content .tagline span {
    font-style: normal;
}


.profile-area .profile-info .profile-img img{
  width: 2.75em;
  height: 2.75em;
}

.profile-area .profile-info .profile-img i{
  font-size: 2.75em;
}

.post-fact .badge{
    margin: 0 0.25em;
    text-decoration:none;
}

@media (min-width: 792px) {
  .profile-area .profile-info{
    flex-direction: row;
    align-items: flex-start;
  } 

  .profile-area .profile-info .profile-img img{
      max-width: 2.75em;
      max-height: 2.75em;
  }
}


</style>