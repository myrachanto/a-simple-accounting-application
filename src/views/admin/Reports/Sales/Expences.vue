<template>
<back>
 <v-container fluid>
              <h1>Expences report</h1>
        <v-row align="center"
              justify="center"
              > 
              <v-col v-if="totals"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="totals.Name" :total="formatcurrency(totals.Total)" 
                 :desc="totals.Description" :icon="`mdi-cash-multiple`" />
                </v-col>
                <v-col v-if="directexpences"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="directexpences.Name" :total="formatcurrency(directexpences.Total)" :desc="directexpences.Description" :icon="`mdi-cards-outline`"/>
                </v-col>
                <v-col  v-if="indirectexpences"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="indirectexpences.Name" :total="formatcurrency(indirectexpences.Total)" :desc="indirectexpences.Description" :icon="`mdi-cash-usd-outline`" />
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
                        <h2 >Expences flow</h2>
                </div>
                 <v-data-table
                  :headers="headers"
                  :items="expences"
                  item-key="name"
                  class="elevation-1 display-2"
                  style="font-size:10rem"
                :footer-props="{
                    'items-per-page-options': [5,10, 20, 30, 40, 50]
                  }"
                :items-per-page="10"
                ><template v-slot:[`item.amount`]="{ item }">
              
                {{ formatcurrency(item.amount) }}
            </template></v-data-table>
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
      totals:{},
      directexpences:{},
      indirectexpences:{},
      expences:[],
      errs:{},
      headers:[
          { text: 'Name', value: 'name' },
          { text: 'Invoice No', value: 'code' },
          { text: 'Description', value: 'description' },
          { text: 'Amount', value: 'amount' },
          { text: 'Mode', value: 'mode' },
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
      formatcurrency(d) {
          return formatMoney(d)
        },
    // View(code){
    //   this.$router.push(`/invoice/show/${code }`)
    // },
    async fetchData(){
      try{
          const {data} = await axios.get("api/expencetransanctions/report")
          this.dcards = data
           const { expences, total,directexpences,indirectexpences} = data
           this.totals = total
           this.directexpences = directexpences
           this.indirectexpences = indirectexpences
           this.expences = expences
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