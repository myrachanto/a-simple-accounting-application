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
                 <Dcard :title="sales.Name" :total="formatcurrency(sales.Total)" :desc="sales.Description" :icon="sales.Icon" :rout="`/sales/report`"/>
                </v-col>
                 <v-col  v-if="purchases"
                class="auto"
                cols="12"
                sm="8"
                md="3">
                 <Dcard :title="purchases.Name" :total="formatcurrency(purchases.Total)" :desc="purchases.Description" :icon="purchases.Icon" :rout="`/purchases/report`"/>
                </v-col>
                 <v-col  v-if="receipts"
                class="auto"
                cols="12"
                sm="8"
                md="3">
                 <Dcard :title="receipts.Name" :total="formatcurrency(receipts.Total)" :desc="receipts.Description" :icon="receipts.Icon"  :rout="`/receipts/report`"/>
                </v-col> <v-col  v-if="payments"
                class="auto"
                cols="12"
                sm="8"
                md="3">
                 <Dcard :title="payments.Name" :total="formatcurrency(payments.Total)" :desc="payments.Description" :icon="payments.Icon"  :rout="`/payments/report`" />
                </v-col> <v-col  v-if="expences"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="expences.Name" :total="formatcurrency(expences.Total)" :desc="expences.Description" :icon="expences.Icon"  :rout="`/expences/report`"/>
                </v-col> <v-col  v-if="customers"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="customers.Name" :total="String(customers.Total)" :desc="customers.Description" :icon="customers.Icon"  :rout="`/customers/report`"/>
                </v-col> <v-col  v-if="suppliers"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="suppliers.Name" :total="String(suppliers.Total)" :desc="suppliers.Description" :icon="suppliers.Icon" :rout="`/suppliers/report`"/>
                </v-col>
      </v-row>
  </v-container>
</back>
</template>

<script>
import formatMoney from '@/helpers/currencyformat'
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

      formatcurrency(d) {
          return formatMoney(d)
        },
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