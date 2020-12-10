<template>
<back>
  <v-container>
    <v-row><v-col>
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
      </v-col></v-row>
    <v-row><v-col>
<h1>All Assets</h1>
 <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
  >  
  <template v-slot:[`item.clearancedate`]="{ item }">
      
        {{ formatdate(item.clearancedate) }}
    </template>
  <template v-slot:[`item.amount`]="{ item }">
      
        {{ formatcurrency(item.amount) }}
    </template>
  <template v-slot:[`item.status`]="{ item }">
      <v-chip
        :color="getColor(item.status)"
        dark
      >
        {{ item.status }}
      </v-chip>
    </template>
   <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="View(item.ID)"
              >
                mdi-eye
              </v-icon>
            </template></v-data-table>
  </v-col>
 </v-row>
  </v-container>
</back>
</template>
<script>
import formatMoney from '@/helpers/currencyformat'
import moment from 'moment'
 import axios from '@/axios'
import back from '@/layouts/back'
export default {
      name: 'assetsIndex',
    components:{
        back,
        
    },
      data(){
          return{
            status:'',
            form:{},
              title:'assets',
              source: '/api/assets',
              create: '/assets/create',
              show: '/assets/',
              search : '',
              page:1,
              pagesize:12,
              headers:[
                { text: 'Id', value: 'ID' },
                { text: 'Name', value: 'name' },
                { text: 'Description', value: 'description' },
                { text: 'Ownership', value: 'ownership' },
                { text: 'Price', value: 'price' },
                { text: 'Depreciation type', value: 'depreciationtype' },
                { text: 'Depreciation Rate', value: 'depreciationrate' },
                { text: 'Liscence', value: 'liscence' },
                { text: 'Pin', value: 'pin' },
                { text: 'Actions', value: 'actions', sortable: false },
              ],
                itemos:[
                  "canceled",
                  "cleared",
                ],
             items:[],
            
          }
      },

    created(){
          this.GetData()
       },
       methods:{
      formatcurrency(d) {
          return formatMoney(d)
        },
      formatdate(d) {
          return moment(d).format('L');
        },
        View(id){

          this.$router.push(`${this.show}show/${id }`)
        } ,

        Edit(id){
          this.$router.push(`${this.show}${id}/edit`)
        } ,

        resetFilter(){
            this.search = ''
            this.page=1,
            this.pagesize=12     
            this.GetData()
        },
       async GetData(){
        try{
          let vm = this
           const {data} = await axios.get(`${this.source}?q=${vm.search}&&page=${vm.page}&&pagesize=${vm.pagesize}`)
            this.items = data 

            // console.log(data)
        }catch(err){
           console.log(err)
        }
       }, 
       }
}
</script>

<style>

</style>