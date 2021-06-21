<template>
  <div class="create">
    <h4>{{$t("nav-create")}}</h4>
    <v-form @submit.prevent = "onSubmit"
      ref="form"
      id="create"
      v-model="valid"
      lazy-validation
      method="post"
      action="/submit"
      >
      <v-text-field
        :label="$t('create-title')"
        id="title"
        :rules="titleRules"
        class="create__title"
        v-model='title'
        required>
      </v-text-field>
      <v-text-field
        type="number"
        label="ID"
        :placeholder="$t('create-uniqId')"
        id="projectId"
        :rules="projectIdRules"
        v-model='projectId'
        required>
      </v-text-field>
      <p v-if="projectIdExist" class="create__id--exist ">{{$t("idExist")}}</p>
      <v-textarea
        :label="$t('create-description')"
        id="description"
        class="create__description"
        :rules="descRules"
        v-model='description'
        multi-line
        :placeholder="$t('max-1000')"
        required>
      </v-textarea>

      <section class="create__uploads">
        <section class="create__upload">
          <p>{{$t("photos-explain-1")}}</p>
          <button type="button" raised class="btn" @click="onPickFile1">{{$t("upload-photo")}}</button>
          <input
            type="file"
            style="display: none"
            ref="fileInput1"
            accept="image/*"
            multiple
            @change="onFilePicked_1">
          <p class="msg-error">{{ msgFileMax_1 }}</p>
          <div class="create__img">
            <img :src="url_1" alt="">
          </div>
        </section>
        <section class="create__upload">
          <p>{{$t("photos-explain-2")}}</p>
          <button type="button" raised class="btn" @click="onPickFile2">{{$t("upload-photo")}}</button>
          <input
            type="file"
            style="display: none"
            ref="fileInput2"
            accept="image/*"
            @change="onFilePicked_2">
          <p class="msg-error">{{ msgFileMax_2 }}</p>
          <div class="create__img">
            <img :src="url_2" alt="">
          </div>
        </section>
      </section>

      <h4>{{$t("create-date")}}</h4>
      <section class="create__pickers">
        <v-date-picker v-model="date"
          class="mt-2">
        </v-date-picker>
        <v-time-picker
          v-model="time"
          class="mt-2"
          format="24hr"
          >
        </v-time-picker>
      </section>
      <v-select
          class="create__currency"
          v-model="currency"
          :items="items"
          :label="$t('create-currency')"
          persistent-hint
          return-object
        >
      </v-select>
      <section class="create__outlay">
        <h4>{{$t('preliminary')}}</h4>
        <div class="create__outlay-resource create__outlay-resource--show">
          <div class="create__outlay-item">
            <v-text-field
              :label="$t('resource-name')"
              :placeholder="$t('name-placeholder')"
              v-model="dataOutlay[0].outlayName"
              class="create__outlay-cell create__outlay-cell--name"
              >
            </v-text-field>
            <v-text-field
              v-model="dataOutlay[0].outlayQuantity"
              :label="$t('resource-quantity')"
              placeholder="2"
              class="create__outlay-cell create__outlay-cell--quantity"
              >
            </v-text-field>
            <v-text-field
              type="number"
              placeholder="3250"
              v-model="dataOutlay[0].outlayPrice"
              :label="$t('resource-price')"
              class="create__outlay-cell create__outlay-cell--price"
              >
            </v-text-field>
            <!-- <span>{{currency}}</span> -->
            <div class="create__outlay-cell create__outlay-cell--sum">
              <span>{{$t('sum')}}</span>
              <span>{{multiplication(dataOutlay[0].outlayQuantity, dataOutlay[0].outlayPrice)}}</span>
            </div>
          </div>
          <v-btn class="create__outlay--add" @click="showNextResource">{{$t('add-resource')}}<v-icon medium>keyboard_arrow_down</v-icon></v-btn>
        </div>

        <div class="create__outlay-resource">
          <div class="create__outlay-item">
            <v-text-field
              :label="$t('resource-name')"

              v-model="dataOutlay[1].outlayName"
              class="create__outlay-cell create__outlay-cell--name"
              >
            </v-text-field>
            <v-text-field
              v-model="dataOutlay[1].outlayQuantity"
              :label="$t('resource-quantity')"
              class="create__outlay-cell create__outlay-cell--quantity"
              >
            </v-text-field>
            <v-text-field
              v-model="dataOutlay[1].outlayPrice"
              :label="$t('resource-price')"
              class="create__outlay-cell create__outlay-cell--price"
              >
            </v-text-field>
            <div class="create__outlay-cell create__outlay-cell--sum">
              <span>{{$t('sum')}}</span>
              <span>{{multiplication(dataOutlay[1].outlayQuantity, dataOutlay[1].outlayPrice)}}</span>
            </div>
          </div>
          <v-btn class="create__outlay--add" @click="showNextResource">{{$t('add-resource')}}<v-icon medium>keyboard_arrow_down</v-icon></v-btn>
        </div>

        <div class="create__outlay-resource">
          <div class="create__outlay-item">
            <v-text-field
              :label="$t('resource-name')"
              v-model="dataOutlay[2].outlayName"
              class="create__outlay-cell create__outlay-cell--name"
              >
            </v-text-field>
            <v-text-field
              v-model="dataOutlay[2].outlayQuantity"
              :label="$t('resource-quantity')"
              class="create__outlay-cell create__outlay-cell--quantity"
              >
            </v-text-field>
            <v-text-field
              v-model="dataOutlay[2].outlayPrice"
              :label="$t('resource-price')"
              class="create__outlay-cell create__outlay-cell--price"
              >
            </v-text-field>
            <div class="create__outlay-cell create__outlay-cell--sum">
              <span>{{$t('sum')}}</span>
              <span>{{multiplication(dataOutlay[2].outlayQuantity, dataOutlay[2].outlayPrice)}}</span>
            </div>
          </div>
          <v-btn class="create__outlay--add" @click="showNextResource">{{$t('add-resource')}}<v-icon medium>keyboard_arrow_down</v-icon></v-btn>
        </div>

        <div class="create__outlay-resource">
          <div class="create__outlay-item">
            <v-text-field
              :label="$t('resource-name')"
              v-model="dataOutlay[3].outlayName"
              class="create__outlay-cell create__outlay-cell--name"
              >
            </v-text-field>
            <v-text-field
              v-model="dataOutlay[3].outlayQuantity"
              :label="$t('resource-quantity')"
              class="create__outlay-cell create__outlay-cell--quantity"
              >
            </v-text-field>
            <v-text-field
              v-model="dataOutlay[3].outlayPrice"
              :label="$t('resource-price')"
              class="create__outlay-cell create__outlay-cell--price"
              >
            </v-text-field>
            <div class="create__outlay-cell create__outlay-cell--sum">
              <span>{{$t('sum')}}</span>
              <span>{{multiplication(dataOutlay[3].outlayQuantity, dataOutlay[3].outlayPrice)}}</span>
            </div>
          </div>
          <v-btn class="create__outlay--add" @click="showNextResource">{{$t('add-resource')}}
            <v-icon medium>keyboard_arrow_down</v-icon></v-btn>
        </div>

        <div class="create__outlay-resource">
          <div class="create__outlay-item">
            <v-text-field
              :label="$t('resource-name')"
              v-model="dataOutlay[4].outlayName"
              class="create__outlay-cell create__outlay-cell--name"
              >
            </v-text-field>
            <v-text-field
              v-model="dataOutlay[4].outlayQuantity"
              :label="$t('resource-quantity')"
              class="create__outlay-cell create__outlay-cell--quantity"
              >
            </v-text-field>
            <v-text-field
              v-model="dataOutlay[4].outlayPrice"
              :label="$t('resource-price')"
              class="create__outlay-cell create__outlay-cell--price"
              >
            </v-text-field>
            <div class="create__outlay-cell create__outlay-cell--sum">
              <span>{{$t('sum')}}</span>
              <span>{{multiplication(dataOutlay[4].outlayQuantity, dataOutlay[4].outlayPrice)}}</span>
            </div>
          </div>
        </div>
      </section>
      <button
        color="green"
        :disabled="false"
        type="submit"
        class="btn">
        {{ $t('nav-create') }}
      </button>
    </v-form>
    <v-alert
      dismissible
      v-model="error"
      error
      :value="true"
      class="alert__error"
      >
      Error: {{ error }}
    </v-alert>
    <v-alert
      error
      v-model="emptyFields"
      dismissible
      :value="true"
      class="alert__error"
      >
      {{$t('create-error')}}
    </v-alert>
    <v-alert
      dismissible
      v-model="checkValid"
      error
      :value="true"
      class="alert__error"
      >
      {{$t('create-valid')}}
    </v-alert>
    <v-alert
      dismissible
      v-model="checkId"
      error
      :value="true"
      class="alert__error"
      >
      {{$t('idExist')}}
    </v-alert>
    <v-alert
      dismissible
      v-model="success"
      type="success"
      :value="true"
      >
      {{$t('project-uploaded')}}
    </v-alert>
    <router-link to="/private-projects"
       tag="a"
       v-if="success"
       class="create__link-to-projects"
       >
     {{$t('nav-projects')}}
    </router-link>
  </div>
