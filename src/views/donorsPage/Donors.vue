<template>
  <section class="donors">
    <!-- <button class="btn" @click="showList">{{$t('open-donors')}}</button> -->
    <!-- <section class="donors__pro" v-if="showParticipants"> -->
    <section class="donors__pro">
      <h1 >{{$t('list')}}</h1>
      <div class="donors__row donors__row--example donors__row--head">
        <div class="donors__cell donors__cell--example">{{$t('donation')}}</div>
        <div class="donors__cell donors__cell--example">{{$t('nickname')}}</div>
      </div>
      <div v-for="donor in donors"
          :key="donor.pseudo">
        <div class="donors__row donors__row--example">
          <div class="donors__cell donors__cell--example">{{ donor.donation }} </div>
          <div class="donors__cell donors__cell--example">{{ donor.pseudo }}</div>
        </div>
      </div>
      <div class="donors__row donors__row--example donors__row--got-donations">
        <div class="donors__cell">{{ gotDonations(donors) }} $</div>
        <div class="donors__cell">{{$t('Raised')}}</div>
      </div>
      <div class="donors__row donors__row--example donors__row--need-donations">
        <div class="donors__cell">{{ needDonations(outlayBaker) }} $</div>
        <div class="donors__cell">{{$t('demand')}}</div>
      </div>
      <div class="donors__row donors__row--example donors__row--rest-donations">
        <div class="donors__cell">{{ restDonation(outlayBaker, donors)}} $</div>
        <div class="donors__cell">{{$t('needed')}}</div>
      </div>
    </section>
  </section>
</template>

<script>
import donors from "./../../data/donorsEn.js"
export default {
  data() {
    return {
      outlayBaker: [],
      donors: donors,
      showParticipants: false
    }
  },
  methods: {
    showList(){
      this.showParticipants = !this.showParticipants
    },
    gotDonations(donations) {
      let sumDonations = null
      for (let item of donations) {
        if(Number(item.donation)){
          sumDonations = sumDonations + Number(item.donation)
        }
      }
      return sumDonations
    },
    needDonations(outlay) {
      let sum = 0
      for (let item of outlay ) {
        sum = sum + item.num * item.price
      }
      return sum
    },
    restDonation(outlay, donations) {
      let need = this.needDonations(outlay)
      let sum = this.gotDonations(donations)
      let rest = need - sum
      return rest
    }
  },
  created () {
    this.$store.dispatch('initOutlay')
    this.outlayBaker = this.$store.getters.outlayBaker
  }
};
</script>

<style lang="sass">
  @import "@/sass/_donors.sass"
</style>
