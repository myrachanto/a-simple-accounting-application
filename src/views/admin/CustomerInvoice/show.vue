<template>
  <back>
    <v-form>
      <v-container class="fill-height">
          <h1>Invoice</h1>
        <v-row align="center" justify="center" v-if="customer">
          <v-col cols="12" sm="8" md="4">
            <v-card class="mx-auto">
              <v-card-title>Phone: {{customer.phone}}</v-card-title>
              <v-card-title>Code: {{invoice.code}}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="4">
            <v-card class="mx-auto">
              <v-card-title>Customer Name: {{customer.name}} </v-card-title>
              <v-card-title>Company: {{customer.company}}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="4">
            <v-card class="mx-auto" min-height="130">
              <p class="display-1"> address:{{customer.address}}</p>
            </v-card>
          </v-col>
        </v-row>

        <v-row  v-if="transactions.length > 0">
          <v-col cols="12" md="12">
            <v-card>
                 <div><h1>Products</h1></div>
              <v-data-table :headers="transactionheader" :items="transactions" item-key="ID" class="elevation-1 display-2" style="font-size:10rem" :footer-props="{
                  'items-per-page-options': [5,10, 20, 30, 40, 50]
                }" :items-per-page="10"> 
          <template v-slot:[`item.price`]="{ item }">
              
                {{ formatcurrency(item.price) }}
            </template>
          <template v-slot:[`item.tax`]="{ item }">
              
                {{ formatcurrency(item.tax) }}
            </template>
          <template v-slot:[`item.discount`]="{ item }">
              
                {{ formatcurrency(item.discount) }}
            </template>
          <template v-slot:[`item.total`]="{ item }">
              
                {{ formatcurrency(item.total) }}
            </template></v-data-table>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="expences.length > 0">
        <v-col cols="12" md="12">
            <v-card>
                 <div><h1>Expences</h1></div>
              <v-data-table :headers="expenceheaders" :items="expences" item-key="ID" class="elevation-1 display-2" style="font-size:10rem" :footer-props="{
                  'items-per-page-options': [5,10, 20, 30, 40, 50]
                }" :items-per-page="10"> 
          <template v-slot:[`item.amount`]="{ item }">
              
                {{ formatcurrency(item.amount) }}
            </template></v-data-table>
            </v-card>
        </v-col></v-row>
        <v-row  v-if="credits.length > 0">
        <v-col cols="12" md="12">
        <v-card>
                 <div><h1>Credit Contents</h1></div>
               <v-data-table
               
                :headers="transactionheader"
                :items="credits"
                item-key="ID"
                class="elevation-1 display-2"
                style="font-size: 10rem"
                :footer-props="{
                  'items-per-page-options': [5, 10, 20, 30, 40, 50],
                }"
                :items-per-page="10"
              >
          <template v-slot:[`item.price`]="{ item }">
              
                {{ formatcurrency(item.price) }}
            </template>
          <template v-slot:[`item.tax`]="{ item }">
              
                {{ formatcurrency(item.tax) }}
            </template>
          <template v-slot:[`item.discount`]="{ item }">
              
                {{ formatcurrency(item.discount) }}
            </template>
          <template v-slot:[`item.total`]="{ item }">
               
                {{ formatcurrency(item.total) }}
            </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <p>Instruction: {{invoice.Instruction}}</p>
          </v-col>
          <v-col cols="12" md="4">
            <p>Terms: {{invoice.terms}}</p>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="mx-auto">
              <v-card-title>Discount: {{formatcurrency(invoice.discount)}} </v-card-title>
              <v-card-title>Tax: {{formatcurrency(invoice.tax)}}</v-card-title>
              <v-card-title>Expences: {{formatcurrency(invoice.expence)}} </v-card-title>
              <v-card-title>Amount: {{formatcurrency(invoice.total)}}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

  </back>
</template>

<script>
import moment from 'moment'
import formatMoney from '@/helpers/currencyformat'
import axios from '@/axios'

import back from '@/layouts/back'

export default {
  name: "Customershow",
  components: {
    back
  },
  data() {
    return {
      form: {},
      errs: {},
      option: {},
      title: 'Create',
      init: 'api/invoice',
      redirect: '/invoice',
      store: 'api/invoice',
      method: 'post',
      snackbar: false,
      timeout: 3000,
      customer: {},
      invoice: {},
      transactions: [],
      expences: [],
      credits:[],
      transactionheader: [{
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Invoice No',
          value: 'code'
        },
        {
          text: 'Quantity',
          value: 'quantity'
        },
        {
          text: 'Price',
          value: 'price'
        },
        {
          text: 'Tax',
          value: 'tax'
        },
        {
          text: 'Discount',
          value: 'discount'
        },
        {
          text: 'Amount',
          value: 'total'
        }
      ],
      expenceheaders: [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Description',
          value: 'description'
        },
        {
          text: 'Amount',
          value: 'amount'
        },
        {
          text: 'Mode',
          value: 'mode'
        },
      ]

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    formatcurrency(d) {
          return formatMoney(d)
        },
      formatdate(d) {
          return moment(d).format('L');
        },
    Edit(id) {
      this.$router.push(`${this.redirect}/${id}/edit`)
    },
    Back() {
      this.$router.push(this.redirect)
    },

    async fetchData() {
      try {
        console.log(this.$route.params)
        const {
          data
        } = await axios.get(`${this.store}/${this.$route.params.id}`)
        const {
          customer,
          invoices,
          transactions,
          expences,
          credits
        } = data
        this.customer = customer
        this.transactions = transactions
        this.invoice = invoices
        this.expences = expences
        this.credits = credits
        // this.fetchCreditData()
      } catch (err) {
        this.snackbar = true
        //   console.log(err)
        this.errs = err.response.data
      }
    },

    // async fetchCreditData() {
    //   try {
    //     const { data } = await axios.get(
    //       `api/carts/creditslist/${this.invoice.code}`
    //     );
    //     this.credits = data; 
    //     console.log(data)
    //   } catch (err) {
    //     this.snackbar = true;
    //     //   console.log(err)
    //     this.errs = err.response.data;
    //   }
    // },
  },
}
</script>

<style>

</style>
