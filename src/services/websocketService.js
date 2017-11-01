import store from './../store/index'
import Stomp from '@stomp/stompjs/lib/stomp'
import props from '../props'
import Cookies from './userService'

export default class WebSocketService {
  static connect (callbacks = []) {
    if (!store.wsClient || !store.wsClient.connected) {
      let stomp = Stomp.Stomp // another workaround
      let socket = new WebSocket(props.ws_uri + '/messages')
      let client = stomp.over(socket)
      let token = Cookies.getToken('token')
      client.debug = null // disable debug logs
      client.connect({'x-auth-token': token}, function (frame) {
        console.log(frame.toString())
        store.commit('initWSClient', {
          connected: true,
          client
        })
        callbacks(client)
      }, function (err) {
        console.log('failed to connect to the websocket', err)
        store.commit('disconnected')
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
}
