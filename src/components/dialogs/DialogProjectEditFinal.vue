<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="green" class="edit-button">
        <v-icon>edit</v-icon>
        <span>{{ $t('edit') }}</span>
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('edit-pro') }}</span>
        </v-card-title>
        <v-card-text>
          <section class="create__outlay">
            <h4>{{ $t('final-outlay') }}</h4>
            <div class="create__outlay-resource create__outlay-resource--show create__outlay-resource--final">
              <v-text-field
                :label="$t('resource-name')"
                v-model="dataFinal[0].outlayName"
                class="create__outlay-cell create__outlay-cell--name">
              </v-text-field>
              <div class="create__outlay-item">
                <v-text-field
                  v-model="dataFinal[0].outlayQuantity"
                  :label="$t('resource-quantity')"
                  class="create__outlay-cell create__outlay-cell--quantity">
                </v-text-field>
                <v-text-field
                  v-model="dataFinal[0].outlayPrice"
                  :label="$t('resource-price')"
                  class="create__outlay-cell create__outlay-cell--price">
                </v-text-field>
                <div class="create__outlay-cell create__outlay-cell--sum">
                  <span>{{ $t('sum') }}</span>
                  <span>{{multiplication(dataFinal[0].outlayQuantity, dataFinal[0].outlayPrice)}}</span>
                </div>
              </div>
              <div>
                <div>
                  <v-text-field
                    :label="$t('supplier-name')"
                    v-model="dataFinal[0].outlayNameSupplier"
                    class="create__outlay-cell">
                  </v-text-field>
                  <v-text-field
                    :label="$t('supplier-contact')"
                    v-model="dataFinal[0].outlayContactSupplier"
                    class="create__outlay-cell">
                  </v-text-field>
                </div>
                <section>
                  <button type="button" raised class="btn" @click="onPickFile1">{{$t('upload-photo')}}</button>
                  <input type="file" style="display: none" ref="fileInput1" accept="image/*" @change="onFiles(0)">
                  <p class="msg-error">{{ msgFileMax_1 }}</p>
                  <div class="create__img">
                    <img :src="url_F1" alt="">
                  </div>
                </section>
              </div>
              <v-btn class="create__outlay--add" @click="showNextResource">{{ $t('add-resource') }}
                <v-icon medium>keyboard_arrow_down</v-icon>
              </v-btn>
            </div>
            <div class="create__outlay-resource create__outlay-resource--final">
              <v-text-field
                :label="$t('resource-name')"
                v-model="dataFinal[1].outlayName"
                class="create__outlay-cell create__outlay-cell--name">
              </v-text-field>
              <div class="create__outlay-item ">
                <v-text-field
                  v-model="dataFinal[1].outlayQuantity"
                  :label="$t('resource-quantity')"
                  class="create__outlay-cell create__outlay-cell--quantity">
                </v-text-field>
                <v-text-field
                  v-model="dataFinal[1].outlayPrice"
                  :label="$t('resource-price')"
                  class="create__outlay-cell create__outlay-cell--price">
                </v-text-field>
                <div class="create__outlay-cell create__outlay-cell--sum">
                  <span>{{ $t('sum') }}</span>
                  <span>{{multiplication(dataFinal[1].outlayQuantity, dataFinal[1].outlayPrice)}}</span>
                </div>
              </div>
              <div>
                <div>
                  <v-text-field
                    :label="$t('supplier-name')"
                    v-model="dataFinal[1].outlayNameSupplier"
                    class="create__outlay-cell">
                  </v-text-field>
                  <v-text-field
                    :label="$t('supplier-contact')"
                    v-model="dataFinal[1].outlayContactSupplier" class="create__outlay-cell">
                  </v-text-field>
                </div>
                <section>
                  <button type="button" raised class="btn" @click="onPickFile2">{{$t('upload-photo')}}</button>
                  <input type="file" style="display: none" ref="fileInput2" accept="image/*" @change="onFiles(1)">
                  <p class="msg-error">{{ msgFileMax_2 }}</p>
                  <div class="create__img">
                    <img :src="url_F2" alt="">
                  </div>
                </section>
              </div>
              <v-btn class="create__outlay--add" @click="showNextResource">{{ $t('add-resource') }}
                <v-icon medium>keyboard_arrow_down</v-icon>
              </v-btn>
            </div>
            <div class="create__outlay-resource create__outlay-resource--final">
              <v-text-field
                :label="$t('resource-name')"
                v-model="dataFinal[2].outlayName"
                class="create__outlay-cell create__outlay-cell--name">
              </v-text-field>
              <div class="create__outlay-item">
                <v-text-field
                  v-model="dataFinal[2].outlayQuantity" :label="$t('resource-quantity')"
                  class="create__outlay-cell create__outlay-cell--quantity">
                </v-text-field>
                <v-text-field
                  v-model="dataFinal[2].outlayPrice"
                  :label="$t('resource-price')"
                  class="create__outlay-cell create__outlay-cell--price">
                </v-text-field>
                <div class="create__outlay-cell create__outlay-cell--sum">
                  <span>{{ $t('sum') }}</span>
                  <span>{{multiplication(dataFinal[2].outlayQuantity, dataFinal[2].outlayPrice)}}</span>
                </div>
              </div>
              <div>
                <div>
                  <v-text-field
                    :label="$t('supplier-name')"
                    v-model="dataFinal[2].outlayNameSupplier"
                    class="create__outlay-cell">
                  </v-text-field>
                  <v-text-field
                    :label="$t('supplier-contact')"
                    v-model="dataFinal[2].outlayContactSupplier"
                    class="create__outlay-cell">
                  </v-text-field>
                </div>
                <section>
                  <button type="button" raised class="btn" @click="onPickFile3">{{$t('upload-photo')}}</button>
                  <input type="file"
                    style="display: none"
                    ref="fileInput3"
                    accept="image/*"
                    @change="onFiles(2)">
                  <p class="msg-error">{{ msgFileMax_3 }}</p>
                  <div class="create__img">
                    <img :src="url_F3" alt="">
                  </div>
                </section>
              </div>
              <v-btn class="create__outlay--add" @click="showNextResource">{{ $t('add-resource') }}
                <v-icon medium>keyboard_arrow_down</v-icon>
              </v-btn>
            </div>
            <div class="create__outlay-resource create__outlay-resource--final">
              <v-text-field
                :label="$t('resource-name')"
                v-model="dataFinal[3].outlayName"
                class="create__outlay-cell create__outlay-cell--name">
              </v-text-field>
              <div class="create__outlay-item">
                <v-text-field
                  v-model="dataFinal[3].outlayQuantity"
                  :label="$t('resource-quantity')"
                  class="create__outlay-cell create__outlay-cell--quantity">
                </v-text-field>
                <v-text-field
                  v-model="dataFinal[3].outlayPrice"
                  :label="$t('resource-price')"
                  class="create__outlay-cell create__outlay-cell--price">
                </v-text-field>
                <div class="create__outlay-cell create__outlay-cell--sum">
                  <span>{{ $t('sum') }}</span>
                  <span>{{multiplication(dataFinal[3].outlayQuantity, dataFinal[3].outlayPrice)}}</span>
                </div>
              </div>
              <div>
                <div>
                  <v-text-field
                    :label="$t('supplier-name')"
                    v-model="dataFinal[3].outlayNameSupplier"
                    class="create__outlay-cell">
                  </v-text-field>
                  <v-text-field
                    :label="$t('supplier-contact')"
                    v-model="dataFinal[3].outlayContactSupplier"
                    class="create__outlay-cell">
                  </v-text-field>
                </div>
                <section>
                  <button type="button" raised class="btn" @click="onPickFile4">{{$t('upload-photo')}}</button>
                  <input type="file" style="display: none" ref="fileInput4" accept="image/*" @change="onFiles(3)">
                  <p class="msg-error">{{ msgFileMax_4 }}</p>
                  <div class="create__img">
                    <img :src="url_F4" alt="">
                  </div>
                </section>
              </div>
              <v-btn class="create__outlay--add" @click="showNextResource">{{ $t('add-resource') }}
                <v-icon medium>keyboard_arrow_down</v-icon>
              </v-btn>
            </div>
            <div class="create__outlay-resource create__outlay-resource--final">
              <v-text-field
                :label="$t('resource-name')"
                v-model="dataFinal[4].outlayName"
                class="create__outlay-cell create__outlay-cell--name">
              </v-text-field>
              <div class="create__outlay-item">
                <v-text-field
                  v-model="dataFinal[4].outlayQuantity"
                  :label="$t('resource-quantity')"
                  class="create__outlay-cell create__outlay-cell--quantity">
                </v-text-field>
                <v-text-field
                  v-model="dataFinal[4].outlayPrice"
                  :label="$t('resource-price')"
                  class="create__outlay-cell create__outlay-cell--price">
                </v-text-field>
                <div class="create__outlay-cell create__outlay-cell--sum">
                  <span>{{ $t('sum') }}</span>
                  <span>{{multiplication(dataFinal[4].outlayQuantity, dataFinal[4].outlayPrice)}}</span>
                </div>
              </div>
              <div>
                <div>
                  <v-text-field
                    :label="$t('supplier-name')"
                    v-model="dataFinal[4].outlayNameSupplier"
                    class="create__outlay-cell">
                  </v-text-field>
                  <v-text-field
                    :label="$t('supplier-contact')"
                    v-model="dataFinal[4].outlayContactSupplier"
                    class="create__outlay-cell">
                  </v-text-field>
                </div>
                <section>
                  <button type="button" raised class="btn" @click="onPickFile5">{{$t('upload-photo')}}</button>
                  <input type="file" style="display: none" ref="fileInput5" accept="image/*" @change="onFiles(4)">
                  <p class="msg-error">{{ msgFileMax_5 }}</p>
                  <div class="create__img">
                    <img :src="url_F5" alt="">
                  </div>
                </section>
              </div>
            </div>
          </section>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">{{$t('close')}}</v-btn>
          <v-btn color="green darken-1" flat @click="saveFinalOutlay">{{$t('save')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import VCard from 'vuetify/es5/components/VCard/VCard'
import VBtn from 'vuetify/es5/components/VBtn/VBtn'
import VDialog from 'vuetify/es5/components/VDialog/VDialog'
import VIcon from 'vuetify/es5/components/VIcon/VIcon'
import VTextField from 'vuetify/es5/components/VTextField/VTextField'
export default {
  components: {
    VCard,
    VBtn,
    VDialog,
    VIcon,
    VTextField
  },
  props: {
    project: Object
  },
  data() {
    return {
      dialog: false,
      msgFileMax_1: "",
      msgFileMax_2: "",
      msgFileMax_3: "",
      msgFileMax_4: "",
      msgFileMax_5: "",
      messages: [],
      url_F1: '',
      url_F2: '',
      url_F3: '',
      url_F4: '',
      url_F5: '',
      urls: [],
      dataFinalImages: [],
      dataFinal: [
        {
          outlayName: '',
          outlayQuantity: '',
          outlayPrice: '',
          outlayNameSupplier: '',
          outlayContactSupplier: ''
        },
        {
          outlayName: '',
          outlayQuantity: '',
          outlayPrice: '',
          outlayNameSupplier: '',
          outlayContactSupplier: ''
        },
        {
          outlayName: '',
          outlayQuantity: '',
          outlayPrice: '',
          outlayNameSupplier: '',
          outlayContactSupplier: ''
        },
        {
          outlayName: '',
          outlayQuantity: '',
          outlayPrice: '',
          outlayNameSupplier: '',
          outlayContactSupplier: ''
        },
        {
          outlayName: '',
          outlayQuantity: '',
          outlayPrice: '',
          outlayNameSupplier: '',
          outlayContactSupplier: ''
        }
      ],
      baseUrls: [],
      images: []
    }
  },
  methods: {
    showNextResource(event) {
      const target = event.target
      const resource = target.parentNode.parentNode.nextSibling
      resource.classList.toggle('create__outlay-resource--show')
    },
    saveFinalOutlay() {
      this.$store.dispatch("editProject", {
        dataFinal: this.dataFinal,
        id: this.project.id,
        dataFinalImages: this.images
      })
      this.dialog = false
      this.baseUrls[0] = this.url_F1,
      this.baseUrls[1] = this.url_F2,
      this.baseUrls[2] = this.url_F3,
      this.baseUrls[3] = this.url_F4,
      this.baseUrls[4] = this.url_F5,
      this.$emit("imageUrlFinal", {
        baseUrls: this.baseUrls
      })
    },
    multiplication(num, price) {
      return num * price + " " + this.project.currency
    },
    onPickFile1() {
      this.$refs.fileInput1.click()
    },
    onPickFile2() {
      this.$refs.fileInput2.click()
    },
    onPickFile3() {
      this.$refs.fileInput3.click()
    },
    onPickFile4() {
      this.$refs.fileInput4.click()
    },
    onPickFile5() {
      this.$refs.fileInput5.click()
    },
    onFilesChange(image) {
      const file = event.target.files[0]
      if (file) {
        if (file.size < 500000) {
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
    async onFiles(image) {
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

    urlsShow() {
      this.url_F1 = this.urls[0]
      this.url_F2 = this.urls[1]
      this.url_F3 = this.urls[2]
      this.url_F4 = this.urls[3]
      this.url_F5 = this.urls[4]
    },
    messagesShow() {
      this.msgFileMax_1 = this.messages[0]
      this.msgFileMax_2 = this.messages[1]
      this.msgFileMax_3 = this.messages[2]
      this.msgFileMax_4 = this.messages[3]
      this.msgFileMax_5 = this.messages[4]
    }
  },
  created() {
    const storeImage = this.project.dataFinalImages
    const checksPhotoQuantity = 5
    // setTimeout(() => {
    for (let i = 0; i < checksPhotoQuantity; i++) {
      if (storeImage && storeImage[i] != undefined && storeImage[i] != "") {
        this.urls[i] = storeImage[i].imageUrl
      } else {
        this.urls[i] = ""
      }
    }
    this.urlsShow()
    // }, 1500)

    const data = this.project.dataFinal
    if (data) {
      for (let i = 0; i < 5; i++) {
        if (data[i]) {
          if (data[i].outlayName) {
            this.dataFinal[i].outlayName = data[i].outlayName
          }
          if (data[i].outlayQuantity) {
            this.dataFinal[i].outlayQuantity = data[i].outlayQuantity
          }
          if (data[i].outlayPrice) {
            this.dataFinal[i].outlayPrice = data[i].outlayPrice
          }
          if (data[i].outlayNameSupplier) {
            this.dataFinal[i].outlayNameSupplier = data[i].outlayNameSupplier
          }
          if (data[i].outlayContactSupplier) {
            this.dataFinal[i].outlayContactSupplier = data[i].outlayContactSupplier
          }
        }
      }
    }
  }
};
</script>
