<template>
  <div class="project__participation">
    <h4>{{$t('donate-contacts')}}</h4>
    <p>{{$t('example-contacts')}}</p>
    <div  >
      <v-form v-model="valid">
        <v-text-field
          type="text"
          :label="$t('contacts-label')"
          :rules="contactRules"
          placeholder="WhatsApp: +447 356 78 90"
          id="contact"
          class="donor__contact"
          v-model="contact"
          lazy-validation
          color="green"
          required>
        </v-text-field>
        <button class="btn"
                @click="sendContact"
                :disabled="!valid">
              {{$t('send')}}
        </button>
      </v-form>
      <v-alert
        dismissible
        type="success"
        :value="true"
        v-if="success"
        >
        Thank you! Your contact is sent.
      </v-alert>
      <v-alert
        dismissible
        error
        :value="true"
        v-if="error"
        >
        Check again, something is wrong!
      </v-alert>
    </div>
  </div>
</template>

<script>
import VForm from 'vuetify/es5/components/VForm/VForm'
import VAlert from 'vuetify/es5/components/VAlert/VAlert'
import VTextField from 'vuetify/es5/components/VTextField/VTextField'
  export default {
    components: {
      VForm,
      VTextField,
      VAlert
    },
    data() {
      return {
        valid: false,
        contact: '',
        contactActive: '',
        contactRules: [
          value => !!value || this.$i18n.t("enter-data"),
          value => (value && value.length >= 6) || this.$i18n.t("min-6")
        ],
      }
    },
    computed: {
      success(){
        return this.$store.getters.success
      },
      error(){
        return this.$store.getters.error
      }
    },
    methods: {
      sendContact(){
        alert(this.$i18n.t("demo"))
      }
    },
    created(){
      this.$store.state.success = false,
      this.$store.state.error = false
    }
  };
</script>

