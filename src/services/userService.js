import axios from 'axios'
import props from './../props'
import * as Cookies from 'tiny-cookie'
export default class UserService {
  static login (username, password) {
    return axios.post(props.backend_uri + '/user/info', {}, {
      auth: {
        username: username,
        password: password
      }
    })
      .then(r => {
        Cookies.setCookie('token', r.headers['x-auth-token'])
        return r
      })
      .catch(err => this.onLoginError(err))
  }

  static onLoginError (err) {
    Cookies.remove('token')
    throw Error(err)
  }

  static loginExistingToken () {
    let token = this.getToken()
    return axios.post(props.backend_uri + '/user/info', {}, {
      headers: {
        'x-auth-token': token
      }
    })
      .catch(err => this.onLoginError(err))
  }

  static activate (key) {
    return axios.post(props.backend_uri + '/signup/activate', {}, {
      params: {
        activationKey: key
      }
    })
  }
  static register (registration) {
    registration.hookUrl = location.origin + '/signup?activationKey='
    return axios.post(props.backend_uri + '/signup', registration, {})
  }
  static updateProfil (profil) {
    return axios.post(props.backend_uri + '/user/profil/update', profil, {
      headers: {
        'x-auth-token': this.getToken()
      }
    })
  }

  static uploadProfilPicture (file) {
    let formData = new FormData()
    let token = this.getToken()
    formData.append('file', file)
    return axios.post(props.backend_uri + '/user/picture/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': token
      }
    })
  }

  /**
   * vérifie les droits d'accès
   * @param auth les roles de l'utilisateur connectés
   * @param accessRoles les roles à vérifier
   * @returns {*|boolean}
   */
  static checkAuthorities (auth, accessRoles) {
    return auth.some(r => accessRoles.includes(r))
  }

  static tokenExist () {
    return !!Cookies.get('token')
  }
  static getToken () {
    return Cookies.get('token')
  }

  static logout () {
    Cookies.remove('token')
  }
}
