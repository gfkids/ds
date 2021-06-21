<template>
  <div class="private-projects">
    <h1>{{ $t('nav-projects') }}</h1>
    <p>{{ $t('projects-enter') }}</p>
    <v-text-field
      type="text"
      :rules="numberRules"
      label="ID (for test - 111111)"
      id="projectId"
      v-model='projectId'
      @focus="loadProjects"
      >
    </v-text-field>
    <section v-if="project" class="private-projects__project">
      <div class="private-projects__project-title">{{ project.title }}</div>
      <div class="private-projects__project-date"> {{ project.date | date }}</div>
      <!-- <div class="private-projects__project-description">{{ project.description }}</div> -->
      <router-link :to="'/private-projects/' + project.id"
        :project="project"
        tag="button"
        class="btn private-projects__project-btn"
        >{{ $t('view-project') }}
      </router-link>
    </section>
  </div>
</template>

<script>
import VTextField from 'vuetify/es5/components/VTextField/VTextField'
  export default {
    components: {
      VTextField
    },
    data() {
      return {
        numberRules: [
        value => !!value || 'Enter the project ID',
        value => (value && value.length >= 6) || 'ID must be at least 6 symbols'
      ],
        projectId: ''
      }
    },
    computed: {
      projects(){
        return this.$store.getters.projects
      },
      loading(){
        return this.$store.getters.loading
      },
      project(){
        return this.projects.find((project) =>{
          return project.projectId === this.projectId
        })
      }
    },
    methods: {
      loadProjects(){
        this.$store.dispatch('loadProjects')
      }
    },
    created() {
      this.$store.dispatch('resizeImages')
    }
  };
</script>

<style lang="sass">
  @import "@/sass/_private-projects.sass"
</style>
