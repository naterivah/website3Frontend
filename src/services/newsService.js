import axios from 'axios'
import props from './../props'
export default class NewsService {
  static allNews (page) {
    return axios.get(props.backend_uri + '/news/all', {
      params: {
        page: page.number,
        size: page.size
      }
    })
  }

  static tags () {
    return axios.get(`${props.backend_uri}/tags/all`)
  }
  static newsByIdAndSlug (id,slug) {
    return axios.get(`${props.backend_uri}/news/${slug}-${id}`)
  }
  static categories () {
    return axios.get(`${props.backend_uri}/category/all-categories`)
  }
}
