import Vue from 'vue'
import * as marked from 'marked'
import * as hljs from 'highlight.js'
export default class MarkdownService {
  constructor () {
    marked.setOptions({
      langPrefix: 'hljs ',
      highlight: function (code) {
        return hljs.highlightAuto(code).value
      }
    })
    Vue.prototype.$marked = function (val) {
      return marked(val)
    }
  }

}
Vue.use(new MarkdownService())
