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
                        New Receipt No# {{code}}
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
                                    >  <v-autocomplete
                                        v-model="customer"
                                        :items="customers"
                                        chips
                                        clearable
                                        hide-details
                                        hide-selected
                                        item-text="name"
                                        item-value="name"
                                        label="Search Customer..."
                                        solo
                                      >
                                        <template v-slot:no-data>
                                          <v-list-item>
                                            <v-list-item-title>
                                              Search for 
                                              <strong>Customer</strong>
                                            </v-list-item-title>
                                          </v-list-item>
                                        </template>
                                        <template v-slot:selection="{ attr, on, item, selected }">
                                          <v-chip
                                            v-bind="attr"
                                            :input-value="selected"
                                            color="blue-grey"
                                            class="white--text"
                                            v-on="on"
                                          >
                                            <v-icon left>
                                              mdi-account-circle
                                            </v-icon>
                                            <span v-text="item.name"></span>
                                          </v-chip>
                                        </template>
                                        <template v-slot:item="{ item }">
                                          <v-list-item-avatar
                                            color="indigo"
                                            class="headline font-weight-light white--text"
                                          >
                                            {{ item.name.charAt(0) }}
                                          </v-list-item-avatar>
                                          <v-list-item-content>
                                            <v-list-item-title v-text="item.name"></v-list-item-title>
                                            <v-list-item-subtitle >{{item.company}}</v-list-item-subtitle>
                                          </v-list-item-content>
                                          <v-list-item-action>
                                            <v-icon>mdi-account-circle</v-icon>
                                          </v-list-item-action>
                                        </template>
                                      </v-autocomplete>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="6"
                                    > <v-autocomplete
                                        v-model="pay"
                                        :items="paymentforms"
                                        chips
                                        clearable
                                        hide-details
                                        hide-selected
                                        item-text="name"
                                        item-value="name"
                                        label="Search Payment form..."
                                        solo
                                      >
                                        <template v-slot:no-data>
                                          <v-list-item>
                                            <v-list-item-title>
                                              Search for 
                                              <strong>Payment form</strong>
                                            </v-list-item-title>
                                          </v-list-item>
                                        </template>
                                        <template v-slot:selection="{ attr, on, item, selected }">
                                          <v-chip
                                            v-bind="attr"
                                            :input-value="selected"
                                            color="blue-grey"
                                            class="white--text"
                                            v-on="on"
                                          >
                                            <v-icon left>
                                              mdi-cash-plus
                                            </v-icon>
                                            <span v-text="item.name"></span>
                                          </v-chip>
                                        </template>
                                        <template v-slot:item="{ item }">
                                          <v-list-item-avatar
                                            color="indigo"
                                            class="headline font-weight-light white--text"
                                          >
                                            {{ item.name.charAt(0) }}
                                          </v-list-item-avatar>
                                          <v-list-item-content>
                                            <v-list-item-title v-text="item.name"></v-list-item-title>
                                            <v-list-item-subtitle >{{item.description}}</v-list-item-subtitle>
                                          </v-list-item-content>
                                          <v-list-item-action>
                                            <v-icon>mdi-cash-plus</v-icon>
                                          </v-list-item-action>
                                        </template>
                                      </v-autocomplete>
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
                                        v-model="form.clearancedate"
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
                                     <v-select
                                     v-model="form.status"
                                    :items="itemos"
                                    :error-messages="errors"  
                                    label="Status"
                                  ></v-select>
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
            description:'',
            code:''
        },
        itemos:[
          "pending",
          "cleared",
        ],
        errs:{},
        pay:'',
        customer:'',
        customers:[],
        code: '',
        paymentforms:[],
        title:'Create',
        init:'api/receipts/view',
        redirect: '/receipts',
        store: 'api/receipts',
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
     
   async save(){
      try{
            let fd = new FormData();
                 fd.append("customername", this.customer)
                 fd.append("amount", this.form.amount)
                 fd.append("description", this.form.description)
                 fd.append("clearancedate", this.form.clearancedate)
                 fd.append("status", this.form.status)
                 fd.append("type", this.pay)
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
          const { customers, code, paymentforms } = data
            this.customers = customers
            this.paymentforms = paymentforms
            this.code = code
        }catch(err){
           console.log(err)
        }
    },  
  }
  }
</script>

<style>

</style>