</template>
<script>
import VForm from 'vuetify/es5/components/VForm/VForm'
import VAlert from 'vuetify/es5/components/VAlert/VAlert'
import VTextField from 'vuetify/es5/components/VTextField/VTextField'
import VBtn from 'vuetify/es5/components/VBtn/VBtn'
import VIcon from 'vuetify/es5/components/VIcon/VIcon'
import VSelect from 'vuetify/es5/components/VSelect/VSelect'
import VTextarea from 'vuetify/es5/components/VTextarea/VTextarea'
import VDatePicker from 'vuetify/es5/components/VDatePicker/VDatePicker'
import VTimePicker from 'vuetify/es5/components/VTimePicker/VTimePicker'

export default {
  components: {
    VForm,
    VAlert,
    VTextField,
    VSelect,
    VBtn,
    VTextarea,
    VIcon,
    VDatePicker,
    VTimePicker
  },
    data() {
      return {
        msgFileMax_1: "",
        msgFileMax_2: "",
        items: ["USD", "EUR", "UAH", "RUB", "INR"],
        currency: "USD",
        dataOutlay: [
          {
            outlayQuantity: '',
            outlayPrice: '',
            outlayName: ''
          },
          {
            outlayQuantity: '',
            outlayPrice: '',
            outlayName: ''
          },
          {
            outlayQuantity: '',
            outlayPrice: '',
            outlayName: ''
          },
          {
            outlayQuantity: '',
            outlayPrice: '',
            outlayName: ''
          },
          {
            outlayQuantity: '',
            outlayPrice: '',
            outlayName: ''
          }
        ],
        descRules: [
          value => !!value || this.$i18n.t("enter-data"),
          value => (value && value.length <= 1000 ) || this.$i18n.t("max-1000"),
          value => (value && value.length >= 6 ) || this.$i18n.t("min-6"),
          ],
        valid: false,
        title: '',
        description: '',
        url_1: '',
        url_2: '',
        images: [],
        titleRules: [
        value => !!value || this.$i18n.t("enter-data"),
        value => (value && value.length >= 6) || this.$i18n.t("min-6")
        ],
        projectIdRules: [
        value => !!value || this.$i18n.t("enter-data"),
        value => (value && value.length >= 6) || this.$i18n.t("min-6")
        ],
        picker: new Date().toISOString().substr(0, 10),
        date: new Date().toISOString().substr(0, 10),
        time: new Date(),
        projectId: '',
        emptyFields: false,
        checkId: false,
        checkValid: false
      }
    },
    computed: {
      auth() {
        return this.$store.getters.userId !== null && this.$store.getters.userId !== undefined
      },
      submittableDateTime () {
        const date = new Date(this.date)
        if(typeof this.time ==='string') {
          let hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return date
      },
      error() {
        return this.$store.getters.error
      },
      success() {
        return this.$store.getters.success
      },
      projects(){
        return this.$store.getters.projects
      },
      projectIdExist(){
        if(this.projectId){
          return this.projects.find((project) =>{
            return project.projectId === this.projectId
          })
        }
      }
    },
    methods: {
      showNextResource(event) {
        const target = event.target
        const resource = target.parentNode.parentNode.nextSibling
        resource.classList.toggle('create__outlay-resource--show')
        target.parentNode.style.display = 'none'
      },
      multiplication(num, price) {
        return num * price + " " + this.currency
      },
      checkForm(){
        this.emptyFields = false
        this.checkId = false
        this.checkValid = false
        if(this.title.trim() === '' || this.description.trim() === ''  || this.projectId.trim() === '' || this.dataOutlay[0].outlayName === ''){
          this.emptyFields = true
        }
        if(this.projectIdExist){
          this.checkId = true
        }
        if(!this.valid){
          this.checkValid = true
        }
      },
      dispatch() {
        const title = this.title
        const projectId = this.projectId
        const description = this.description
        const images = this.images
        const date = this.submittableDateTime
        const currency = this.currency
        const dataOutlay = this.dataOutlay
        const createData = {
          title,
          projectId,
          description,
          images,
          date,
          currency,
          dataOutlay
        }
        if(this.emptyFields || this.checkId || this.checkValid){
          return
        } else {
          this.$store.dispatch('createProject', createData)
        }
      },
      async onSubmit(){
        try{
          await this.checkForm()
          await this.dispatch()
        } catch(e){
          console.log(e)
        }
      },
      onPickFile1(){
        this.$refs.fileInput1.click()
      },
      onPickFile2(){
        this.$refs.fileInput2.click()
      },
      onFilePicked_1(event){
        const file = event.target.files[0]
        if (file) {
          if (file.size < 500000) {
            this.images[0] = file
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
              const result = fileReader.result
              this.url_1 = result
            })
            fileReader.readAsDataURL(file)
            this.msgFileMax_1 = ""
          } else {
            this.msgFileMax_1 = this.$i18n.t('msg-file-size')
          }
        } else {
          this.msgFileMax_1 = this.$i18n.t('msg-file-empty')
        }
      },
      onFilePicked_2(event){
        const file = event.target.files[0]
        if (file) {
          if (file.size < 500000) {
            this.images[1] = file
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
              const result = fileReader.result
              this.url_2 = result
            })
            fileReader.readAsDataURL(file)
            this.msgFileMax_2 = ""
          } else {
            this.msgFileMax_2 = this.$i18n.t('msg-file-size')
          }
        } else {
          this.msgFileMax_2 = this.$i18n.t('msg-file-empty')
          }
        }
      },
      created(){
        this.$store.dispatch('tryAutoSignin')
        this.$store.dispatch('loadProjects')
        this.$store.commit('setError',{status: false})
        this.$store.commit('setSuccess',{status: false})
      },
      mounted(){
        if(!this.projects || this.projects.length === 0){
          this.$store.dispatch('logout')
        }
      }
};
</script>

