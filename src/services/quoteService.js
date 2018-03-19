import axios from 'axios'
import props from './../props'

export default class QuoteService {
  static random () {
    return axios.get(props.backend_uri + '/quote/random', {})
  }
}
