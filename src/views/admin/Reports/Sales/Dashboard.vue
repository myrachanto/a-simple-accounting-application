<template>
<back>
 <v-container fluid>
              <h1>Sales report</h1>
        <v-row align="center"
              justify="center"
              > 
              <v-col v-if="sales"
                class="auto"
                cols="12"
                sm="8"
                md="3">
                 <Dcard :title="sales.Name" :total="sales.Total" 
                 :desc="sales.Description" :icon="`mdi-cash-multiple`" />
                </v-col>
                <v-col v-if="paid"
                class="auto"
                cols="12"
                sm="8"
                md="3">
                 <Dcard :title="paid.Name" :total="paid.Total" :desc="paid.Description" :icon="`mdi-cards-outline`"/>
                </v-col>
                <v-col  v-if="grossprofit"
                class="auto"
                cols="12"
                sm="8"
                md="3">
                 <Dcard :title="grossprofit.Name" :total="grossprofit.Total" :desc="grossprofit.Description" :icon="`mdi-cash-usd-outline`" />
                </v-col> 
                <v-col  v-if="debts"
                class="auto"
                cols="12"
                sm="8"
                md="3">
                 <Dcard :title="debts.Name" :total="debts.Total" :desc="debts.Description" :icon="`mdi-account-multiple`" />
                </v-col> 
      </v-row>

 <v-row align="center"
              justify="center"
              > 
              <v-col 
                class="auto"
                cols="12"
                sm="8"
                md="6">
                <div class="overline mb-4 green--text ">
                        <h2 >Transactions flow</h2>
                </div>
                 <v-data-table
                :headers="transactionheader"
                :items="transactions"
                item-key="ID"
                class="elevation-1 display-2"
                style="font-size:10rem"
              :footer-props="{
                  'items-per-page-options': [5,10, 20, 30, 40, 50]
                }"
              :items-per-page="10"
              > <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="View(item.code)"
              >
                mdi-eye
              </v-icon>
            </template></v-data-table>
              </v-col>
              <v-col
                class="auto"
                cols="12"
                sm="8"
                md="6">
                <div class="overline mb-4 green--text ">
                        <h2 >Debtors flow</h2>
                </div>
                 <v-data-table
                  :headers="debtorheader"
                  :items="debtors"
                  item-key="name"
                  class="elevation-1 display-2"
                  style="font-size:10rem"
                :footer-props="{
                    'items-per-page-options': [5,10, 20, 30, 40, 50]
                  }"
                :items-per-page="10"
                ><template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="View(item.code)"
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
import axios from '@/axios'
import Dcard from '@/components/cards/dashboardcard'
import back from '@/layouts/back'
export default {
    data(){
    return{
      paid:{},
      debts:{},
      sales:{},
      grossprofit:{},
      debtors:[],
      creditnotes:[],   
      transactions:[],
      errs:{},
      transactionheader:[
          { text: 'Name', value: 'name' },
          { text: 'Invoice No', value: 'code' },
          { text: 'Quantity', value: 'quantity' },
          { text: 'Price', value: 'price' },
          { text: 'Tax', value: 'tax' },
          { text: 'Discount', value: 'discount' },
          { text: 'Amount', value: 'total' },
          { text: 'Actions', value: 'actions', sortable: false },
      ],
      debtorheader:[
          { text: 'Name', value: 'customername' },
          { text: 'Invoice No', value: 'code' },
          { text: 'Description', value: 'description' },
          { text: 'Amount', value: 'amount' },
          { text: 'Actions', value: 'actions', sortable: false },
      ]
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
    View(code){
      this.$router.push(`/invoice/show/${code }`)
    },
    async fetchData(){
      try{
          const {data} = await axios.get("api/sales/dashboard")
          this.dcards = data
           const { sales, grossprofit,transactions,debtors,debts,paid, creditnotes} = data
           this.paid = paid
           this.debts = debts
           this.sales = sales
           this.grossprofit = grossprofit
           this.transactions = transactions
           this.debtors = debtors
           this.creditnotes =creditnotes
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