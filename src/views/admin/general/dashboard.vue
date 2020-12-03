<template>
<back>
 <v-container fluid>
        <v-row align="center"
              justify="center"
              >
                <v-col v-if="invoices"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="invoices.Name" :total="invoices.Total" :desc="invoices.Description" :icon="invoices.Icon" :rout="`/invoice`"/>
                </v-col>
                 <v-col  v-if="products"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="products.Name" :total="products.Total" :desc="products.Description" :icon="products.Icon" :rout="`/products`"/>
                </v-col> <v-col  v-if="categorys"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="categorys.Name" :total="categorys.Total" :desc="categorys.Description" :icon="categorys.Icon"  :rout="`/category`"/>
                </v-col> <v-col  v-if="majorcats"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="majorcats.Name" :total="majorcats.Total" :desc="majorcats.Description" :icon="majorcats.Icon"  :rout="`/majorcat`"/>
                </v-col> <v-col  v-if="users"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="users.Name" :total="users.Total" :desc="users.Description" :icon="users.Icon"  :rout="`/users`"/>
                </v-col> <v-col  v-if="customers"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="customers.Name" :total="customers.Total" :desc="customers.Description" :icon="customers.Icon"  :rout="`/customer`"/>
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
      invoices:{},
      customers:{},
      users:{},
      products:{},
      majorcats:{},
      categorys:{},   
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
           const { invoices, categorys,products,majorcats,customers,users } = data
           this.invoices = invoices
           this.customers = customers
           this.products = products
           this.users = users
           this.categorys = categorys
           this.majorcats =majorcats
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