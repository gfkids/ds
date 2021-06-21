<template>
  <footer class="footer">
    <div class="footer__content">
      <router-link to="/">
        <logo></logo>
      </router-link>
      <p>Cooperative activities</p>
    </div>
  </footer>
</template>

<script>
import Logo from '../header/Logo.vue'


export default {
  components: {
    Logo
  }
};
</script>
<style lang="sass">
  @import "@/sass/_footer.sass"
</style>
