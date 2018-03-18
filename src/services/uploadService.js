import axios from 'axios'
import props from './../props'

export default class UploadService {
  static fetchUpload (uuid) {
    return axios.get(props.backend_uri + '/upload', {uuid: uuid}, {})
  }
}
