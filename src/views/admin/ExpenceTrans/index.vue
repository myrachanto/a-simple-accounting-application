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
          md="8"
        >
          <v-text-field
            v-model="search"
            label="Search query"
            required
            @keyup.enter="GetData"
          ></v-text-field>
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
      </v-col></v-row>
    <v-row><v-col>
<h1>All Expences</h1>
 <v-data-table
    :headers="headers"
    :items="expences"
    :items-per-page="5"
    class="elevation-1"
  >  
  <template v-slot:[`item.amount`]="{ item }">
      
        {{ formatcurrency(item.amount) }}
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
  </v-col></v-row>
  </v-container>
</back>
</template>
<script>
import formatMoney from '@/helpers/currencyformat'
 import axios from '@/axios'
import back from '@/layouts/back'
export default {
      name: 'paymentsIndex',
    components:{
        back,
        
    },
      data(){
          return{
            status:'',
            form:{},
              title:'All Expences',
              source: '/api/expencetransanctions',
              create: '/expenceTran/create',
              show: '/expenceTran/',
              dialog: false,
              search:'',
              page:1,
              pagesize:12,
              headers:[
                { text: 'Id', value: 'ID' },
                { text: 'Name', value: 'name' },
                { text: 'Title', value: 'title' },
                { text: 'Description', value: 'description' },
                { text: 'Amount', value: 'amount' },
                { text: 'Actions', value: 'actions', sortable: false },
              ],
                itemos:[
                  "canceled",
                  "cleared",
                ],
             expences:[],
            
          }
      },

    created(){
          this.GetData()
       },
       methods:{
      formatcurrency(d) {
          return formatMoney(d)
        },
        View(id){

          this.$router.push(`${this.show}show/${id }`)
        } ,
        resetFilter(){
                    this.search =''
                    this.page=1,
                    this.pagesize=12     
                    this.GetData()
                },
              async GetData(){
                try{
                  let vm = this
              const {data} = await axios.get(`${this.source}?q=${vm.search}&&page=${vm.page}&&pagesize=${vm.pagesize}`)
                this.expences = data 
                }catch(err){
                  console.log(err)
                }
            }, 
       }
}
</script>

<style>

</style>