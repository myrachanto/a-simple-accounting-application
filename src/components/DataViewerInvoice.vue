<template>
<v-container>
  <v-row>
<v-col  cols="12">
    <v-toolbar
    >
<v-toolbar-title>{{title}}</v-toolbar-title>
<v-spacer></v-spacer>

      <v-btn :to="create">
        Create
      </v-btn>

      <v-btn >
        Pdf
      </v-btn> 

      <v-btn >
        Excel
      </v-btn>
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
          md="3"
        >
          <v-text-field
            v-model="search"
            label="Search query"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="2">
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
      md="2"
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
      md="2"
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
      @click="GetData"
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

          <v-data-table
            :headers="headers"
            :items="items"
            item-key="ID"
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
          <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="View(item.code)"
              >
                mdi-eye
              </v-icon>
              <v-btn color="red" dark  @click="Edit(item.code)">Cancel</v-btn>
          
            </template>
            
          </v-data-table>
</v-col>
  </v-row></v-container>
</template>
<script>
import moment from 'moment'
import formatMoney from '@/helpers/currencyformat'
 import axios from '@/axios'
  export default {
    
    props: ['source', 'headers', 'create', 'title','show'],
    data(){
        return{
            items:[],
            showFilter: false,
            search:'',
            dated:'',
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
      formatcurrency(d) {
          return formatMoney(d)
        },
        selected(val){
          if (val === 'custom'){
            this.custom = true
          }else {
            this.custom = false
          }
        },

      formatdate(d) {
          return moment(d).format('L');
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
          let p = this
            // console.log(token)
           const {data} = await axios.get(`${this.source}?search=${p.search}&dated=${p.dated}&searchq2=${p.searchq2}&searchq3=${p.searchq3}`)
            this.items = data  

            // console.log(data)
        }catch(err){
           console.log(err)
        }
    },  
    
    View(id){

      this.$router.push(`${this.show}show/${id }`)
    } ,

    Edit(id){
      this.$router.push(`${this.show}${id}/edit`)
    } ,
    }
  }
</script>
<style>

</style>