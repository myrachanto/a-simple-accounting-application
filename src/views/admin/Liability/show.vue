<template>  
<back>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="elevation-12">
               <v-row class="fill-height">
              
                 <v-col cols="12" md="12">
                    <v-card-text class="mt-12">
                      <h1 class="text-center display-2 teal--text text--accent-3">
                       liability Information - {{form.code}}
                      </h1>
                                                        <template>
                                    <v-card color="basil">
                                      <v-card-title class="text-center justify-center py-6">
                                        <h1 class="font-weight-bold display-1 basil--text">
                                         {{form.Name}}
                                        </h1>

                                      </v-card-title>
                                        <v-card
                                            color="basil"
                                            flat
                                          >
                                            <v-card-text>
                                              <v-card-title class="text-center display-1">Name: <span class="text-center ml-3 display-1 teal--text text--accent-3">{{form.name}}</span></v-card-title>
                                              <v-card-title class="text-center display-1">Description: <span class="text-center ml-3 display-1 teal--text text--accent-3">{{form.description}}</span></v-card-title>
                                              <v-card-title class="text-center display-1">Creditor: <span class="text-center ml-3 display-1 teal--text text--accent-3">{{form.creditor}}</span></v-card-title>
                                              <v-card-title class="text-center display-1">Approved By: <span class="text-center ml-3 display-1 teal--text text--accent-3">{{form.approvedby}}</span></v-card-title>
                                              <v-card-title class="text-center display-1">Amount: <span class="text-center ml-3 display-1 teal--text text--accent-3">{{form.amount}} /=</span></v-card-title>
                                              <v-card-title class="text-center display-1">Interest Rate: <span class="text-center ml-3 display-1 teal--text text--accent-3">{{form.interestrate}}</span></v-card-title>
                                              <v-card-title class="text-center display-1">Payment Period: <span class="text-center ml-3 display-1 teal--text text--accent-3">{{form.paymentperiod}}</span></v-card-title>
                                              <v-card-title class="text-center display-1">Monthly interest: <span class="text-center ml-3 display-1 teal--text text--accent-3">{{form.amountinterest}}</span></v-card-title>
                                              <v-card-title class="text-center display-1">Monthly Payment: <span class="text-center ml-3 display-1 teal--text text--accent-3">{{form.monthlypayment}}</span></v-card-title>
                                           </v-card-text>
                                          </v-card>

                                      
                                    </v-card>
                                  </template>
                    </v-card-text>
                    <div class="text-center mt-3">
                      <v-btn class="ma-3" dark @click="Back()">Back</v-btn>
                    </div>
                    </v-col>
               </v-row>
              
          </v-card>
        </v-col>
      </v-row>
    </v-container>

</back>
</template>

<script>
 import axios from '@/axios'

import back from '@/layouts/back'

export default {
  name: "liabilityshow",
  components: {
      back
    },
  data(){
    return{
       form:{},
        errs:{},
        option:{},
        title:'Create',
        init:'api/liability',
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
    Edit(id){
      this.$router.push(`${this.redirect}/${id}/edit`)
    },
    Back(){
      this.$router.push(this.redirect)
    },
  
  async fetchData(){
      try{
          const {data} = await axios.get(`${this.store}/${this.$route.params.id}`)
          this.form = data
        }catch(err){
         this.snackbar = true
        //   console.log(err)
        this.errs = err.response.data
        }
    }
  },    
  }
</script>

<style>

</style>