import axios from 'axios'
import props from './../props'

export default class UploadService {
  static fetchUploadAsync (uuid) {
    return axios.get(props.backend_uri + '/upload', {uuid: uuid}, {})
  }
  static getUrlFileOnly (uuid) {
    return props.backend_uri + '/upload/get/' + uuid
  }
}
