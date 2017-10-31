import axios from 'axios'
import props from './../props'
// import UserService from './userService'
export default class NewsService {
  static allNews () {
    return axios.get(props.backend_uri + '/news/all')
  }
}
