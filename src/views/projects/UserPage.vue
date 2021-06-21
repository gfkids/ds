<template>
  <div class="user-page">
    <h1 >{{ $t('user-page') }}</h1>
    <p  v-if="!project">{{ $t('user-page-empty') }}</p>
    <section v-if="project">
      <div class="user-page__user-data">
        <h4>{{ $t('user-data') }}</h4>
        <span>Nickname: </span><p> {{ user.pseudo }}</p>
        <span>Project: </span><p>{{ project.title }}</p>
        <span>Project ID: </span><p>{{ project.projectId }}</p>
        <p>{{ $t('edit-explain') }}</p>
      </div>
      <h4>{{ $t('contacts-data') }}</h4>
      <div v-for="(contact, index) in contacts"
          :key="index">
        <div class="donors__block">
          <div class="donors__row donors__row--user-page">
            <div class="donors__cell">{{ contact.nickname }} </div>
            <div class="donors__cell">{{ contact.contact }}</div>
          </div>
          <div class="donors__row donors__row--user-page">
            <v-text-field
              class="donors__cell donors__cell--donation"
              type="text"
              v-model="contact.donation"
              :label="$t('donation')"
              :title="$t('contacts-title')"
              >
            </v-text-field>
            <v-btn class="user-page__savePublicBtn" @click="saveToPublic(index)">{{ saveBtn(index) }} </v-btn>
          </div>
        </div>
      </div>
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
        project: [],
      }
    },
    computed: {
      // Only first project shows
      // Project will be deleted after 3 month
      user () {
        return this.$store.getters.user
      },
      contacts () {
        if(this.project){
          return this.project.contacts
        }
      }
    },
    methods: {
      saveBtn(index){
        if(this.contacts[index].donation !== undefined && this.contacts[index].donation !== ''){
          return this.$i18n.t('save-new')
        } else {
          return this.$i18n.t('save-to-public')
        }
      },
      saveToPublic(index){
        if(!this.contacts[index].donation){
          alert(this.$i18n.t('enter-data'))
          return
        }
        const publicList = {
          donation: this.contacts[index].donation,
          nickname: this.contacts[index].nickname,
          contact: this.contacts[index].contact,
          id: this.contacts[index].id,
          index: index
        }
        this.$store.dispatch('editProject',
          publicList
        )
        const target = event.target
        target.innerHTML = this.$i18n.t('saved') + this.contacts[index].donation
        target.parentNode.style.border = "2px solid green"
        target.style.color = "green"
        setTimeout(()=>{
          target.innerHTML = this.$i18n.t('save-new')
          target.parentNode.style.border = "none"
          target.style.color = "inherit"
        }, 3000)
      },
    },
    created(){
      this.project = this.$store.getters.projects.find((project) =>{
        return project.creatorId === this.$store.getters.userId
      })
    }
  };
</script>

<style lang="sass">
  @import "@/sass/_user-page.sass"
</style>
