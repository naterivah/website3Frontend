import Vue from 'vue'
import * as marked from 'marked'
import * as hljs from 'highlight.js'
export default class MarkdownService {
  install (Vue) {
    marked.setOptions({
      langPrefix: 'hljs ',
      highlight: function (code) {
        return hljs.highlightAuto(code).value
      }
    })
  }
  constructor () {
    Vue.prototype.$marked = function (val) {
      return marked(val)
    }
  }

}
Vue.use(new MarkdownService())
