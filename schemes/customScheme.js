import { LocalScheme } from '~auth/runtime'

export default class CustomScheme extends LocalScheme {
  async fetchUser (endpoint) {

    // if (!this.check().valid) {
    //   return
    // }

    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }

    // const endPointUser = {...this.options.endpoints.user, url:this.options.endpoints.user.url+`&session_id=${localStorage.getItem('auth.tmdb_session_id')}`}

    return await this.$auth.requestWith(this.name, endpoint, this.options.endpoints.user)
      .then((response) => {

        this.$auth.setUser(response.data)

        return response
      })
      .catch((error) => {
        this.$auth.callOnError(error, { method: 'fetchUser' })
      })
   
    
  }
}