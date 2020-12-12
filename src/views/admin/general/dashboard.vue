<template>
<back>
 <v-container fluid>
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
          md="4">
           <v-select
          :items="filters"
          label="Search Date"
          v-model="dated"
          @change="selected(dated)"
        ></v-select>
        </v-col>
        <v-col
      cols="12"
      sm="6"
      md="3"
      v-if="custom"
    >
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="searchq2"
            label="Between Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="searchq2"
          @input="menu = false"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="3"
      v-if="custom"
    >
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="searchq3"
            label="And Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="searchq3"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
    </v-col>

        <v-col
          cols="12"
          md="2"
        >
         <v-btn class="ma-2" 
      depressed
      color="success"
      @click="GetData()"
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
        <v-row align="center"
              justify="center"
              >
                <v-col v-if="sales"
                class="auto"
                cols="12"
                sm="8"
                md="3">
                 <Dcard :title="sales.Name" :total="formatcurrency(sales.Total)" :desc="sales.Description" :icon="`mdi-cash-plus`" :rout="`/sales/report`"/>
                </v-col>
                 <v-col  v-if="purchases"
                class="auto"
                cols="12"
                sm="8"
                md="3">
                 <Dcard :title="purchases.Name" :total="formatcurrency(purchases.Total)" :desc="purchases.Description" :icon="`mdi-cash-minus`" :rout="`/purchases/report`"/>
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
                 <Dcard :title="suppliers.Name" :total="String(suppliers.Total)" :desc="suppliers.Description" :icon="`mdi-account-multiple-check-outline`" :rout="`/suppliers/report`"/>
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
      source: 'api/dashboard',
      dated:'In the last 30days',
            searchq2 : '',
            searchq3 : '',
            custom: false,
            // date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            filters:[
              'In the last 24hrs',
              'In the last 7days',
              'In the last 15day',
              'In the last 30days',
              'custom'
            ]
    }
  },

  components:{
    back,
    Dcard
  },
  created() {
      this.GetData()
      // this.newInvoice()
    
  },
  methods:{

      formatcurrency(d) {
          return formatMoney(d)
        },
    
    selected(val){
          if (val === 'custom'){
            this.custom = true
          }else {
            this.custom = false
          }
        },   
   resetFilter(){
            this.dated = 'In the last 30days'
            this.searchq2 = ''
            this.searchq3 = '' 
            this.custom = false
            this.GetData()
        },
      async GetData(){
          try{
            var p = this
            const {data} = await axios.get(`${this.source}?dated=${p.dated}&searchq2=${p.searchq2}&searchq3=${p.searchq3}`)
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