<template>
<back>
 <v-container fluid>
                       <v-row>
<v-col cols="12">
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
   
</v-col>
  </v-row>
        <v-row align="center"
              justify="center"
              > 
              <v-col v-if="sales"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="sales.Name" :total="formatcurrency(sales.Total)" 
                 :desc="sales.Description" :icon="`mdi-cash-multiple`" />
                </v-col>
                <v-col v-if="paid"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="paid.Name" :total="formatcurrency(paid.Total)" :desc="paid.Description" :icon="`mdi-cards-outline`"/>
                </v-col>
                
                <v-col  v-if="debts"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="debts.Name" :total="formatcurrency(debts.Total)" :desc="debts.Description" :icon="`mdi-account-multiple`" />
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
                        <h2 >Products flow (sale and credited)</h2>
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
              >  <template v-slot:[`item.price`]="{ item }">
              
                {{ formatcurrency(item.price) }}
            </template>
            <template v-slot:[`item.tax`]="{ item }">
              
                {{ formatcurrency(item.tax) }}
            </template>
          <template v-slot:[`item.discount`]="{ item }">
              
                {{ formatcurrency(item.total) }}
            </template>
          <template v-slot:[`item.total`]="{ item }">
              
                {{ formatcurrency(item.total) }}
            </template>
              <template v-slot:[`item.actions`]="{ item }">
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
                        <h2 >Purchases flow (Purchase records)</h2>
                </div>
                 <v-data-table
                  :headers="debtorheader"
                  :items="creditors"
                  item-key="name"
                  class="elevation-1 display-2"
                  style="font-size:10rem"
                :footer-props="{
                    'items-per-page-options': [5,10, 20, 30, 40, 50]
                  }"
                :items-per-page="10"
                ><template v-slot:[`item.amount`]="{ item }">
              
                {{ formatcurrency(item.amount) }}
            </template>
                <template v-slot:[`item.actions`]="{ item }">
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
import formatMoney from '@/helpers/currencyformat'
import axios from '@/axios'
import Dcard from '@/components/cards/dashboardcard'
import back from '@/layouts/back'
export default {
    data(){
    return{
      paid:{},
      debts:{},
      sales:{},
      creditors:[],
      creditnotes:[],   
      transactions:[],
      store: 'api/purchases/dashboard',
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
          { text: 'Name', value: 'suppliername' },
          { text: 'Invoice No', value: 'code' },
          { text: 'Description', value: 'description' },
          { text: 'Amount', value: 'amount' },
          { text: 'Actions', value: 'actions', sortable: false },
      ],
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
    View(code){
      this.$router.push(`/sinvoice/show/${code }`)
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
            const {data} = await axios.get(`${this.store}?dated=${p.dated}&searchq2=${p.searchq2}&searchq3=${p.searchq3}`)
           const { sales,transactions,creditors,debts,paid, creditnotes} = data
           this.paid = paid
           this.debts = debts
           this.sales = sales
           this.transactions = transactions
           this.creditors = creditors
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