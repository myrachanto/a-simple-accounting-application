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
<h1>All Unallocated invoices</h1>
 <v-data-table
    :headers="headers"
    :items="invoices"
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
              title:'Receipts allocation',
              source: '/api/receipts/cleared',
              // create: '/payments/create',
              show: '/receipts/cleared',
              headers:[{
          text: 'Id',
          value: 'ID'
        },
        {
          text: 'Code',
          value: 'code'
        },
        {
          text: 'Name',
          value: 'name',
          sortable: false
        },
        {
          text: 'Title',
          value: 'title',
          sortable: false
        },
        {
          text: 'Description',
          value: 'description',
          sortable: false
        },
        {
          text: 'tax',
          value: 'tax'
        },
        {
          text: 'Discount',
          value: 'discount'
        },
        {
          text: 'Total',
          value: 'total'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        }
              ],
              operators:['like'],
             invoices:[],
            
          }
      },

    created(){
          this.GetData()
       },
       methods:{
          async GetData(){
            try{
              const {data} = await axios.get(`${this.source}/${this.$route.params.code}`)
                // const {cleared} = data  
              this.invoices = data
                console.log(data)
            }catch(err){
              console.log(err)
            }
        },  
       }
}
</script>

<style>

</style>