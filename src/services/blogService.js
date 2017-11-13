import axios from 'axios'
import props from './../props'
export default class BlogService {
  static allPosts (page) {
    return axios.get(props.backend_uri + '/blog/posts', {
      params: {
        page: page.number,
        size: page.size
      }
    })
  }
  static postById (id) {
    return axios.get(`${props.backend_uri}/blog/post/${id}`)
  }
  static categories () {
    return axios.get(`${props.backend_uri}/blog/all-categories`)
  }
}
