export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-movie-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // {
      //   rel: 'stylesheet',
      //   href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3',
      //   crossorigin:"anonymous"
      // }
    ],
     
    script: [
      // {
      //   src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p',
      //   crossorigin:"anonymous"
      // }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/node_modules/bootstrap/dist/css/bootstrap.min.css",
    "~/node_modules/bootstrap-icons/font/bootstrap-icons.css",
    '@/assets/css/style.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js", mode: "client" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    // 'bootstrap-vue/nuxt'
  ],


  auth: {
    localStorage: {
      prefix: 'auth.'
    },
    strategies: {
      

      customStrategy: {
        scheme: '~/schemes/customScheme',
        token: {
          property: 'access_token',
          global: true,
          required: true,
        },
        user: {
          property: false,
          autoFetch: true,
        },
        endpoints: {
          login: { 
            url: `https://api.themoviedb.org/4/auth/access_token`, 
            method:'post', 
            headers: { 
              'Content-Type': 'application/json', 
              "Authorization": `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
            } 
          },
          logout: { url: `https://api.themoviedb.org/4/auth/access_token`, method: 'delete' },
          user: { url: `/account?api_key=${process.env.TMDB_API_KEY}&session_id=ee821312d44768b3ba29d9a57c19d86a2706140d`, method: 'get' }
        },
        redirect: {
          login: '/login',
          logout: '/',
          callback: '/login',
          home: '/'
        }
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://api.themoviedb.org/3/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  loading: {
    color: 'red',
    height: '0.2em'
  },

  // loading: '~/components/LoadingBar.vue'

  publicRuntimeConfig: {
    // baseURL: process.env.BASE_URL || 'https://nuxtjs.org'
  },

  privateRuntimeConfig: {
    // apiSecret: process.env.API_SECRET
  }
}
