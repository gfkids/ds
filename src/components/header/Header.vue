<template>
  <header class="header"  >
    <div
      class="header__progress"
      color="green"
      v-if="loading"
    ></div>
    <div class="header__top">
      <side :class="{side__show: isOpen}"
        @emitShowMenu="showMenu"
        >
      </side>
      <div class="side-logo">
        <button class="side-icon"
          @click="showMenu"
          >
        </button>
        <router-link to="/">
          <logo></logo>
        </router-link>
      </div>
      <nav class="header__top-nav">
        <ul>
          <router-link to="/project/new"
             tag="li"
             class="header__top-link"
             >
          {{ $t('nav-create') }}
          </router-link>
          <router-link to="/private-projects"
             tag="li"
             class="header__top-link"
             >
          {{ $t('nav-projects') }}
          </router-link>
          <router-link to="/signup"
                       tag="li"
                       class="header__top-link"
                       v-if="!auth"
                       >
          {{ $t('nav-signup') }}
          </router-link>
          <router-link to="/signin"
                       tag="li"
                       class="header__top-link"
                       v-if="!auth"
                       >
          {{ $t('nav-signin') }}
          </router-link>
          <li class="header__nav-logout header__top-link" v-if="auth"
            @click="onLogout"
            >
            <span>
              {{ $t('nav-logout') }}
            </span>
          </li>
        </ul>
      </nav>
      <div class="header__lang">
        <span>Language</span>
        <select v-model="selected"  @change="setLocale" label="Language">
          <option  style="height: 30px">English </option>
          <option selected style="height: 30px">Russian </option>
        </select>
      </div>
    </div>
    <div :class="{overlay__show: isActive}"
          class="overlay"
          @click="showMenu"></div>


  </header>
</template>

<script>
import Logo from './Logo.vue'
import SideMenu from './SideMenu.vue'

export default {
  components: {
    Logo,
    "side": SideMenu
  },
  data () {
    return {
      isActive: false,
      isOpen: false,
      selected: 'Russian',
      languages: ['English','Russian'],
      locale: 'ru'
    }
  },
  computed: {
    auth() {
      return this.$store.getters.userId !== null && this.$store.getters.userId !== undefined
    },
    loading(){
      return this.$store.getters.loading
    },
    projects(){
      return this.$store.getters.projects
    }
  },
  methods: {
    setLocale(){
      if (this.selected === 'English'){
        import('../../langs/en.json').then(msgs =>{
          this.$i18n.setLocaleMessage('en', msgs)
          this.$i18n.locale = 'en'
        })
        this.locale = 'en'
      } else if (this.selected === 'Russian') {
        import('../../langs/ru.json').then(msgs =>{
          this.$i18n.setLocaleMessage('ru', msgs)
          this.$i18n.locale = 'ru'
        })
        this.locale = 'ru'
      }
      this.$store.dispatch('initOutlay', this.locale)
    },
    showMenu() {
      this.isOpen = !this.isOpen
      this.isActive = !this.isActive
    },
    onLogout() {
      this.$store.dispatch('logout')
    }
  },
  created () {
    this.setLocale()
    if(!this.$store.getters.user){
      this.$store.dispatch('logout')
    }
  }
};
</script>

<style lang="sass">
  @import "@/sass/_header.sass"
</style>
