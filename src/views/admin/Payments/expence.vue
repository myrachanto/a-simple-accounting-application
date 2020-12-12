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
                                      md="6"
                                    >  <v-autocomplete
                                        v-model="expence"
                                        :items="expences"
                                        chips
                                        clearable
                                        hide-details
                                        hide-selected
                                        item-text="name"
                                        item-value="name"
                                        label="Search Expence..."
                                        solo
                                      >
                                        <template v-slot:no-data>
                                          <v-list-item>
                                            <v-list-item-title>
                                              Search for 
                                              <strong>Expence</strong>
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
                                    >
                                    <v-menu
                                          v-model="menu2"
                                          :close-on-content-click="false"
                                          :nudge-right="40"
                                          transition="scale-transition"
                                          offset-y
                                          min-width="290px"
                                        >
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                              v-model="form.clearancedate"
                                              label="Clearance date"
                                              prepend-icon="mdi-calendar"
                                              readonly
                                              v-bind="attrs"
                                              v-on="on"
                                            ></v-text-field>
                                          </template>
                                          <v-date-picker
                                            v-model="form.clearancedate"
                                            @input="menu2 = false"
                                          ></v-date-picker>
                                        </v-menu>
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
                                      md="4"
                                    > <validation-provider
                                        v-slot="{ errors }"
                                        name="chequeno"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.chequeno"
                                        :error-messages="errors"      
                                        label="Cheque Number"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4">
                                    <v-menu
                                          v-model="menu"
                                          :close-on-content-click="false"
                                          :nudge-right="40"
                                          transition="scale-transition"
                                          offset-y
                                          min-width="290px"
                                        >
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                              v-model="form.expirydate"
                                              label="Expiry date"
                                              prepend-icon="mdi-calendar"
                                              readonly
                                              v-bind="attrs"
                                              v-on="on"
                                            ></v-text-field>
                                          </template>
                                          <v-date-picker
                                            v-model="form.expirydate"
                                            @input="menu = false"
                                          ></v-date-picker>
                                        </v-menu>
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
            code:'',
            chequeno:'',
            expirydate:null
        },
        menu: false,
        menu2: false,
        modal: false,
        itemos:[
          "pending",
          "cleared",
        ],
        errs:{},
        pay:'',
        expence:'',
        expences:[],
        code: '',
        paymentforms:[],
        title:'Create',
        init:'api/payments/viewexpence',
        redirect: '/payments',
        store: 'api/payments',
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
                 fd.append("suppliername", this.expence)
                 fd.append("amount", this.form.amount)
                 fd.append("description", this.form.description)
                 fd.append("clearancedate", this.form.clearancedate)
                 fd.append("status", this.form.status)
                 fd.append("expirydate", this.form.expirydate)
                 fd.append("chequeno", this.form.chequeno)
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
          const {code,expences, paymentforms } = data
            this.expences = expences
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