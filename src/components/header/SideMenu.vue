<template>
  <div class="side">
    <nav>
      <ul @click="emitShowMenu">
        <router-link to="/signin"
                     tag="li"
                     v-if="!auth"
                     class="side__link"
                     >
        {{ $t('nav-signin') }}
        </router-link>
        <router-link to="/signup"
                     tag="li"
                     v-if="!auth"
                     class="side__link"
                     >
        {{ $t('nav-signup') }}
        </router-link>
        <router-link to="/project/new"
                     tag="li"
                     class="side__link"
                     >
        {{ $t('nav-create') }}
        </router-link>
        <router-link to="/private-projects"
                     tag="li"
                     class="side__link"
                     >
        {{ $t('nav-projects') }}
        </router-link>
        <router-link to="/contacts"
                     tag="li"
                     class="side__link"
                     >
        {{ $t('nav-contacts') }}
        </router-link>
        <li v-if="auth"
            @click="onLogout"
            class="side__link side__logout"
            >
            <span>
              {{ $t('nav-logout') }}
            </span>
        </li>
        <!-- v-if="userIsCreator" -->
        <router-link to="/user-page"
           tag="li"
           class="side__link"
           >
           {{ $t('nav-user') }}
        </router-link>
      </ul>
    </nav>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    userIsCreator(){
      return this.$store.getters.projects.find((project) =>{
        return project.creatorId == this.$store.getters.userId
      })
    },
    auth() {
      return this.$store.getters.userId !== null && this.$store.getters.userId !== undefined
    }
  },
  methods: {
    emitShowMenu(){
      this.$emit("emitShowMenu")
    },
    onLogout() {
      this.$store.dispatch('logout')
    }
  }
};
</script>
<style lang="sass">
  @import "@/sass/_side-menu.sass"
</style>
