<template>  
<back>
  <v-container>
    <v-row>
<v-col cols="12">
    <v-toolbar
    
    >
<v-toolbar-title>Customer Details</v-toolbar-title>
<v-spacer></v-spacer>

    </v-toolbar>
    <template>
  <v-expansion-panels>
    <v-expansion-panel
    >
      <v-expansion-panel-header>
        Search
      </v-expansion-panel-header>
      <v-expansion-panel-content>
       <v-row>
        <v-col
          cols="12"
          md="4">
           <v-select
          :items="filters"
          label="Search Date"
          v-model="dated"
          @change="selected(dated)"
        ></v-select>
        </v-col>
        <v-col
      cols="12"
      sm="6"
      md="3"
      v-if="custom"
    >
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
            v-model="searchq2"
            label="Between Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="searchq2"
          @input="menu = false"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="3"
      v-if="custom"
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
            v-model="searchq3"
            label="And Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="searchq3"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
    </v-col>

        <v-col
          cols="12"
          md="2"
        >
         <v-btn class="ma-2" 
      depressed
      color="success"
      @click="GetData()"
    >
      Search
    </v-btn>
         <v-btn class="ma-2" 
      depressed
      color="primary"
      @click="resetFilter"
    >
      Reset
    </v-btn>
        </v-col>
      </v-row></v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
    </template>
   
</v-col>
  </v-row>
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
                      <suppliercard :form="form"/>
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
                      <v-card-title>Comments on supplier</v-card-title>
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
 import suppliercard from '@/components/cards/customercard'
 import invoicecard from '@/components/cards/sinvoicecard'

import back from '@/layouts/back'

export default {
  name: "suppliershow",
  components: {
      back,
      suppliercard,
      invoicecard
    },
  data(){
    return{
       form:{}, 
        errs:{},
        option:{},
        title:'Create',
        init:'api/supplier',
        redirect: '/supplier',
        store: 'api/supplier',
        show: '/supplier/',
        method: 'post',
        snackbar:false,
        timeout:3000,
        tab: null,
        items: [
          'Profile', 'Invoices', 'Good return Notes', 'Remarks',
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
            dated:'In the last 30days',
            searchq2 : '',
            searchq3 : '',
            custom: false,
            // date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            filters:[
              'In the last 24hrs',
              'In the last 7days',
              'In the last 15day',
              'In the last 30days',
              'custom'
            ]
      
    }
  },
  created(){
      this.GetData()
  },
  methods:{
        selected(val){
          if (val === 'custom'){
            this.custom = true
          }else {
            this.custom = false
          }
        },
    
    View(id){
      this.$router.push(`${this.show}show/${id }`)
    } ,
    Edit(id){
      this.$router.push(`${this.redirect}/${id}/edit`)
    },
    Back(){
      this.$router.push(this.redirect)
    },
  
  
        resetFilter(){
            this.search = ''
            this.dated = ''
            this.searchq2 = ''
            this.searchq3 = ''
            this.custom = false
            this.GetData()
        },
      async GetData(){
          try{
            var p = this
              const {data} = await axios.get(`${this.store}/${p.$route.params.id}?dated=${p.dated}&searchq2=${p.searchq2}&searchq3=${p.searchq3}`)
          const {supplier, sinvoices,grns} = data
          this.form = supplier
          this.invoices = sinvoices
          this.credits = grns
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