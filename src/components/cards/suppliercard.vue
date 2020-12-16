<template>
  <v-card v-if="form"
            class="mx-auto"
          >
           
            <v-container>
            <v-row>
              <v-col md="6">
            <v-card-title class="display-1">Name:   {{form.name}}</v-card-title>
            <v-card-title >Company:   {{form.company}}</v-card-title>
            <v-card-title >Phone:   {{form.phone}}</v-card-title>
            <v-card-title >Email:   {{form.email}}</v-card-title>
            </v-col>
              <v-col md="6">
                <v-img v-if="form.picture"
              max-height="350"
              max-width="350"
              contain
              class="pa-7 "
              :src="`${host}/imgs/suppliers/${form.picture}`"
            ></v-img>
              </v-col></v-row>
            </v-container>
          </v-card>
</template>

<script> 
import cons from '@/helpers/myconstants'
export default {
  props:{
    form: Object
  }, 
  data(){
    return{
        host:'',
    }
  },
  created(){
      this.host = cons.host
  }

}
</script>

<style>

</style>