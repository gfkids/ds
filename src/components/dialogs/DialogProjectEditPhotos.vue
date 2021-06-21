<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="400px">
        <v-btn slot="activator" color="green" class="edit-button">
          <v-icon>edit</v-icon>
          <span>{{ $t('edit') }}</span>
        </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('edit-pro') }}</span>
        </v-card-title>
        <v-card-text>
          <h4>{{$t('photos')}}</h4>
          <div>
            <section>
              <button type="button" raised class="btn" @click="onPickFile1">{{$t('upload-photo')}}</button>
              <input
                type="file"
                style="display: none"
                ref="fileInput1"
                accept="image/*"
                @change="onFiles(0)">
              <p class="msg-error">{{ msgFileMax_1 }}</p>
              <div class="create__img" v-if="url_F1">
                <v-img
                   :src="url_F1"
                   aspect-ratio="1.618"
                   alt="final-photo-1"
                   >
                </v-img>
              </div>
            </section>

            <section>
              <button type="button" raised class="btn" @click="onPickFile2">{{$t('upload-photo')}}</button>
              <input
                type="file"
                style="display: none"
                ref="fileInput2"
                accept="image/*"
                @change="onFiles(1)">
              <p class="msg-error">{{ msgFileMax_2 }}</p>
              <div class="create__img" v-if="url_F2">
                <v-img
                   :src="url_F2"
                   aspect-ratio="1.618"
                   alt="final-photo-2"
                   >
                </v-img>
              </div>
            </section>

            <section>
              <button type="button" raised class="btn" @click="onPickFile3">{{$t('upload-photo')}}</button>
              <input
                type="file"
                style="display: none"
                ref="fileInput3"
                accept="image/*"
                @change="onFiles(2)">
              <p class="msg-error">{{ msgFileMax_3 }}</p>
              <div class="create__img" v-if="url_F3">
                <v-img
                   :src="url_F3"
                   aspect-ratio="1.618"
                   alt="final-photo-3"
                   >
                </v-img>
              </div>
            </section>

            <section>
              <button type="button" raised class="btn" @click="onPickFile4">{{$t('upload-photo')}}</button>
              <input
                type="file"
                style="display: none"
                ref="fileInput4"
                accept="image/*"
                @change="onFiles(3)">
              <p class="msg-error">{{ msgFileMax_4 }}</p>
              <div class="create__img" v-if="url_F4">
                <v-img
                   :src="url_F4"
                   aspect-ratio="1.618"
                   alt="final-photo-4"
                   >
                </v-img>
              </div>
            </section>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">{{$t('close')}}</v-btn>
          <v-btn color="green darken-1" flat @click="saveFinalPhotos">{{$t('save')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import VCard from 'vuetify/es5/components/VCard/VCard'
import VBtn from 'vuetify/es5/components/VBtn/VBtn'
import VDialog from 'vuetify/es5/components/VDialog/VDialog'
import VImg from 'vuetify/es5/components/VImg/VImg'
import VIcon from 'vuetify/es5/components/VIcon/VIcon'

  export default {
    components: {
      VCard,
      VBtn,
      VDialog,
      VImg,
      VIcon
    },
    props: {
      project: Object
    },
    data () {
      return {
        dialog: false,
        msgFileMax_1: "",
        msgFileMax_2: "",
        msgFileMax_3: "",
        msgFileMax_4: "",
        messages: [],
        url_F1: '',
        url_F2: '',
        url_F3: '',
        url_F4: '',
        images: [],
        urls: []
      }
    },
    methods: {
      async onFiles(image){
        try {
          await this.onFilesChange(image)
          await setTimeout(() => {
            this.urlsShow()
            this.messagesShow()
          }, 1000)
        } catch (e) {
            console.log(e)
        }
      },
      onFilesChange(image){
        const file = event.target.files[0]
        if(file){
          if(file.size < 500000){
            this.images[image] = file
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
              const result = fileReader.result
              this.urls[image] = result
            })
            fileReader.readAsDataURL(file)
            this.messages[image] = ""
          } else {
            this.messages[image] = this.$i18n.t('msg-file-size')
          }
        } else {
            this.messages[image] = this.$i18n.t('msg-file-empty')
        }
      },
      urlsShow(){
        this.url_F1 = this.urls[0]
        this.url_F2 = this.urls[1]
        this.url_F3 = this.urls[2]
        this.url_F4 = this.urls[3]
      },
      messagesShow(){
        this.msgFileMax_1 = this.messages[0]
        this.msgFileMax_2 = this.messages[1]
        this.msgFileMax_3 = this.messages[2]
        this.msgFileMax_4 = this.messages[3]
      },
      emitBaseUrls(){
        this.$emit("photoBaseUrl", {
          baseUrls_1: this.url_F1,
          baseUrls_2: this.url_F2,
          baseUrls_3: this.url_F3,
          baseUrls_4: this.url_F4,
        })
      },
      saveFinalPhotos(){
        this.emitBaseUrls()
        this.$store.dispatch("editProject", {
          dataPhotos: this.images,
          id: this.project.id
        })
        this.dialog = false
      },
      onPickFile1(){
        this.$refs.fileInput1.click()
      },
      onPickFile2(){
        this.$refs.fileInput2.click()
      },
      onPickFile3(){
        this.$refs.fileInput3.click()
      },
      onPickFile4(){
        this.$refs.fileInput4.click()
      },
    },
    created(){
      const storeImage = this.project.dataPhotos
      const finalPhotosQuantity = 4
      if(storeImage){
        for(let i = 0; i < finalPhotosQuantity; i++) {
          if (storeImage[i] != undefined && storeImage[i] != "") {
              this.urls[i] = storeImage[i].imageUrl
          } else {
            this.urls[i] = ""
          }
        }
        this.urlsShow()
      }
    }
  };
</script>
