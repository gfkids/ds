<template>
  <v-app>
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import Header from './components/header/Header.vue'
import Footer from './components/footer/Footer.vue'

export default {
  components: {
    'app-header': Header,
    'app-footer': Footer
  },
  computed: {
    auth() {
      return this.$store.getters.userId !== null && this.$store.getters.userId !== undefined
    }
  },
  created() {
    this.$i18n.locale = 'ru'
    this.$store.dispatch('tryAutoSignin')
    this.$vuetify.theme.green = "#4CAF50"
    this.$vuetify.theme.primary = "#4CAF50"
    this.$vuetify.theme.greendarken4 = "#1B5E20"
  },
};
</script>

<style lang="sass">
  @import "@/sass/_dialogs.sass"
  @import "@/sass/_project.sass"
  @import "@/sass/_create.sass"
</style>

