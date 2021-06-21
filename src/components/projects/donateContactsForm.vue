<template>
  <div class="project__participation">
    <h4>{{$t('donate-contacts')}}</h4>
    <p v-if="userIsCreator">{{$t('example-contacts-author')}}</p>
    <p v-if="!userIsCreator">{{$t('example-contacts-user')}}</p>
    <div  >
      <v-form v-model="valid" @submit.prevent = "sendContact">
        <v-text-field
          type="text"
          :label="$t('nickname')"
          :rules="pseudoRules"
          placeholder="Erik 38"
          id="pseudo"
          v-model='pseudo'
          :title="$t('title-nick')"
          required>
        </v-text-field>
        <v-text-field
          type="text"
          :label="$t('contacts-label')"
          :rules="contactRules"
          placeholder="WhatsApp: +447 356 78 90"
          @focus="cleanStatus"
          id="contact"
          class="donor__contact"
          v-model="contact"
          lazy-validation
          color="green"
          required>
        </v-text-field>
        <!-- <p class="donor__usernick">{{ userNick }}</p> -->
        <v-checkbox  color="green"
          id="terms"
          v-model="terms"
          :rules="switchRules"
          required>
          <div slot="label">
            <router-link to="/terms"
               class="header__top-link"
               >
            {{ $t('agreement') }}
            </router-link>
          </div>
        </v-checkbox>
        <button class="btn"
                type="submit"
                :disabled="!terms"
                >
              {{$t('send')}}
        </button>
        <v-alert
          dismissible
          error
          @input='onDismissed'
          :value="true"
          class="alert__error"
          v-if="!terms"
          >
          {{$t('agreed')}}
        </v-alert>
      </v-form>

      <v-alert
        dismissible
        v-model="successSent"
        type="success"
        :value="true"
        >
        {{$t('contacts-sent')}}
      </v-alert>
      <v-alert
        dismissible
        v-model="filling"
        type="error"
        :value="true"
        >
        {{$t('create-valid')}}
      </v-alert>
      <v-alert
        dismissible
        v-if="error"
        error
        :value="true"
        >
        {{ error }}
      </v-alert>
    </div>
  </div>
</template>

<script>
import VForm from 'vuetify/es5/components/VForm/VForm'
import VAlert from 'vuetify/es5/components/VAlert/VAlert'
import VTextField from 'vuetify/es5/components/VTextField/VTextField'
import VCheckbox from 'vuetify/es5/components/VCheckbox/VCheckbox'

  export default {
    components: {
      VForm,
      VTextField,
      VAlert,
      VCheckbox
    },
    props: {
      id: String
    },
    data() {
      return {
        successSent: false,
        filling: false,
        valid: true,
        contact: '',
        pseudo: '',
        contactActive: '',
        contactRules: [
          v => !!v || this.$i18n.t("enter-data"),
          v => (v && v.length >= 6) || this.$i18n.t("min-6")
        ],
        pseudoRules: [
          v => !!v || this.$i18n.t('enter-data')
        ],
        switchRules: [
          v => !!v || ''
        ],
        terms: true
      }
    },
    computed: {
      empty(){
        return this.contact.trim() === ''
      },
      project() {
        return this.$store.getters.project(this.id)
      },
      userIsCreator(){
        if(this.project && this.$store.getters.userId){
          return this.$store.getters.userId === this.project.creatorId
        }
        return false
      },
      error(){
        return this.$store.getters.error
      }
    },
    methods: {
      onDismissed() {
        this.$store.dispatch('clearError')
      },
      cleanStatus(){
        this.$store.commit('setError',{status: false})
        this.$store.commit('setSuccess',{status: false})
      },
      sendContact(){
        const contactsData = {
          contact: this.contact,
          nickname: this.pseudo,
          id: this.id
        }
        if(!this.valid){
          this.filling = true
          return
        } else {
          this.$store.dispatch('editProject', contactsData)
          this.successSent = true
        }
        this.cleanStatus()
      }
    },
    created(){
      this.$store.commit('setError',{status: false})
      this.$store.commit('setSuccess',{status: false})
    }
  };
</script>

