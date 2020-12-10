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
                                        name="creditor"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.creditor"
                                        :error-messages="errors"      
                                        label="Creditor"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      md="4"
                                    > <v-autocomplete
                                        v-model="user"
                                        :items="users"
                                        chips
                                        clearable
                                        hide-details
                                        hide-selected
                                        item-text="uname"
                                        item-value="uname"
                                        label="Search User..."
                                        solo
                                      >
                                        <template v-slot:no-data>
                                          <v-list-item>
                                            <v-list-item-title>
                                              Search for 
                                              <strong>User</strong>
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
                                            <span v-text="item.uname"></span>
                                          </v-chip>
                                        </template>
                                        <template v-slot:item="{ item }">
                                          <v-list-item-avatar
                                            color="indigo"
                                            class="headline font-weight-light white--text"
                                          >
                                            {{ item.uname.charAt(0) }}
                                          </v-list-item-avatar>
                                          <v-list-item-content>
                                            <v-list-item-title v-text="item.fname"></v-list-item-title>
                                            <v-list-item-subtitle >{{item.uname}}</v-list-item-subtitle>
                                          </v-list-item-content>
                                          <v-list-item-action>
                                            <v-icon>mdi-account-circle</v-icon>
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
                                    > <validation-provider
                                        v-slot="{ errors }"
                                        name="interest rate"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.interestrate"
                                        :error-messages="errors"      
                                        label="Interest Rate"
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
                                        name="payment period"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.paymentperiod"
                                        :error-messages="errors"      
                                        label="Payment period"
                                        type="number"
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
                                        name="amount interest"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.amountinterest"
                                        :error-messages="errors"      
                                        label="Total interest"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                    > <validation-provider
                                        v-slot="{ errors }"
                                        name="monthly payment"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.monthlypayment"
                                        :error-messages="errors"      
                                        label="Monthly payment "
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
            name:'',
            creditor:'',
            approvedby:'',
            amount: 0,
            interestrate:0,
            paymentperiod:0,
            amountinterest:0,
            monthlypayment:0,
            description:''
        },
        errs:{},
        code:'',
        user:{},
        users:[],
        liability:'',
        liabilitys:[],
        title:'Create',
        init:'api/liability/view',
        redirect: '/liability',
        store: 'api/liability',
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
                 fd.append("name", this.user)
                 fd.append("creditor", this.form.creditor)
                 fd.append("description", this.form.description)
                 fd.append("approvedby", this.form.approvedby)
                 fd.append("amount", this.form.amount)
                 fd.append("interestrate", this.form.interestrate)
                 fd.append("paymentperiod", this.form.paymentperiod)
                 fd.append("monthlypayment", this.form.monthlypayment)
                 fd.append("amountinterest", this.form.amountinterest)
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
           const {code, users} = data
            this.code = code
            this.users = users
        }catch(err){
           console.log(err)
        }
    },  
  }
  }
</script>

<style>

</style>