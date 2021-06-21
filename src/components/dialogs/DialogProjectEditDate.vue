<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="400px"  >
        <v-btn slot="activator" color="green" class="edit-button">
          <v-icon>edit</v-icon>
          <span>{{ $t('edit-date') }}</span>
        </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('edit-date') }}</span>
        </v-card-title>
        <v-date-picker v-model="editableDate"
          class="dialog__picker mt-2">
          <template actions>
            <v-btn color="green darken-1" flat @click.native="dialog = false">{{ $t('close') }}</v-btn>
            <v-btn color="green darken-1" flat @click.native="onSaveEdit">{{ $t('save') }}</v-btn>
          </template>
        </v-date-picker>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import VCard from 'vuetify/es5/components/VCard/VCard'
import VBtn from 'vuetify/es5/components/VBtn/VBtn'
import VDialog from 'vuetify/es5/components/VDialog/VDialog'
import VIcon from 'vuetify/es5/components/VIcon/VIcon'
import VDatePicker from 'vuetify/es5/components/VDatePicker/VDatePicker'


  export default {
    components: {
      VCard,
      VBtn,
      VDialog,
      VIcon,
      VDatePicker
    },
    props: {
      project: Object
    },
    data () {
      return {
        dialog: false,
        editableDate: null
      }
    },
    methods: {
      onSaveEdit() {
        const newDate = new Date(this.project.date)
        const newDay = new Date(this.editableDate).getUTCDate()
        const newMonth = new Date(this.editableDate).getUTCMonth()
        const newYear = new Date(this.editableDate).getUTCFullYear()
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        this.$store.dispatch("editProject", {
          date: newDate,
          id: this.project.id
        })
        this.dialog = false
      }
    },
    created(){
      this.editableData = new Date(this.project.date)
    }
  };
</script>
