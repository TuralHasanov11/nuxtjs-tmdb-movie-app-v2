<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <NuxtLink class="navbar-brand" :to="{name:'index'}">
                <img src="@/assets/images/logo.png" alt="" width="42" height="36">
            </NuxtLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="moviesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Movies
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="moviesDropdown">
                        <li>
                            <NuxtLink class="dropdown-item" no-prefetch :to="{name:'movies-top-rated'}">
                                Top Movies
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink class="dropdown-item" no-prefetch :to="{name:'movies-popular'}">
                                Popular Now
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink class="dropdown-item" no-prefetch :to="{name:'movies-up-coming'}">
                                Up Coming
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink class="dropdown-item" no-prefetch :to="{name:'movies-now-playing'}">
                                Streaming Now
                            </NuxtLink>
                        </li>
                    </ul>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="tvDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        TV Shows
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="tvDropdown">
                        <li>
                            <NuxtLink class="dropdown-item" no-prefetch :to="{name:'tv-airing-today'}">
                                Showed Today
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink class="dropdown-item" no-prefetch :to="{name:'tv-on-the-air'}">
                                Streaming Now
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink class="dropdown-item" no-prefetch :to="{name:'tv-popular'}">
                                Popular
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink class="dropdown-item" no-prefetch :to="{name:'tv-top-rated'}">
                                Top Rated
                            </NuxtLink>
                        </li>
                    </ul>
                    
                </li>

                <li class="nav-item">
                    <NuxtLink class="nav-link" :to="{name:'celebrities-popular'}" :class="{'active':$router.name==='celebrities-popular'}" :aria-current="{'page':$router.name==='celebrities'}">
                        Popular Celebrities
                    </NuxtLink>
                </li>

            </ul>
            <ul class="navbar-nav mb-2 mb-lg-0 mx-2">
                <template v-if="$auth.user">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="watclistDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-bookmark-plus-fill"></i> Watchlist
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="watclistDropdown">
                            <li>
                                <NuxtLink :to="{name:'profile-watchlist-movies'}" class="dropdown-item" no-prefetch :class="{'active':$router.name==='profile-watchlist-movies'}" :aria-current="{'page':$router.name==='profile-watchlist-movies'}">
                                    Movies
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="{name:'profile-watchlist-tv-shows'}" class="dropdown-item" no-prefetch :class="{'active':$router.name==='profile-watchlist-tv-shows'}" :aria-current="{'page':$router.name==='profile-watchlist-tv-shows'}">
                                    TV Shows
                                </NuxtLink>
                            </li>
                        </ul>
                    </li>
                
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {{$auth.user.username}}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="userDropdown">
                            <li>
                                <NuxtLink :to="{name:'profile'}" class="dropdown-item" no-prefetch :class="{'active':$router.name==='profile'}" :aria-current="{'page':$router.name==='profile'}">
                                    Profile
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="{name:'profile-watchlist-movies'}" class="dropdown-item" no-prefetch :class="{'active':$router.name==='profile-watchlist-movies'}" :aria-current="{'page':$router.name==='profile-watchlist-movies'}">
                                    Watchlist Movies
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="{name:'profile-watchlist-tv-shows'}" class="dropdown-item" no-prefetch :class="{'active':$router.name==='profile-watchlist-tv-shows'}" :aria-current="{'page':$router.name==='profile-watchlist-tv-shows'}">
                                    Watchlist TV Shows
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="{name:'profile-rated-movies'}" class="dropdown-item" no-prefetch :class="{'active':$router.name==='profile-rated-movies'}" :aria-current="{'page':$router.name==='profile-rated-movies'}">
                                    Rated Movies
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="{name:'profile-rated-tv-shows'}" class="dropdown-item" no-prefetch :class="{'active':$router.name==='profile-rated-tv-shows'}" :aria-current="{'page':$router.name==='profile-rated-tv-shows'}">
                                    Rated TV Shows
                                </NuxtLink>
                            </li>
                            <li>
                                <div class="dropdown-item">
                                    <button class="btn btn-danger" @click="logout">Sign out</button>
                                </div>
                            </li>
                        </ul>
                    </li>
                </template>
                <li v-else class="nav-item">
                   
                    <button class="btn btn-danger" @click="login">Login</button>
                </li>
            </ul>
            <form @submit.prevent="searchData" class="d-flex">
                <input v-model.lazy="search" @keyup.enter="searchData" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-danger" type="submit">Search</button>
            </form>
            
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name:'Navbar',

    data(){
        return {
            search:''
        }
    },

    methods:{
        searchData(){
            this.$router.push({name:'search', query:{search:this.search}})
        },

        async login(){
            await this.$store.dispatch('user/createRequestTokenAndSession')
        },

        async logout(){
            await this.$store.dispatch('user/logout')
        }
    }
}
</script>

<style>

</style>