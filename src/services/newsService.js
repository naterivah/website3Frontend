import axios from 'axios'
import props from './../props'
// import UserService from './userService'
export default class NewsService {
  static allNews (page) {
    return axios.get(props.backend_uri + '/news/all', {
      params: {
        page: page.number,
        size: page.size
      }
    })
  }
  static newsById (id) {
    return axios.get(`${props.backend_uri}/news/${id}`)
  }
}
