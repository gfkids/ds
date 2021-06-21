<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="400px">
        <v-btn slot="activator" color="green" class="edit-button">
          <v-icon>edit</v-icon>
          <span>{{ $t('edit-time') }}</span>
        </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('edit-time') }}</span>
        </v-card-title>
        <v-time-picker v-model="editableTime"
          class="dialog__picker mt-2"
          format="24hr">
          <template actions>
            <v-btn color="green darken-1" flat @click.native="dialog = false">{{ $t('close') }}</v-btn>
            <v-btn color="green darken-1" flat @click.native="onSaveEdit">{{ $t('save') }}</v-btn>
          </template>
        </v-time-picker>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import VCard from 'vuetify/es5/components/VCard/VCard'
import VBtn from 'vuetify/es5/components/VBtn/VBtn'
import VDialog from 'vuetify/es5/components/VDialog/VDialog'
import VIcon from 'vuetify/es5/components/VIcon/VIcon'
import VTimePicker from 'vuetify/es5/components/VTimePicker/VTimePicker'

  export default {
    components: {
      VCard,
      VBtn,
      VDialog,
      VIcon,
      VTimePicker
    },
    props: {
      project: Object
    },
    data () {
      return {
        dialog: false,
        editableTime: null,
        picker: new Date().toISOString().substr(0, 10)
      }
    },
    methods: {
      onSaveEdit() {
        const newDate = new Date(this.project.date)
        const hours = this.editableTime.match(/^(\d+)/)[1]
        const minutes = this.editableTime.match(/:(\d+)/)[1]
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        this.$store.dispatch("editProject", {
          date: newDate,
          id: this.project.id
        })
        this.dialog = false
      }
    },
    created(){
      this.editableTime = new Date(this.project.date)
    }
  };
</script>
