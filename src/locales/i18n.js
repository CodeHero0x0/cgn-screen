import Vue from 'vue'
import VueI18n from 'vue-i18n'
/*element ui国际化*/
import locale from 'element-ui/lib/locale'
import messages from './index' // 多语言文字入口

Vue.use(VueI18n)


let langNow
if (localStorage.lang) {
  langNow = localStorage.lang
} else {
  let lang = navigator.language || navigator.userLanguage // 常规浏览器语言和IE浏览器
  lang = lang.substr(0, 2) // 截取lang前2位字符
  localStorage.lang = lang
  langNow = lang
}

const i18n = new VueI18n({
  locale: langNow,
  messages,
})

locale.i18n((key, value) => i18n.t(key, value)) // 为了实现element插件的多语言切换


export default i18n
