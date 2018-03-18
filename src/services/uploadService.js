import axios from 'axios'
import props from './../props'

export default class UploadService {
  static fetchUploadAsync (uuid) {
    return axios.get(props.backend_uri + '/upload', {uuid: uuid}, {})
  }

  static getUrlFileOnly (uuid) {
    return props.backend_uri + '/upload/get/' + uuid
  }

  // create an object to be used with gallery
  static imageThumb (upload) {
    let urlThumbnail = UploadService.getUrlFileOnly(upload.uuid)
    let urlFullsize = UploadService.getUrlFileOnly(upload.uuid.replace('-thumb', ''))
    return {
      src: urlFullsize,
      thumb: urlThumbnail,
      w: upload.originalWidth,
      h: upload.originalHeight
    }
  }
  // create an object to be used with gallery
  static imageWithoutThumb (upload) {
    let urlFullsize = UploadService.getUrlFileOnly(upload.uuid.replace('-thumb', ''))
    return {
      src: urlFullsize,
      thumb: urlFullsize,
      w: upload.originalWidth,
      h: upload.originalHeight
    }
  }
}
