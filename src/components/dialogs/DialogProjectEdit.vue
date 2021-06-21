<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="500px" class="dialog__edit">
        <v-btn slot="activator" color="green" class="edit-button">
          <v-icon>edit</v-icon>
          <span>{{ $t('edit') }}</span>
        </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('edit-pro') }}</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            :label="$t('create-title')"
            v-model="editedTitle">
          </v-text-field>
          <!-- <v-text-field
            :label="$t('create-description')"
            v-model="editedDescription">
          </v-text-field> -->
          <v-textarea
            :label="$t('create-description')"
            v-model="editedDescription"
            multi-line
            >
          </v-textarea>
          <v-select
            :label="$t('create-currency')"
            v-model="editedCurrency"
            class="create__currency"
            :items="items"
            persistent-hint
            return-object
            >
          </v-select>
          <section class="dialog__edit-photos">
            <p>{{$t("photos-explain-1")}}</p>
            <v-btn raised class="green" @click="onPickFile1">{{$t("upload-photo")}}</v-btn>
            <input
              type="file"
              style="display: none"
              ref="fileInput_1"
              accept="image/*"
              @change="onFiles(0)">
            <span class="msg-error">{{ msgFileMax_1 }}</span>
            <v-img
               :src="editedUrl_1"
               aspect-ratio="1.618"
               alt="current-view"

               >
            </v-img>
            <p>{{$t("photos-explain-2")}}</p>
            <v-btn raised class="green" @click="onPickFile2">{{$t("upload-photo")}}</v-btn>
            <input
              type="file"
              style="display: none"
              ref="fileInput_2"
              accept="image/*"
              @change="onFiles(1)">
            <span class="msg-error">{{ msgFileMax_2 }}</span>
            <v-img
               :src="editedUrl_2"
               aspect-ratio="1.618"
               alt="project-view"

               >
            </v-img>
          </section>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">{{ $t('close') }}</v-btn>
          <v-btn color="green darken-1" flat @click="onSaveEdit" ref="save">{{ $t('save') }}</v-btn>
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
import VSelect from 'vuetify/es5/components/VSelect/VSelect'
import VTextField from 'vuetify/es5/components/VTextField/VTextField'
  export default {
    components: {
      VCard,
      VBtn,
      VDialog,
      VImg,
      VIcon,
      VSelect,
      VTextField
    },
    props: {
      project: Object
    },
    data () {
      return {
        items: ["USD", "EUR", "UAH", "RUB"],
        editedCurrency: this.project.currency,
        msgFileMax_1: "",
        msgFileMax_2: "",
        messages: [],
        baseUrls: [],
        editedImages: [],
        dialog: false,
        editedTitle: this.project.title,
        editedDescription: this.project.description,
        editedUrl_1: '',
        editedUrl_2: '',
        editedUrls: []
      }
    },
    methods: {
      checkField(){
        if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '' ){
          return
        }
        this.dialog = false
      },
      editProject(){
        this.$store.dispatch("editProject", {
          title: this.editedTitle,
          description: this.editedDescription,
          currency: this.editedCurrency,
          editedImages: this.editedImages,
          id: this.project.id
        })
        this.dialog = false
        this.$emit("imageUrl", {
          url_1: this.editedUrl_1,
          url_2: this.editedUrl_2,
        })
      },
      async onSaveEdit() {
        try {
          await this.checkField()
          await this.editProject()
        } catch (e) {
            console.log(e)
        }
      },
      onPickFile1(){
        this.$refs.fileInput_1.click()
      },
      onPickFile2(){
        this.$refs.fileInput_2.click()
      },
      onFilesChange(image) {
        const file = event.target.files[0]
        if (file) {
          if (file.size < 500000) {
            this.editedImages[image] = file
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
              const result = fileReader.result
              this.editedUrls[image] = result
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
       async onFiles(image) {
        try {
          await this.onFilesChange(image)
          await setTimeout(() => {
            this.urlsShow()
            this.messagesShow()
          }, 2000)
        } catch (e) {
          console.log(e)
        }
      },
      urlsShow() {
        this.editedUrl_1 = this.editedUrls[0]
        this.editedUrl_2 = this.editedUrls[1]
      },
      messagesShow() {
        this.msgFileMax_1 = this.messages[0]
        this.msgFileMax_2 = this.messages[1]
      },
    },
    created(){
      const pro = this.project.projectImages
      if(pro){
        if (pro[0]){
          this.editedUrl_1 = pro[0].imageUrl
          this.editedUrls[0] = this.editedUrl_1
        }
        if (pro[1]){
          this.editedUrl_2 = pro[1].imageUrl
          this.editedUrls[1] = this.editedUrl_2
        }
      }
    }
  };
</script>
