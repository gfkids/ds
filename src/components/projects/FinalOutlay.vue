<template>
  <div class="outlay">
    <div class="outlay__row outlay__row--head"
         v-html="$t('table-head-final')">
    </div>
    <section class="outlay__group">
      <div class="outlay__row">
        <span>{{ dataFinal[0].outlayName }}</span>
        <span>{{ dataFinal[0].outlayQuantity }}</span>
        <span>{{ dataFinal[0].outlayPrice }} {{project.currency}}</span>
        <span>{{multiplication(dataFinal[0].outlayQuantity, dataFinal[0].outlayPrice)}}</span>
      </div>
      <div class="outlay__row outlay__row--btn">
        <button @click="showContacts">{{$t('proof')}}
          <v-icon medium color="green">keyboard_arrow_down</v-icon>
        </button>

      </div>
      <div class="outlay-proof">
        <div class="outlay-proof__contacts">
          <p v-if="!dataFinal[0].outlayNameSupplier">{{$t('empty-supplier-name')}}</p>
          <h5>{{ dataFinal[0].outlayNameSupplier }}</h5>
          <p v-if="!dataFinal[0].outlayContactSupplier">{{$t('empty-supplier-contact')}}</p>
          <span>{{ dataFinal[0].outlayContactSupplier}}</span>
        </div>
        <p v-if="!editedUrl_F1">{{$t('empty-supplier-check')}}</p>
        <img class="outlay-proof__check"
             :src="editedUrl_F1"
             alt="check 1"
             v-if="editedUrl_F1">
      </div>
    </section>

    <section class="outlay__group">
      <div class="outlay__row">
        <span>{{ dataFinal[1].outlayName }} </span>
        <span>{{ dataFinal[1].outlayQuantity }}</span>
        <span>{{ dataFinal[1].outlayPrice }} {{project.currency}}</span>
        <span>{{multiplication(dataFinal[1].outlayQuantity, dataFinal[1].outlayPrice)}}</span>
      </div>
      <div class="outlay__row outlay__row--btn">
        <button @click="showContacts">{{$t('proof')}}
          <v-icon medium color="green">keyboard_arrow_down</v-icon>
        </button>
      </div>
      <div class="outlay-proof"
           >
        <div class="outlay-proof__contacts">
          <p v-if="!dataFinal[1].outlayNameSupplier">{{$t('empty-supplier-name')}}</p>
          <h5>{{ dataFinal[1].outlayNameSupplier }}</h5>
          <p v-if="!dataFinal[1].outlayContactSupplier">{{$t('empty-supplier-contact')}}</p>
          <span>{{ dataFinal[1].outlayContactSupplier }}</span>
        </div>
        <p v-if="!editedUrl_F2">{{$t('empty-supplier-check')}}</p>
        <img class="outlay-proof__check"
             :src="editedUrl_F2"
             alt="check 2"
             v-if="editedUrl_F2">
      </div>
    </section>

    <section class="outlay__group" v-if="dataFinal[2].outlayName">
      <div class="outlay__row">
        <span>{{ dataFinal[2].outlayName }}</span>
        <span>{{ dataFinal[2].outlayQuantity }}</span>
        <span>{{ dataFinal[2].outlayPrice }} {{project.currency}}</span>
        <span>{{multiplication(dataFinal[2].outlayQuantity, dataFinal[2].outlayPrice)}}</span>
      </div>
      <div class="outlay__row outlay__row--btn">
        <button @click="showContacts">{{$t('proof')}}
          <v-icon medium color="green">keyboard_arrow_down</v-icon>
        </button>
      </div>
      <div class="outlay-proof"
           >
        <div class="outlay-proof__contacts">
          <p v-if="!dataFinal[2].outlayNameSupplier">{{$t('empty-supplier-name')}}</p>
          <h5>{{ dataFinal[2].outlayNameSupplier }}</h5>
          <p v-if="!dataFinal[2].outlayContactSupplier">{{$t('empty-supplier-contact')}}</p>
          <span>{{ dataFinal[2].outlayContactSupplier }}</span>
        </div>
        <p v-if="!editedUrl_F3">{{$t('empty-supplier-check')}}</p>
        <img class="outlay-proof__check"
             :src="editedUrl_F3"
             alt="check 3"
             v-if="editedUrl_F3">
      </div>
    </section>

    <section class="outlay__group" v-if="dataFinal[3].outlayName">
      <div class="outlay__row">
        <span>{{ dataFinal[3].outlayName }}</span>
        <span>{{ dataFinal[3].outlayQuantity }}</span>
        <span>{{ dataFinal[3].outlayPrice }} {{project.currency}}</span>
        <span>{{multiplication(dataFinal[3].outlayQuantity, dataFinal[3].outlayPrice)}}</span>
      </div>
      <div class="outlay__row outlay__row--btn">
        <button @click="showContacts">{{$t('proof')}}
          <v-icon medium color="green">keyboard_arrow_down</v-icon>
        </button>
      </div>
      <div class="outlay-proof"
           >
        <div class="outlay-proof__contacts">
          <p v-if="!dataFinal[3].outlayNameSupplier">{{$t('empty-supplier-name')}}</p>
          <h5>{{ dataFinal[3].outlayNameSupplier }}</h5>
          <p v-if="!dataFinal[3].outlayContactSupplier">{{$t('empty-supplier-contact')}}</p>
          <span>{{ dataFinal[3].outlayContactSupplier }}</span>
        </div>
        <p v-if="!editedUrl_F4">{{$t('empty-supplier-check')}}</p>
        <img class="outlay-proof__check"
             :src="editedUrl_F4"
             alt="check 4"
             v-if="editedUrl_F4">
      </div>
    </section>

    <section class="outlay__group" v-if="dataFinal[4].outlayName">
      <div class="outlay__row">
        <span>{{ dataFinal[4].outlayName }}</span>
        <span>{{ dataFinal[4].outlayQuantity }}</span>
        <span>{{ dataFinal[4].outlayPrice }} {{project.currency}}</span>
        <span>{{multiplication(dataFinal[4].outlayQuantity, dataFinal[4].outlayPrice )}}</span>
      </div>
      <div class="outlay__row outlay__row--btn">
        <button @click="showContacts">{{$t('proof')}}
          <v-icon medium color="green">keyboard_arrow_down</v-icon>
        </button>
      </div>
      <div class="outlay-proof"
           >
        <div class="outlay-proof__contacts">
          <p v-if="!dataFinal[4].outlayNameSupplier">{{$t('empty-supplier-name')}}</p>
          <h5>{{ dataFinal[4].outlayNameSupplier }}</h5>
          <p v-if="!dataFinal[4].outlayContactSupplier">{{$t('empty-supplier-contact')}}</p>
          <span>{{ dataFinal[4].outlayContactSupplier }}</span>
        </div>
        <p v-if="!editedUrl_F5">{{$t('empty-supplier-check')}}</p>
        <img class="outlay-proof__check"
             :src="editedUrl_F5"
             alt="check 5"
             v-if="editedUrl_F5 != '' ">
      </div>
    </section>
    <div class="outlay__row outlay__row--sum">
      <span>{{$t('sum')}}</span>
      <span></span>
      <span></span>
      <span>{{ sum }}</span>
    </div>
  </div>
