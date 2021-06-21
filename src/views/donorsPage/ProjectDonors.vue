<template>
  <section class="donors">
    <section class="donors__pro" v-if="contacts">
      <h1 >{{$t('list')}}</h1>
      <div class="donors__row donors__row--head">
        <div class="donors__cell">{{$t('donation')}}</div>
        <div class="donors__cell">{{$t('nickname')}}</div>
      </div>
      <div v-for="(contact, index) in contacts"
          :key="index">
        <div class="donors__row" v-if="contact.donation !== undefined && contact.donation !== '0'">
          <div class="donors__cell">{{ contact.donation }}&nbsp;<span v-if="Number(contact.donation)">  {{ project.currency }}</span></div>
          <div class="donors__cell">{{ contact.nickname }}</div>
        </div>
      </div>
      <div class="donors__row donors__row--got-donations">
        <div class="donors__cell">{{ gotDonations }} {{ project.currency }}</div>
        <div class="donors__cell">{{$t('Raised')}}</div>
      </div>
      <div class="donors__row donors__row--need-donations">
        <div class="donors__cell">{{ sum }} {{ project.currency }}</div>
        <div class="donors__cell">{{$t('demand')}}</div>
      </div>
      <div class="donors__row donors__row--rest-donations">
        <div class="donors__cell">{{ restDonation }} {{ project.currency }}</div>
        <div class="donors__cell">{{$t('needed')}}</div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  props: {
      id: String,
      sum: Number
  },
  computed: {
    gotDonations() {
      let sumDonations = null
      if(this.contacts){
        for (let i  in this.contacts) {
          if(Number(this.contacts[i].donation)){
            sumDonations = sumDonations + Number(this.contacts[i].donation)
          }
        }
        return sumDonations
      } else {
        return null
      }
    },
    restDonation() {
      let need = this.sum
      let sum = this.gotDonations
      let rest = need - sum
      return rest
    },
    project(){
      return this.$store.getters.project(this.id)
    },
    contacts(){
      return this.project.contacts
    }
  }
};
</script>

<style lang="sass">
  @import "@/sass/_donors.sass"
</style>
