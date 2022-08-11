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

    return await this.$auth.requestWith(this.name, endpoint, {...this.options.endpoints.user, url:`${this.options.endpoints.user.url}&session_id=${localStorage.getItem('tmdb_session_id')}`})
      .then((response) => {

        this.$auth.setUser(response.data)

        return response
      })
      .catch((error) => {
        this.$auth.callOnError(error, { method: 'fetchUser' })
      })
   
    
  }
}