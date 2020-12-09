<template>
<back>
 <v-container fluid>
              <h1>Customers report</h1>
        <v-row align="center"
              justify="center"
              > 
              <v-col v-if="allcustomers"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="allcustomers.Name" :total="String(allcustomers.Total)" 
                 :desc="allcustomers.Description" :icon="`mdi-account-multiple`" />
                </v-col>
                <v-col v-if="lastweek"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="lastweek.Name" :total="String(lastweek.Total)" :desc="lastweek.Description" :icon="`mdi-account-multiple`"/>
                </v-col>
                <v-col  v-if="todays"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="todays.Name" :total="String(todays.Total)" :desc="todays.Description" :icon="`mdi-account-multiple`" />
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
                        <h2 >All Customers</h2>
                </div>
                 <v-data-table
                  :headers="headers"
                  :items="customers"
                  item-key="name"
                  class="elevation-1 display-2"
                  style="font-size:10rem"
                :footer-props="{
                    'items-per-page-options': [5,10, 20, 30, 40, 50]
                  }"
                :items-per-page="10"
                ></v-data-table>
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
      allcustomers:{},
      lastweek:{},
      todays:{},
      customers:[],
      errs:{},
       headers:[
                { text: 'Id', value: 'ID' },
                { text: 'Name', value: 'name' },
                { text: 'Company', value: 'company' },
                { text: 'Address', value: 'address' },
                { text: 'Phone', value: 'phone' },
                { text: 'Email', value: 'email' },
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
    // View(code){
    //   this.$router.push(`/invoice/show/${code }`)
    // },
    async fetchData(){
      try{
          const {data} = await axios.get("api/customer/report")
          this.dcards = data
           const { customers, lastweek,todays,allcustomers } = data
           this.customers = customers
           this.lastweek = lastweek
           this.todays = todays
           this.allcustomers = allcustomers
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