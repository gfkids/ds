<template>
  <div >
    <section class="private-project">
      <v-card v-if="project">
        <v-card-title>
          <h3 class="private-project__title">{{ project.title }}</h3>
        </v-card-title>
        <template  v-if="userIsCreator">
          <div class="private-project__edit-icons">
            <app-dialog-edit-project :project="project" @imageUrl="urlUpdate">
            </app-dialog-edit-project>
            <v-btn class="delete-icon" @click="deleteProject" color="green">
              <v-icon >delete</v-icon>
              <span>{{ $t('delete') }}</span>
            </v-btn>
          </div>
        </template>

        <v-card-text class="private-project__desc" style="white-space: pre-line">
          {{ project.description }}
        </v-card-text>

        <template  v-if="userIsCreator">
          <div class="private-project__edit-date">
            <app-dialog-edit-date :project="project">
            </app-dialog-edit-date>
            <app-dialog-edit-time :project="project">
            </app-dialog-edit-time>
          </div>
        </template>
        <v-card-text class="private-project__date">
          {{ project.date | date }}
        </v-card-text>
        <section class="private-project__pre-photos">
          <div class="private-project__pre-photo">
            <h4>{{ $t('current-view') }}</h4>
            <v-img class="outlay-photo outlay-photo--1"
               :src="currentImage"
               aspect-ratio="1.618"
               alt="final-photo-1"
               v-if="currentImage"
               >
            </v-img>
          </div>
          <div class="private-project__pre-photo">
            <h4>{{ $t('project-view') }}</h4>
            <v-img class="outlay-photo outlay-photo--1"
               :src="projectImage"
               aspect-ratio="1.618"
               alt="final-photo-1"
               v-if="projectImage"
               >
            </v-img>
          </div>
        </section>


        <h2>{{$t('preliminary')}}</h2>
        <div class="private-project__edit-icons" v-if="userIsCreator">
          <app-dialog-edit-project-outlay :project="project">
          </app-dialog-edit-project-outlay>
          <v-btn class="delete-icon" @click="deleteOutlay" color="green">
            <v-icon >delete</v-icon>
            <span>{{ $t('delete') }}</span>
          </v-btn>
        </div>
        <section class="outlay" v-if="project.dataOutlay">
          <div class="outlay__row outlay__row--head"
               v-html="$t('table-head-final')">
          </div>

          <div class="outlay__row" v-if="project.dataOutlay[0].outlayName">
            <span>{{ dataOutlay[0].outlayName }}</span>
            <span>{{ dataOutlay[0].outlayQuantity }}</span>
            <span>{{ dataOutlay[0].outlayPrice }} {{ project.currency }}</span>
            <span>{{multiplication(dataOutlay[0].outlayQuantity, dataOutlay[0].outlayPrice)}}</span>
          </div>
          <div class="outlay__row" v-if="project.dataOutlay[1].outlayName">
            <span>{{ dataOutlay[1].outlayName }}</span>
            <span>{{ dataOutlay[1].outlayQuantity }}</span>
            <span>{{ dataOutlay[1].outlayPrice }} {{ project.currency }}</span>
            <span>{{multiplication(dataOutlay[1].outlayQuantity, dataOutlay[1].outlayPrice)}}</span>
          </div>
          <div class="outlay__row" v-if="project.dataOutlay[2].outlayName">
            <span>{{ dataOutlay[2].outlayName }}</span>
            <span>{{ dataOutlay[2].outlayQuantity }}</span>
            <span>{{ dataOutlay[2].outlayPrice }} {{ project.currency }}</span>
            <span>{{multiplication(dataOutlay[2].outlayQuantity, dataOutlay[2].outlayPrice)}}</span>
          </div>
          <div class="outlay__row" v-if="project.dataOutlay[3].outlayName">
            <span>{{ dataOutlay[3].outlayName }}</span>
            <span>{{ dataOutlay[3].outlayQuantity }}</span>
            <span>{{ dataOutlay[3].outlayPrice }} {{ project.currency }}</span>
            <span>{{multiplication(dataOutlay[3].outlayQuantity, dataOutlay[3].outlayPrice)}}</span>
          </div>
          <div class="outlay__row" v-if="project.dataOutlay[4].outlayName">
            <span>{{ dataOutlay[4].outlayName }}</span>
            <span>{{ dataOutlay[4].outlayQuantity }}</span>
            <span>{{ dataOutlay[4].outlayPrice }} {{ project.currency }}</span>
            <span>{{multiplication(dataOutlay[4].outlayQuantity, dataOutlay[4].outlayPrice)}}</span>
          </div>
          <div class="outlay__row outlay__row--sum">
            <span>{{$t('sum')}}</span>
            <span></span>
            <span></span>
            <span>{{sum}} {{ project.currency }}</span>
          </div>
        </section>

        <donate-contacts-form :id="id"></donate-contacts-form>
        <project-donors :id="id" :sum="sum"></project-donors>

        <h2>{{$t('final-outlay')}}</h2>
        <p v-if="!project.dataFinal && userIsCreator" class="outlay__message">{{$t('creator-final')}} </p>
        <p v-if="!project.dataFinal && !userIsCreator" class="outlay__message">{{$t('user-final')}}</p>
        <div class="private-project__edit-icons" v-if="userIsCreator">
          <app-dialog-edit-project-final :project="project" @imageUrlFinal="urlUpdateFinal">
          </app-dialog-edit-project-final>
          <v-btn class="delete-icon" @click="deleteFinalOutlay" color="green">
            <v-icon >delete</v-icon>
            <span>{{ $t('delete') }}</span>
          </v-btn>
        </div>
        <final-outlay :id="id" :imagesBase="imagesBase"></final-outlay>

        <h2>{{$t('photos')}}</h2>
        <p v-if="!project.dataPhotos && userIsCreator" class="outlay__message">{{$t('creator-photo')}}</p>
        <p v-if="!project.dataPhotos && !userIsCreator" class="outlay__message">{{$t('user-photo')}} </p>
        <div class="private-project__edit-icons" v-if="userIsCreator">
          <app-dialog-edit-project-photos :project="project" @photoBaseUrl="photoBaseUrl">
          </app-dialog-edit-project-photos>
          <v-btn class="delete-icon" @click="deletePhotos" color="green">
            <v-icon >delete</v-icon>
            <span>{{ $t('delete') }}</span>
          </v-btn>
        </div>

        <final-photos v-if="project.dataPhotos" :id="id" :photosBase="photosBase"></final-photos>

      </v-card>
    </section>
  </div>
