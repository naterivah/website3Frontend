import store from './../store/index'
import Stomp from '@stomp/stompjs/lib/stomp'
import props from '../props'
import Cookies from './userService'

export default class WebSocketService {
  static connect () {
    if (!store.wsClient || !store.wsClient.connected) {
      let stomp = Stomp.Stomp // another workaround
      let socket = new WebSocket(props.ws_uri + '/messages')
      let client = stomp.over(socket)
      client.debug = null // disable debug logs
      client.connect({ 'x-auth-token': Cookies.getToken('token') }, function (frame) {
        console.log(frame.toString())
        WebSocketService.subscribeCallback()
      })
      store.commit('initWSClient', client)
    }
  }
  static subscribeCallback () {
    store.state.wsClient.subscribe('/topic/news', function (d) {
      store.commit('updateNews', JSON.parse(d.body))
    }, { 'x-auth-token': Cookies.getToken('token') })
  }
}