</template>

<script>
import VIcon from 'vuetify/es5/components/VIcon/VIcon'
  export default {
    components: {
      VIcon
    },
    props: {
      id: String,
      imagesBase: Array
    },
    computed: {
      project() {
        return this.$store.getters.project(this.id)
      },
      dataFinal(){
        const data = this.project.dataFinal
        // const dataFinal = Array.apply(null,{length: 5})
        const dataFinal = [
         {},
         {},
         {},
         {},
         {}
        ]
        if (data) {
          for (let i = 0; i < 5; i++) {
            if (data[i]) {
              if (data[i].outlayName) {
                dataFinal[i].outlayName = data[i].outlayName
              }else {dataFinal[i].outlayName = ""}
              if (data[i].outlayQuantity) {
                dataFinal[i].outlayQuantity = data[i].outlayQuantity
              }else {dataFinal[i].outlayQuantity = ""}
              if (data[i].outlayPrice) {
                dataFinal[i].outlayPrice = data[i].outlayPrice
              }else {dataFinal[i].outlayPrice = ""}
              if (data[i].outlayNameSupplier) {
                dataFinal[i].outlayNameSupplier = data[i].outlayNameSupplier
              }else {dataFinal[i].outlayNameSupplier = ""}
              if (data[i].outlayContactSupplier) {
                dataFinal[i].outlayContactSupplier = data[i].outlayContactSupplier
              }else {dataFinal[i].outlayContactSupplier = ""}
            }
          }
        }
        return dataFinal
      },
      urls(){
        const array = []
        const img = this.project.dataFinalImages
        const base = this.imagesBase
        const checksPhotosQuantity = 5
        for(let i = 0; i < checksPhotosQuantity; i++) {
          if(base.length > 0 && base[i] != undefined && base[i] != ""){
            array[i] =  base[i]
          } else if (img && img[i] != undefined && img[i] != "") {
            array[i] = img[i].imageUrl
          } else {
            array[i] = ""
          }
        }
        return array
      },
      editedUrl_F1(){
        return this.urls[0]
      },
      editedUrl_F2(){
        return this.urls[1]
      },
      editedUrl_F3(){
        return this.urls[2]
      },
      editedUrl_F4(){
        return this.urls[3]
      },
      editedUrl_F5(){
        return this.urls[4]
      },
      sum(){
        const data = this.dataFinal
        const sum = data[0].outlayQuantity * data[0].outlayPrice +
        data[1].outlayQuantity * data[1].outlayPrice +
        data[2].outlayQuantity * data[2].outlayPrice +
        data[3].outlayQuantity * data[3].outlayPrice +
        data[4].outlayQuantity * data[4].outlayPrice
        if(isNaN(sum)){
          return this.project.currency
        }
        return sum + " " + this.project.currency
      }
    },
    methods: {
      multiplication(num, price) {
        if(isNaN(num * price)){
          return this.project.currency
        }
        return num * price + " " + this.project.currency
      },
      showContacts(event){
        const target = event.target
        const contacts = target.parentNode.nextSibling
        contacts.classList.toggle('outlay-proof--show')
      }
    }
  };
</script>
