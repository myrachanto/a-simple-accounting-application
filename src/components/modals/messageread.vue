<template>
    <v-dialog
      v-model="dialog">
      <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{form.title}}
        </v-list-item-title>
        <v-list-item-subtitle>{{form.description}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn 
          color="blue darken-1"
          text
          @click="closeDialogRead()"
        >
          Close
        </v-btn>
    </v-card-actions>
  </v-card>
                
    </v-dialog>
</template>
<script>
  
// import axios from '@/axios'
export default {
  name: "messagereadmodal",

    props: ['dialog','closeDialogRead', 'form'],
    data(){
      return{
      }
    },
  }
</script>