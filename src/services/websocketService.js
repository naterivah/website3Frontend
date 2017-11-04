import store from './../store/index'
import Stomp from '@stomp/stompjs/lib/stomp'
import props from '../props'
import Cookies from './userService'
import Vue from 'vue'

export default class WebSocketService {
  constructor () {
    this.stomp = Stomp.Stomp
    this.connected = false
    this.socket = null
    this.client = null
  }
  connect (callbacks = []) {
    this.socket = new WebSocket(props.ws_uri + '/messages')
    this.client = this.stomp.over(this.socket)
    this.token = Cookies.getToken('token')
    this.client.connect({'x-auth-token': this.token}, function (frame) {
      console.log(frame.toString())
      this.connected = true
      callbacks.forEach(callback => callback(this.client))
    }, function (err) {
      console.log('failed to connect to the websocket', err)
      this.disconnect()
    })
  }
  disconnect (disconnectCallback = () => { console.log('disconnected! bye bye') }) {
    this.client.disconnect(disconnectCallback, {})
    this.client = null
    this.connected = false
  }
  subscribe (callbacks = []) {
    if (!this.client || !this.connected) {
      this.connect(callbacks)
    } else {
      callbacks.forEach((callback) => callback(this.client))
    }
  }
  subscription (endpoint, callback) {
    this.client.subscribe(endpoint, callback, {'x-auth-token': this.token})
  }
}
const WebSocketPlugin = new WebSocketService()

WebSocketPlugin.install = function (Vue) {
  Vue.prototype.$connectToWebSocketAndSubscribe = function () {
    WebSocketPlugin.subscribe([
      (client) => {
        WebSocketPlugin.subscription('/topic/news', function (d) {
          store.commit('refreshNews', JSON.parse(d.body))
        })
      }
    ])
  }

  Vue.prototype.$reconnectToWebSocketAndSubscribe = function () {
    WebSocketPlugin.disconnect()
    Vue.prototype.$connectToWebSocketAndSubscribe()
  }

  Vue.prototype.$connectToWebSocketAndSubscribe()
}

Vue.use(WebSocketPlugin)
