import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '../langs/en.json'
import ru from '../langs/ru.json'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'ru',
  fallbackLocale: 'ru',
  messages: {
    en,
    ru
  }
})