</template>
<script>
import DialogProjectEdit from './../../components/dialogs/DialogProjectEdit.vue'
import DialogProjectEditOutlay from './../../components/dialogs/DialogProjectEditOutlay.vue'
import DialogProjectEditFinal from './../../components/dialogs/DialogProjectEditFinal.vue'
import DialogProjectEditPhotos from './../../components/dialogs/DialogProjectEditPhotos.vue'
import DialogProjectEditDate from './../../components/dialogs/DialogProjectEditDate.vue'
import DialogProjectEditTime from './../../components/dialogs/DialogProjectEditTime.vue'
import FinalOutlay from './../../components/projects/FinalOutlay.vue'
import FinalPhotos from './../../components/projects/FinalPhotos.vue'
import donateContactsForm from '../../components/projects/donateContactsForm.vue'
import ProjectDonors from '../../views/donorsPage/ProjectDonors.vue'

import VBtn from 'vuetify/es5/components/VBtn/VBtn'
import VIcon from 'vuetify/es5/components/VIcon/VIcon'
import VCard from 'vuetify/es5/components/VCard/VCard'
import VImg from 'vuetify/es5/components/VImg/VImg'

export default {
  props: ['id'],
  data() {
    return {
      imagesBase: [],
      photosBase: [],
      currentImage: null,
      projectImage: null
      // project: []
    }
  },
  components: {
    VBtn,
    VIcon,
    VCard,
    VImg,
    "final-outlay": FinalOutlay,
    "final-photos": FinalPhotos,
    "app-dialog-edit-project": DialogProjectEdit,
    "app-dialog-edit-project-outlay": DialogProjectEditOutlay,
    "app-dialog-edit-project-final": DialogProjectEditFinal,
    "app-dialog-edit-project-photos": DialogProjectEditPhotos,
    "app-dialog-edit-date": DialogProjectEditDate,
    "app-dialog-edit-time": DialogProjectEditTime,
    "project-donors": ProjectDonors,
    "donate-contacts-form": donateContactsForm
  },
  computed: {
    project() {
      return this.$store.getters.project(this.id)
    },
    dataOutlay(){
      return this.project.dataOutlay
    },
    userIsCreator(){
      if(this.project && this.$store.getters.userId){
        return this.$store.getters.userId === this.project.creatorId
      }
      return false
    },
    sum(){
      const dataOutlay = this.project.dataOutlay
      let sum = null
      if(dataOutlay) {
        for( let i = 0; i < 5; i++) {
          let multi = dataOutlay[i].outlayQuantity * dataOutlay[i].outlayPrice
          if(isNaN(multi)){
            multi = null
          }
          sum = sum + multi
        }
      }
      return sum
    }
  },
  methods: {
    multiplication(num, price) {
      if(!isNaN(num) && !isNaN(price)){
        return num * price + " " + this.project.currency
      }
      return 'error'
    },
    urlUpdate(payload){
      if(payload.url_1){
        this.currentImage = payload.url_1
      }
      if(payload.url_2){
        this.projectImage = payload.url_2
      }
    },
    urlUpdateFinal(payload){
      this.imagesBase = payload.baseUrls
    },
    photoBaseUrl(payload){
      const base = []
      base[0] = payload.baseUrls_1
      base[1] = payload.baseUrls_2
      base[2] = payload.baseUrls_3
      base[3] = payload.baseUrls_4
      this.photosBase = base
    },
    deleteProject() {
      this.$store.dispatch("deleteProject", this.project)
    },
    deleteOutlay() {
      this.$store.dispatch("deleteOutlay", this.project)
      this.project.dataOutlay = undefined
    },
    deleteFinalOutlay() {
      this.$store.dispatch("deleteFinalOutlay", this.project)
      this.project.dataFinal = undefined
    },
    deletePhotos() {
      this.project.dataPhotos = undefined
    }
  },
  created() {
    if(!this.project){
      this.$store.dispatch('logout')
    }
    this.$store.commit('setError',{status: false})
    this.$store.commit('setSuccess',{status: false})
    const images = this.project.projectImages
    if(this.project && images){
      if (images[0]) {
      this.currentImage = images[0].imageUrl
      }
      if (images[1]) {
        this.projectImage = images[1].imageUrl
      }
    }
  }
};
</script>

