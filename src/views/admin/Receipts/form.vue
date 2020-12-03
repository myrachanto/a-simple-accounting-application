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
                        New Receipts
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
                                        name="customername"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.customername"
                                        :error-messages="errors"      
                                        label="Customer Name"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="6"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="paymentForm"
                                        rules="required|"
                                      >
                                      <v-text-field
                                        v-model="form.type"
                                        label="Payment Form"
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
                                    > <validation-provider
                                        v-slot="{ errors }"
                                        name="amount"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.amount"
                                        :error-messages="errors"      
                                        label="Amount"
                                        type="number"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Clearancedate"
                                        rules="required|"
                                      >
                                      <v-text-field
                                        v-model="form.Clearancedate"
                                        label="Clearance Date"
                                        type="date"
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
                                        name="status"
                                        rules="required|"
                                      >
                                      <v-text-field
                                        v-model="form.status"
                                        label="status"
                                        type="text"
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
            customername:'',
            type:'',
            amount:0,
            status: '',
            clearancedate:null,
            description:''
        },
        errs:{},
        option:[],
        title:'Create',
        // init:'api/tax/view',
        redirect: '/receipts',
        store: 'api/receipts',
        method: 'post',
        snackbar:false,
        timeout:3000
    }
  },
  methods:{
    Back(){
      this.$router.push(this.redirect)
    },
    
   async save(){
      try{
            let fd = new FormData();
                 fd.append("customername", this.form.customername)
                 fd.append("amount", this.form.amount)
                 fd.append("description", this.form.description)
                 fd.append("clearancedate", this.form.clearancedate)
                 fd.append("status", this.form.status)
                 fd.append("type", this.form.type)
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