<template>
  <v-card v-if="form"
            class="mx-auto"
          >
           <div
           class="height=200px"
           style="background:#CFD8DC"
           >
            <div class="d-flex justify-center">
              <v-img v-if="form.picture"
              max-height="150"
              max-width="150"
              contain
              class="pa-7 secondary rounded-circle "
              :src="`${host}/imgs/suppliers/${form.picture}`"
            ></v-img>
            </div>  
            </div>
            <v-card-title class="display-1">Name:   {{form.name}}</v-card-title>
            <v-card-title >Company:   {{form.company}}</v-card-title>
            <v-card-title >Phone:   {{form.phone}}</v-card-title>
            <v-card-title >Email:   {{form.email}}</v-card-title>

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