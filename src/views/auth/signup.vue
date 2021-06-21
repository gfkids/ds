<template>
  <section class="signup">
    <h1>{{$t('nav-signup')}}</h1>
    <v-form @submit.prevent = "onSubmit"
      ref="form"
      id="signup"
      v-model="valid"
      lazy-validation
      method="post"
      action=" /submit"
      >
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
        type="email"
        :rules="emailRules"
        :label="$t('email')"
        id="email"
        v-model='email'
        required
        >
      </v-text-field>
      <v-text-field
        :type="passwordType"
        :rules="passwordRules"
        :label="$t('password')"
        id="password"
        v-model='password'
        :append-icon="hidePassword ? 'visibility_off' : 'visibility'"
        @click:append="hidePassword = !hidePassword"
        required>
      </v-text-field>
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
      <button
             :disabled="!valid || !terms"
             type="submit"
             class="btn"
             >
        {{$t('nav-signup')}}
      </button>
      <v-alert
        dismissible
        error
        @input='onDismissed'
        :value="true"
        class="alert__error"
        v-if="error"
        >
        {{$t('email-exist')}}
      </v-alert>
      <v-alert
        dismissible
        error
        @input='onDismissed'
        :value="true"
        class="alert__error"
        v-if="!valid"
        >
        {{$t('agreed')}}
      </v-alert>
    </v-form>
  </section>
</template>

<script>
import VForm from 'vuetify/es5/components/VForm/VForm'
import VAlert from 'vuetify/es5/components/VAlert/VAlert'
import VTextField from 'vuetify/es5/components/VTextField/VTextField'
import VCheckbox from 'vuetify/es5/components/VCheckbox/VCheckbox'

export default {
  components: {
    VForm,
    VAlert,
    VTextField,
    VCheckbox
  },
  data() {
    return {
      password: '',
      hidePassword: true,
      valid: false,
      pseudoRules: [
        v => !!v || this.$i18n.t('enter-data')
      ],
      passwordRules: [
        v => !!v || this.$i18n.t('enter-data'),
        v => (v && v.length >= 6) || this.$i18n.t('min-6')
      ],
      emailRules: [
        v => !!v || this.$i18n.t('enter-data'),
        v => /.+@.+/.test(v) || this.$i18n.t('valid-email'),
        v => (v && v.length >= 8) || this.$i18n.t('valid-email')
      ],
      switchRules: [
        v => !!v || ''
      ],
      terms: false,
      errors: [],
      projects: '',
      pseudo: '',
      email: '',
    }
  },
  methods: {
    onDismissed() {
      this.$store.dispatch('clearError')
    },
    onSubmit() {
      const pseudo = this.pseudo
      const email = this.email
      const password = this.password
      const registeredProjects = []
      const signupData = {
        pseudo,
        email,
        password,
        registeredProjects
      }
      this.$store.dispatch('signup', signupData)
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    passwordType() {
      return this.hidePassword ? 'password' : 'text'
    },
    user() {
      return this.$store.getters.userId
    }
  }
};
</script>

<style lang="sass">
  @import "@/sass/_auth.sass"
</style>
