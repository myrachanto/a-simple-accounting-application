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
                        New category
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
                                      md="6"
                                    > <validation-provider
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
                                      md="6"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Company"
                                        rules="required|"
                                      >
                                      <v-text-field
                                        v-model="form.company"
                                        label="Company"
                                        :error-messages="errors"   
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                  </v-row>
                                   <v-row>
                                  <v-col
                                      cols="12"
                                      md="4"
                                  >
                                   <validation-provider
                                        v-slot="{ errors }"
                                        name="Phone"
                                        rules="required|"
                                      >
                                      <v-text-field
                                        v-model="form.phone"
                                        label="Phone"
                                        :error-messages="errors"   
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                  </v-col>
                                  <v-col
                                      cols="12"
                                      md="4"
                                  >
                                   <validation-provider
                                        v-slot="{ errors }"
                                        name="Password"
                                        rules="required|"
                                      >
                                      <v-text-field
                                        v-model="form.password"
                                        label="Password"
                                        :error-messages="errors"   
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                  </v-col>
                                  <v-col
                                      cols="12"
                                      md="4"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Email"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.email"
                                        label="Email"
                                        :error-messages="errors" 
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
                                        name="Address"
                                        rules="required"
                                      >
                                      <v-textarea
                                        v-model="form.address"
                                        label="Address"
                                        :error-messages="errors" 
                                        required
                                      ></v-textarea>
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
            company:'',
            phone:'',
            address:'',
            email:'',
            password:'',
            picture:{}
        },
        errs:{},
        option:[],
        title:'Create',
        init:'api/supplier/view',
        redirect: '/supplier',
        store: 'api/supplier',
        method: 'post',
        snackbar:false,
        timeout:3000
    }
  },
  methods:{
    onFile(e){
      console.log(e)
      this.form.picture = e
    },
    Back(){
      this.$router.push(this.redirect)
    },
   async save(){
        try{
            let fd = new FormData();
                 fd.append("picture", this.form.picture, this.form.picture.name)
                 fd.append("name", this.form.name)
                 fd.append("company", this.form.company)
                 fd.append("phone", this.form.phone)
                 fd.append("address", this.form.address)
                 fd.append("password", this.form.password)
                 fd.append("email", this.form.email)
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
  }
  }
</script>

<style>

</style>