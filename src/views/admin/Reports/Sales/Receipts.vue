<template>
<back>
 <v-container fluid>
              <h1>Receipts report</h1>
        <v-row align="center"
              justify="center"
              > 
              <v-col v-if="cleared"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="cleared.Name" :total="formatcurrency(cleared.Total)" 
                 :desc="cleared.Description" :icon="`mdi-cash-usd-outline`" />
                </v-col>
                <v-col v-if="pending"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="pending.Name" :total="formatcurrency(pending.Total)" :desc="pending.Description" :icon="`mdi-cash-usd`"/>
                </v-col>
                <v-col  v-if="canceled"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="canceled.Name" :total="formatcurrency(canceled.Total)" :desc="canceled.Description" :icon="`mdi-cash-remove`" />
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
                <div class="overline mb-4 green--text ">
                        <h2 >All Receipts (Payments for goods and services offered by us</h2>
                </div>
                 <v-data-table
                  :headers="headers"
                  :items="all"
                  item-key="name"
                  class="elevation-1 display-2"
                  style="font-size:10rem"
                :footer-props="{
                    'items-per-page-options': [5,10, 20, 30, 40, 50]
                  }"
                :items-per-page="10"
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
import Dcard from '@/components/cards/dashboardcard'
import back from '@/layouts/back'
export default {
    data(){
    return{
      canceled:{},
      pending:{},
      cleared:{},
      all:[],
      errs:{},
       headers:[
                { text: 'Id', value: 'ID' },
                { text: 'Name', value: 'customername' },
                { text: 'Description', value: 'description' },
                { text: 'Payment Form', value: 'type' },
                { text: 'Clearance Date', value: 'clearancedate' },
                { text: 'Amount', value: 'amount' },
                { text: 'Status', value: 'status' },
              ],
    }
  },

  components:{
    back,
    Dcard
  },
  created() {
      this.fetchData()
      // this.newInvoice()
    
  },
  methods:{
      formatcurrency(d) {
          return formatMoney(d)
        },
      formatdate(d) {
          return moment(d).format('L');
        },
      getColor (status) {
              if (status === "canceled") return 'red'
              else if (status === "pending") return 'orange'
              else return 'green'
            },
    async fetchData(){
      try{
          const {data} = await axios.get("api/receipts/report")
          this.dcards = data
           const { all, cleared,pending,canceled } = data
           this.all = all
           this.cleared = cleared
           this.pending = pending
           this.canceled = canceled
          //  console.log(debtors,transactions)
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