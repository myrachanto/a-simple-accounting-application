<template>
<back>
  <v-container>
    <v-row><v-col>
       <v-toolbar
    >
      <v-toolbar-title>{{title}}</v-toolbar-title>
<v-spacer></v-spacer>

      <v-btn >
        Pdf
      </v-btn>

      <v-btn >
        Excel
      </v-btn>
    </v-toolbar>
      </v-col></v-row>
    <v-row><v-col>
<h1>All Unllocated Receipts</h1>
 <v-data-table
    :headers="headers"
    :items="cleared"
    :items-per-page="5"
    class="elevation-1"
  >  <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="View(item.customercode)"
              >
                mdi-eye
              </v-icon>
            </template></v-data-table>
  </v-col></v-row>
  </v-container>

</back>
</template>
<script>
 import axios from '@/axios'
import back from '@/layouts/back'
export default {
      name: 'receiptsallocationIndex',
    components:{
        back,
        
    },
      data(){
          return{
            status:'',
            form:{},
              title:'Receipts',
              source: '/api/receipts/cleared',
              // create: '/payments/create',
              show: '/receipts/allocation',
              headers:[
                { text: 'Id', value: 'ID' },
                { text: 'Name', value: 'customername' },
                { text: 'Description', value: 'description' },
                { text: 'Payment Form', value: 'type' },
                { text: 'Clearance Date', value: 'clearancedate' },
                { text: 'Amount', value: 'amount' },
                { text: 'Status', value: 'status' },
                { text: 'Actions', value: 'actions', sortable: false },
              ],
              operators:['like'],
             cleared:[],
            
          }
      },

    created(){
          this.GetData()
       },
       methods:{
        View(customercode){

          this.$router.push(`${this.show}/${customercode }`)
        },
          async GetData(){
            try{
              const {data} = await axios.get(this.source)
                // const {cleared} = data  
              this.cleared = data
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