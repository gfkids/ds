<template>
  <div class="project__container project__container--baker">
    <section class="project__title" v-html="$t('project-example')">
    </section>
    <div class="project__images">
      <div class="project__image">
        <p>{{$t("photos-explain-1")}}</p>
        <v-img class="project__img project__img--before-bench"
          aspect-ratio="1:1.618">
        </v-img>
      </div>
      <div class="project__image">
        <p>{{$t("photos-explain-2")}}</p>
        <v-img class="project__img project__img--bench"
          aspect-ratio="1:1.618">
        </v-img>
      </div>
    </div>
    <div class="project__outlay" >
      <h2>{{$t("preliminary")}}</h2>
      <table>
        <tr v-html="$t('table-head')">
        </tr>
        <tr v-for="row in outlayBaker"
            :key="row.name">
          <td>{{ row.name }}</td>
          <td>{{ row.num }}</td>
          <td>{{ row.price }} $</td>
          <td >{{ multiplication(row.num, row.price) }} $</td>
        </tr>
        <tr>
          <td>{{$t("sum")}} </td>
          <td></td>
          <td></td>
          <td>{{ finalSum(outlayBaker) }} $</td>
        </tr>
      </table>
    </div>
    <router-link to="/project/new"
                 tag="a"
                 >
      <button class="btn">{{$t('nav-create')}}</button>
    </router-link>

    <div class="outlay" >
      <h2>{{$t('final-outlay')}}</h2>
      <h4>{{$t('creator-final')}}</h4>
      <div class="outlay__row outlay__row--head"
           v-html="$t('table-head-final')">
      </div>
      <section class="outlay__group">
        <div class="outlay__row">
          <span>{{$t('basket-shield')}}</span>
          <span>1</span>
          <span>160 $</span>
          <span>160 $</span>
        </div>

        <div class="outlay__row outlay__row--btn">
          <button @click="showContacts">{{$t('proof')}}
          </button>
        </div>

        <transition name="slide-fade">
          <div class="outlay-proof"
               >
            <div class="outlay-proof__contacts">
              <h5>Ikea</h5>
              <span>+447 50 456 78 99</span>
            </div>
            <img class="outlay-proof__check" src="../../img/ikea.jpg" alt="walmart bill">
          </div>
        </transition>
      </section>
      <section class="outlay__group">
        <div class="outlay__row">
          <span>{{$t('basket')}}</span>
          <span>1</span>
          <span>60 $</span>
          <span>60 $</span>
        </div>

        <div class="outlay__row outlay__row--btn">
          <button @click="showContacts">{{$t('proof')}}
          </button>
        </div>

        <transition name="slide-fade">
          <div class="outlay-proof"
               >
            <div class="outlay-proof__contacts">
              <h5>Wallmart</h5>
              <span>+447 0 456 78 99</span>
            </div>
            <img class="outlay-proof__check" src="../../img/walmart.jpg" alt="walmart bill">
          </div>
        </transition>
      </section>
      <section class="outlay__group">
        <div class="outlay__row">
          <span>{{$t('work')}}</span>
          <span>1</span>
          <span></span>
          <span>40 $</span>
        </div>

        <div class="outlay__row outlay__row--btn">
          <button @click="showContacts">{{$t('proof')}}
          </button>
        </div>

        <transition name="slide-fade">
          <div class="outlay-proof"
               >
            <div class="outlay-proof__contacts">
              <h5>Multi Service </h5>
              <span>+447 9 456 78 99</span>
            </div>
            <img class="outlay-proof__check" src="../../img/invoice.png" alt="invoice">
          </div>
        </transition>
      </section>

      <div class="outlay__row">
        <span>{{$t('work-org')}}</span>
        <span>1</span>
        <span></span>
        <span>40 $</span>
      </div>

      <div class="outlay__row outlay__row--sum">
        <span>{{$t('sum')}}</span>
        <span></span>
        <span></span>
        <span>300 $</span>
      </div>
    </div>

      <h2>{{$t('photos')}}</h2>
      <h4 class="outlay__photos--container">{{$t('creator-photo')}}</h4>
      <section class="outlay__photos">
        <div class="outlay__photo">
          <v-img
            :src="require('../../img/bench3.jpg')"
            aspect-ratio="1.618"
            >
          </v-img>
        </div>
        <div class="outlay__photo">
          <v-img
            :src="require('../../img/3.jpg')"
            aspect-ratio="1.618"
            >
          </v-img>
        </div>
        <div class="outlay__photo">
          <v-img
            :src="require('../../img/01.jpg')"
            aspect-ratio="1.618"
            >
          </v-img>
        </div>
        <div class="outlay__photo">
          <v-img
            :src="require('../../img/basket2.jpg')"
            aspect-ratio="1.618"
            >
          </v-img>
        </div>
      </section>
      <donate-btn></donate-btn>
      <donors></donors>

  </div>
</template>

<script>
import Donors from '../../views/donorsPage/Donors.vue'
import donateBtn from './donateBtn.vue'
import VImg  from 'vuetify/es5/components/VImg/VImg'

export default {
  components: {
    VImg,
    Donors,
    "donate-btn": donateBtn
  },
  methods: {
    showContacts(event){
      const target = event.target
      const contacts = target.parentNode.nextSibling
      contacts.classList.toggle('outlay-proof--show')
    },
    multiplication(num, price) {
      return num * price
    },
    finalSum(outlay) {
      let sumTotal = 0
      for (let item of outlay ) {
        sumTotal = sumTotal + item.num * item.price
      }
      return sumTotal
    }
  },
  computed: {
    outlayBaker(){
      return this.$store.getters.outlayBaker
    }
  },
  created() {
    // this.$store.dispatch('initOutlay', this.$i18n.locale)
  }
};
</script>
