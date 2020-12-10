<template>  
<back>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
                  <ValidationObserver
                    ref="observer"
                    v-slot="{}"
                  >
               <v-row class="fill-height">
                 <v-col cols="12" md="12">
                    <v-card-text class="mt-12">
                      <h1 class="text-center display-2 teal--text text--accent-3">
                        New Payment No# {{code}}
                      </h1>
                      
                      <template >  
                                  <v-snackbar
                                  :timeout="timeout"
                                  v-model="snackbar"
                                  :value="true"
                                  absolute
                                  left
                                  shaped
                                  top
                                  dismisable
                                  color="red"
                                >
                              <h2>{{errs.error}}</h2>
                              <p>{{errs.message}}</p>
                                </v-snackbar>
                            
                          </template>
                        <v-form>
                                 <v-container>
                                  <v-row>
                                    <v-col
                                      cols="12"
                                      md="4"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="name"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.name"
                                        :error-messages="errors"      
                                        label="Name"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                    > <validation-provider
                                        v-slot="{ errors }"
                                        name="ownership"
                                        rules="required"
                                      >
                                     <v-select
                                     v-model="form.ownership"
                                    :items="ownerships"
                                    :error-messages="errors"  
                                    label="Ownership"
                                  ></v-select>
                                      </validation-provider>
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      md="4"
                                    > <validation-provider
                                        v-slot="{ errors }"
                                        name="price"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.price"
                                        :error-messages="errors"      
                                        label="Price"
                                        type="Number"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col
                                      cols="12"
                                      md="4"
                                    > <validation-provider
                                        v-slot="{ errors }"
                                        name="depreciationrate"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.depreciationrate"
                                        :error-messages="errors"      
                                        label="Depreciation Rate"
                                        type="number"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      md="4"
                                    > <validation-provider
                                        v-slot="{ errors }"
                                        name="depreciation type"
                                        rules="required"
                                      >
                                     
                                     <v-select
                                     v-model="form.depreciationtype"
                                    :items="deps"
                                    :error-messages="errors"  
                                    label="Deprecviation Type"
                                  ></v-select>
                                      </validation-provider>
                                    </v-col>
                                     <v-col
                                      cols="12"
                                      md="4"
                                    > <validation-provider
                                        v-slot="{ errors }"
                                        name="liscence"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.liscence"
                                        :error-messages="errors"      
                                        label="Liscence"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col
                                      cols="12"
                                      md="4"
                                    > <validation-provider
                                        v-slot="{ errors }"
                                        name="pin"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.pin"
                                        :error-messages="errors"      
                                        label="Pin"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                  </v-row>
                                   <v-row>
                                    <v-col
                                      cols="12"
                                      md="12"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Description"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.description"
                                        label="Description"
                                        :error-messages="errors" 
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                  </v-row>
                                   <v-row>
                                    <v-col
                                      cols="12"
                                      md="6"
                                    >   <v-file-input
                                        accept="image/*"
                                        label="Change Image"
                                        required
                                        type="file"
                                        @change="onFile"
                                      ></v-file-input>
                                      </v-col>
                                      <v-col
                                      cols="12"
                                      md="6"
                                    >   
                                      </v-col>
                                  </v-row>
                                </v-container>
                        
                      </v-form>
                      <!-- <h3 class="text-center mt-3">have an account with us </h3> -->
                    </v-card-text>
                    <div class="text-center mt-3">
                      <v-btn class="ma-3" dark @click="Back()">Back</v-btn>
                      <v-btn class="ma-3" color="teal accent-3" @click="save">Save</v-btn>
                    </div>
                    </v-col>
               </v-row>
                  </ValidationObserver>
              
          </v-card>
        </v-col>
      </v-row>
    </v-container>

</back>
</template>

<script>
 import axios from '@/axios'

import back from '@/layouts/back'
  import { required, email, max } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
 setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

export default {
  name: "login",
  components: {
      ValidationProvider,
      ValidationObserver,
      back
    },
  data(){
    return{
        form:{
            name:'',
            ownership:'',
            price:0,
            depreciationtype: '',
            depreciationrate:0,
            liscence:'',
            pin:'',
            description:'',
            picture:{}
        },
        ownerships:['company','other'],
        deps:['simple'],
        errs:{},
        code:'',
        asset:'',
        assets:[],
        title:'Create',
        init:'api/assets/view',
        redirect: '/assets',
        store: 'api/assets',
        method: 'post',
        snackbar:false,
        timeout:3000
    }
  },
  created(){
    this.fetchData()
  },
  methods:{
    Back(){
      this.$router.push(this.redirect)
    },
    onFile(e){
      console.log(e)
      this.form.picture = e
    },
     
   async save(){
      try{
            let fd = new FormData();
                 fd.append("picture", this.form.picture, this.form.picture.name)
                 fd.append("name", this.form.name)
                 fd.append("ownership", this.form.ownership)
                 fd.append("description", this.form.description)
                 fd.append("price", this.form.price)
                 fd.append("depreciationtype", this.form.depreciationtype)
                 fd.append("depreciationrate", this.form.depreciationrate)
                 fd.append("liscence", this.form.liscence)
                 fd.append("pin", this.form.pin)
                 fd.append("code", this.code)
                fd.append("usercode", this.$store.getters.usercode);
                const {data} = await axios.post(this.store, fd ,{'Content-Type': 'multipart/form-data'})
              if(data){
                this.$router.push(this.redirect)
                }
        }catch(err){
            this.snackbar = true
            console.log(err)
            this.errs = err.response.data
    
        }
    },
    async fetchData(){
        try{
            // console.log(token)
           const {data} = await axios.get(`${this.init}`)
            this.code = data
        }catch(err){
           console.log(err)
        }
    },  
  }
  }
</script>

<style>

</style>