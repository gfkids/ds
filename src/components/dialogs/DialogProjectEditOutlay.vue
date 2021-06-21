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
            <h4>{{ $t('preliminary') }}</h4>
            <div class="create__outlay-resource--base create__outlay-resource--show">
              <div class="create__outlay-item">
                <v-text-field
                  :label="$t('resource-name')"
                  v-model="dataOutlay[0].outlayName"
                  class="create__outlay-cell create__outlay-cell--name"
                  >
                </v-text-field>
                <v-text-field
                  v-model="dataOutlay[0].outlayQuantity"
                  :label="$t('resource-quantity')"
                  class="create__outlay-cell create__outlay-cell--quantity"
                  >
                </v-text-field>
                <v-text-field
                  type="number"
                  v-model="dataOutlay[0].outlayPrice"
                  :label="$t('resource-price')"
                  class="create__outlay-cell create__outlay-cell--price"
                  >
                </v-text-field>
                <div class="create__outlay-cell create__outlay-cell--sum">
                  <span>{{ $t('sum') }}</span>
                  <span>{{multiplication(dataOutlay[0].outlayQuantity, dataOutlay[0].outlayPrice)}}</span>
                </div>
              </div>
              <v-btn class="create__outlay--add" @click="showNextResource">{{ $t('add-resource') }}<v-icon medium>keyboard_arrow_down</v-icon>
              </v-btn>
            </div>

            <div class="create__outlay-resource--base">
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
                  <span>{{ $t('sum') }}</span>
                  <span>{{multiplication(dataOutlay[1].outlayQuantity, dataOutlay[1].outlayPrice)}}</span>
                </div>
              </div>
              <v-btn class="create__outlay--add" @click="showNextResource">{{ $t('add-resource') }}<v-icon medium>keyboard_arrow_down</v-icon></v-btn>
            </div>

            <div class="create__outlay-resource--base">
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
                  <span>{{ $t('sum') }}</span>
                  <span>{{multiplication(dataOutlay[2].outlayQuantity, dataOutlay[2].outlayPrice)}}</span>
                </div>
              </div>
              <v-btn  class="create__outlay--add" @click="showNextResource">{{ $t('add-resource') }}<v-icon medium>keyboard_arrow_down</v-icon></v-btn>
            </div>

            <div class="create__outlay-resource--base">
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
                  <span>{{ $t('sum') }}</span>
                  <span>{{multiplication(dataOutlay[3].outlayQuantity , dataOutlay[3].outlayPrice )}}</span>
                </div>
              </div>
              <v-btn class="create__outlay--add" @click="showNextResource">{{ $t('add-resource') }}
                <v-icon medium>keyboard_arrow_down</v-icon></v-btn>
            </div>

            <div class="create__outlay-resource--base">
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
                  <span>{{ $t('sum') }}</span>
                  <span>{{multiplication(dataOutlay[4].outlayQuantity, dataOutlay[4].outlayPrice)}}</span>
                </div>
              </div>
            </div>
          </section>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">{{ $t('close') }}</v-btn>
          <v-btn color="green darken-1" flat @click="saveOutlay">{{ $t('save') }}</v-btn>
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
      project:Object
    },
    data() {
      return {
        dialog: false,
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
      }
    },
    methods: {
      showNextResource(event) {
        const target = event.target
        const resource = target.parentNode.parentNode.nextSibling
        resource.classList.toggle('create__outlay-resource--show')
        target.parentNode.style.display = 'none'
      },
      saveOutlay(){
        this.$store.dispatch("editProject", {
          dataOutlay: this.dataOutlay,
          id: this.project.id
        })
        this.dialog = false
      },
      multiplication(num, price) {
        return num * price + " " + this.project.currency
      }
     },
    created(){
      const data = this.project.dataOutlay
      if (data) {
        for (let i = 0; i < 5; i++) {
          if (data[i]) {
            if (data[i].outlayName) {
              this.dataOutlay[i].outlayName = data[i].outlayName
            }
            if (data[i].outlayQuantity) {
              this.dataOutlay[i].outlayQuantity = data[i].outlayQuantity
            }
            if (data[i].outlayPrice) {
              this.dataOutlay[i].outlayPrice = data[i].outlayPrice
            }
          }
        }
      }
    }
};
</script>
