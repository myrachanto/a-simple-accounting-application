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
                      <productcard :form="form"/>
                    </v-tab-item>
                    <v-tab-item
                    >
                      <invoicecard :headers="invoiceheaders" :items="invoices"/>
                    </v-tab-item>
                    <v-tab-item
                    >
                      <invoicecard :headers="cnheaders" :items="invoices" />
                    </v-tab-item>

                    <v-tab-item
                    >
                      <v-card-title>Comments on Product</v-card-title>
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
 import productcard from '@/components/cards/productcard'
 import invoicecard from '@/components/cards/invoicecard'

import back from '@/layouts/back'

export default {
  name: "Customershow",
  components: {
      back,
      productcard,
      invoicecard
    },
  data(){
    return{
       form:{},
        errs:{},
        option:{},
        title:'Create',
        init:'api/products',
        redirect: '/products',
        store: 'api/products',
        method: 'post',
        snackbar:false,
        timeout:3000,
        tab: null,
        items: [
          'Product', 'Invoices', 'Credit Notes', 'Remarks',
        ],
        invoiceheaders:[
          { text: 'Name', value: 'name' },
          { text: 'Invoice No', value: 'invoiceno' },
          { text: 'Amount', value: 'amount' },
          { text: 'Payment Status', value: 'paymentstatus'},
          { text: 'View', value: 'View'},
        ],
        invoices:[],
        cnheaders:[
          { text: 'Name', value: 'name' },
          { text: 'Credit Note No', value: 'invoiceno' },
          { text: 'Amount', value: 'amount' },
          { text: 'Payment Status', value: 'paymentstatus'},
          { text: 'View', value: 'View'},
        ],
        creditnotes:[],
      
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