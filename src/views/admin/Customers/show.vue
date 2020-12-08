<template>  
<back>
  <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
              <v-card color="basil">
                  <v-card-title class="text-center justify-center py-6">
                    <h1 class="font-weight-bold display-3 basil--text">
                      {{form.name}}
                    </h1>
                  </v-card-title>

                  <v-tabs
                    v-model="tab"
                    background-color="transparent"
                    color="basil"
                    grow
                  >
                    <v-tab
                      v-for="item in items"
                      :key="item"
                    >
                      {{ item }}
                    </v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="tab">
                    <v-tab-item
                    >
                      <customercard :form="form"/>
                    </v-tab-item>
                    <v-tab-item
                    >
                      <invoicecard :headers="invoiceheaders" :items="invoices" />
                    </v-tab-item>
                    <v-tab-item
                    >
                      <invoicecard :headers="cnheaders" :items="credits" />
                    </v-tab-item>

                    <v-tab-item
                    >
                      <v-card-title>Comments on customer</v-card-title>
                    </v-tab-item>
                  </v-tabs-items>
                    <v-card-actions>
              <v-btn
                color="orange"
                text
                @click="Back()"
              >
                Back
              </v-btn>

              <v-btn
                color="orange"
                text
                @click="Edit(form.ID)"
              >
                Edit
              </v-btn>
            </v-card-actions>
                </v-card>




          
        </v-col></v-row>
  </v-container>
</back>
</template>

<script>
 import axios from '@/axios'
 import customercard from '@/components/cards/customercard'
 import invoicecard from '@/components/cards/invoicecard'

import back from '@/layouts/back'

export default {
  name: "Customershow",
  components: { 
      back,
      customercard,
      invoicecard
    },
  data(){
    return{
       form:{},
        errs:{},
        option:{},
        title:'Create',
        init:'api/customer',
        redirect: '/customer',
        store: 'api/customer',
        show: '/customer/',
        method: 'post',
        snackbar:false,
        timeout:3000,
        tab: null,
        items: [
          'Profile', 'Invoices', 'Credit Notes', 'Remarks',
        ],
        invoiceheaders:[
         { text: 'Name', value: 'name' },
          { text: 'Invoice No', value: 'code' },
          { text: 'Description', value: 'description' },
          { text: 'Amount', value: 'total' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        invoices:[],
        credits:[],
        cnheaders:[
          { text: 'Name', value: 'name' },
          { text: 'Invoice No', value: 'code' },
          { text: 'Description', value: 'description' },
          { text: 'Amount', value: 'total' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        creditnotes:[],
      
    }
  },
  created(){
      this.fetchData()
  },
  methods:{
    
    View(id){
      this.$router.push(`${this.show}show/${id }`)
    } ,
    Edit(id){
      this.$router.push(`${this.redirect}/${id}/edit`)
    },
    Back(){
      this.$router.push(this.redirect)
    },
  
  async fetchData(){
      try{
          const {data} = await axios.get(`${this.store}/${this.$route.params.id}`)
          const {customer, invoices,credits} = data
          this.form = customer
          this.invoices = invoices
          this.credits = credits
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