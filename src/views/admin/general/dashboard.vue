<template>
<back>
 <v-container fluid>
        <v-row align="center"
              justify="center"
              >
                <v-col v-if="sales"
                class="auto"
                cols="12"
                sm="8"
                md="3">
                 <Dcard :title="sales.Name" :total="sales.Total" :desc="sales.Description" :icon="sales.Icon" />
                </v-col>
                 <v-col  v-if="purchases"
                class="auto"
                cols="12"
                sm="8"
                md="3">
                 <Dcard :title="purchases.Name" :total="purchases.Total" :desc="purchases.Description" :icon="purchases.Icon" />
                </v-col>
                 <v-col  v-if="receipts"
                class="auto"
                cols="12"
                sm="8"
                md="3">
                 <Dcard :title="receipts.Name" :total="receipts.Total" :desc="receipts.Description" :icon="receipts.Icon" />
                </v-col> <v-col  v-if="payments"
                class="auto"
                cols="12"
                sm="8"
                md="3">
                 <Dcard :title="payments.Name" :total="payments.Total" :desc="payments.Description" :icon="payments.Icon"  />
                </v-col> <v-col  v-if="expences"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="expences.Name" :total="expences.Total" :desc="expences.Description" :icon="expences.Icon" />
                </v-col> <v-col  v-if="customers"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="customers.Name" :total="customers.Total" :desc="customers.Description" :icon="customers.Icon" />
                </v-col> <v-col  v-if="suppliers"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="suppliers.Name" :total="suppliers.Total" :desc="suppliers.Description" :icon="suppliers.Icon"/>
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
      receipts:{},
      customers:{},
      payments:{},
      purchases:{},
      sales:{},
      suppliers:{}, 
      expences:{},   
      errs:{},
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
    // newInvoice(invoice) {
    //   // this.invoices = [ ...this.invoices, invoice]
    // },
    async fetchData(){
      try{
          const {data} = await axios.get("api/dashboard")
          this.dcards = data
           const { receipts, payments,purchases,sales,customers,suppliers,expences } = data
           this.receipts = receipts
           this.customers = customers
           this.purchases = purchases
           this.sales = sales
           this.suppliers = suppliers
           this.expences =expences
           this.payments =payments
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