import store from './../store/index'
import Stomp from '@stomp/stompjs/lib/stomp'
import props from '../props'
import Cookies from './userService'
import Vue from 'vue'

export default class WebSocketService {

  static connect (callback = (client) => console.log('no subscription by default.')) {
    if (!store.webSocket || !store.webSocket.connected) {
      let stomp = Stomp.Stomp
      let socket = new WebSocket(props.ws_uri + '/messages')
      let client = stomp.over(socket)
      let token = Cookies.getToken('token')
      client.debug = null
      client.connect({'x-auth-token': token}, function (frame) {
        console.log(frame.toString())
        store.commit('initWSClient', {connected: true, client})
        callback(client)
      }, function (err) {
        console.log('failed to connect to the websocket', err)
        WebSocketService.disconnect()
      })
    }
  }

  static subscribe (callbacks) {
    let socket = store.state.webSocket
    let callbacksCaller = (client) => callbacks.forEach((callback) => callback(client))
    if (!socket.connected) {
      WebSocketService.connect(callbacksCaller)
    } else {
      callbacksCaller(socket.client)
    }
  }

  static subscription (client, endpoint, callback) {
    let token = Cookies.getToken('token')
    client.subscribe(endpoint, callback, {'x-auth-token': token})
  }

  static disconnect (disconnectCallback = () => { console.log('disconnected! bye bye') }) {
    let socket = store.state.webSocket
    if (socket.connected) {
      socket.client.disconnect(disconnectCallback, {})
      store.commit('disconnected')
    }
  }
}

WebSocketService.install = function (Vue) {
  Vue.prototype.$connectToWebSocketAndSubscribe = function () {
    WebSocketService.subscribe([
      (client) => {
        WebSocketService.subscription(client, '/topic/news', function (d) {
          store.commit('refreshNews', JSON.parse(d.body))
        })
      }
    ])
  }
  Vue.prototype.$reconnectToWebSocketAndSubscribe = function () {
    WebSocketService.disconnect()
    this.$connectToWebSocketAndSubscribe()
  }
  Vue.prototype.$connectToWebSocketAndSubscribe() // on exécute le code une fois au démarrage
}
Vue.use(WebSocketService)
