<template>
  <v-card v-if="form"
            class="mx-auto"
          >
           <!-- <div
           class="height=300px"
           style="background:#CFD8DC"
           >
            <div class="d-flex justify-center">
              
            </div>  
            </div> -->
            <v-container>
            <v-row>
              <v-col md="6">
            <v-card-title class="display-1">Product Name:   {{form.name}}</v-card-title>
            <v-card-title >Title:   {{form.title}}</v-card-title>
            <v-card-title >Category:   {{form.category}}</v-card-title>
            <v-card-title >Major category:   {{form.majorcategory}}</v-card-title>
            <v-card-title >Description:   {{form.description}}</v-card-title>
            <v-card-title >Price:   ${{form.sprice}}</v-card-title>
              </v-col>
              <v-col md="6">
                <v-img v-if="form.picture"
              max-height="350"
              max-width="350"
              contain
              class="pa-7 "
              :src="`${host}/imgs/products/${form.picture}`"
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