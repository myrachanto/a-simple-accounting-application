<template>
<back>
 <v-container fluid>
      <v-row>
<v-col cols="12">
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
      v-if="dated === 'custom'"
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
      v-if="dated === 'custom'"
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

 <v-row align="center"
              justify="center"
              > 
             
              <v-col
                class="auto"
                cols="12"
                sm="8"
                md="12">
                <div class="green--text " align="center"
              justify="center" v-if="supplier">
                        <h2 >supplier Statement of</h2>
                        <h2 >{{supplier.name}} @ {{supplier.company}}</h2>
                        <h3>for the period running "<span v-if="datos">{{datos}}</span><span v-else>{{query1}} to {{query2}}</span>"</h3>
                </div>
                 <v-data-table
                  :headers="headers"
                  :items="items"
                  item-key="name"
                  class="elevation-1 display-2"
                  style="font-size:10rem"
                :footer-props="{
                    'items-per-page-options': [5,10, 20, 30, 40, 50]
                  }"
                :items-per-page="10"
                >
                <template v-slot:[`item.dated`]="{ item }">
      
        {{ formatdate(item.dated) }}
    </template>
          <template v-slot:[`item.tax`]="{ item }">
              
                {{ formatcurrency(item.tax) }}
            </template>
          <template v-slot:[`item.discount`]="{ item }">
              
                {{ formatcurrency(item.discount) }}
            </template>
          <template v-slot:[`item.total`]="{ item }">
              
                {{ formatcurrency(item.total) }}
            </template>
          <template v-slot:[`item.balance`]="{ item }">
              
                {{ formatcurrency(item.balance) }}
            </template>
            
  <template v-slot:[`item.status`]="{ item }">
      <v-chip
        :color="getColor(item.status)"
        dark
      >
        {{ item.status }}
      </v-chip>
    </template>
          <template v-slot:[`item.amount`]="{ item }">
              
                {{ formatcurrency(item.amount) }}
            </template>
                <template v-slot:[`item.created_at`]="{ item }">
      
        {{ formatdate(item.created_at) }}
    </template></v-data-table>
              </v-col>
            </v-row>
  </v-container>
</back>
</template>

<script>
import moment from 'moment'
import formatMoney from '@/helpers/currencyformat'
import axios from '@/axios'
import back from '@/layouts/back'
export default {
      name: 'supplierIndex',
    components:{
        back,
        
    },
      data(){
          return{
              title:'supplier',
              supplier:'',
              datos:'',
              query1:'',
              query2:'',
              store: 'api/supplier/statement/',
              // create: '/supplier/create',
              show: '/supplier/',
              items:[],
              headers:[
                { text: 'Description', value: 'description' },
                { text: 'Tax', value: 'tax' },
                { text: 'Discount', value: 'discount' },
                { text: 'Total', value: 'total' },
                { text: 'Balance', value: 'balance' },
                { text: 'Dated', value: 'dated' },
                { text: 'Amount paid', value: 'amount' },
                { text: 'Status', value: 'status' },
                { text: 'Created at', value: 'created_at'},
              ],
            dated:'In the last 30days',
            searchq2 : '',
            searchq3 : '',
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
      formatcurrency(d) {
          return formatMoney(d)
        },

        getColor (status) {
                if (status === "canceled") return 'red'
                else if (status === "pending") return 'orange'
                else return 'green'
              },
      formatdate(d) {
          return moment(d).format('L');
        },

        selected(val){
          if (val === 'custom'){
            this.custom = true
          }else {
            this.custom = false
          }
        },
        resetFilter(){
                  this.dated = 'In the last 30days'
                  this.searchq2 = ''
                  this.searchq3 = ''
                  this.GetData()
              },
            async GetData(){
                try{
                  var p = this
                    const {data} = await axios.get(`${this.store}${p.$route.params.code}?dated=${p.dated}&searchq2=${p.searchq2}&searchq3=${p.searchq3}`)
                    const {statements, supplier, datos, query1, query2} = data
                    this.items = statements
                    this.supplier = supplier
                    this.datos = datos,
                    this.query1 = query1
                    this.query2 =query2
                  }catch(err){
                  this.snackbar = true
                  //   console.log(err)
                  this.errs = err.response.data
                  }
              }
      }
}
</script>

<style>

</style>