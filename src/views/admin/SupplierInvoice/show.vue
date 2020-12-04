<template>
  <back>
    <v-form>
      <v-container class="fill-height">
        <v-row align="center" justify="center" v-if="supplier">
          <v-col>
            <h1>Supplier sinvoice</h1>
          </v-col>
          <v-col cols="12" sm="8" md="6">
            <v-card class="mx-auto">

            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="3" align="center" justify="center">
            <v-img max-height="150" max-width="150" contain :src="`http://localhost:5000/imgs/dashboard/chantosweb.jpeg`"></v-img>
            <h1>Chantosweb developers</h1>
            <p>Myrachanto@gmail.com</p>
            <p>www.chantosweb.com</p>
          </v-col>

        </v-row>
        <v-row align="center" justify="center" v-if="supplier">
          <v-col cols="12" sm="8" md="4">
            <v-card class="mx-auto">
              <v-card-title>Phone: {{supplier.phone}}</v-card-title>
              <v-card-title>Code: {{sinvoice.code}}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="4">
            <v-card class="mx-auto">
              <v-card-title>supplier Name: {{supplier.name}} </v-card-title>
              <v-card-title>Company: {{supplier.company}}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="4">
            <v-card class="mx-auto" min-height="130">
              <p class="display-1"> address:{{supplier.address}}</p>
            </v-card>
          </v-col>
        </v-row>

        <v-row  v-if="stransactions.length > 0">
          <v-col cols="12" md="12">
            <v-card>
                 <div><h1>Products</h1></div>
              <v-data-table :headers="transactionheader" :items="stransactions" item-key="ID" class="elevation-1 display-2" style="font-size:10rem" :footer-props="{
                  'items-per-page-options': [5,10, 20, 30, 40, 50]
                }" :items-per-page="10"> </v-data-table>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="expences.length > 0">
        <v-col cols="12" md="12">
            <v-card>
                 <div><h1>Expences</h1></div>
              <v-data-table :headers="expenceheaders" :items="expences" item-key="ID" class="elevation-1 display-2" style="font-size:10rem" :footer-props="{
                  'items-per-page-options': [5,10, 20, 30, 40, 50]
                }" :items-per-page="10"> </v-data-table>
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
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <p>Instruction: {{sinvoice.Instruction}}</p>
          </v-col>
          <v-col cols="12" md="4">
            <p>Terms: {{sinvoice.terms}}</p>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="mx-auto">
              <v-card-title>Discount: {{sinvoice.discount}} </v-card-title>
              <v-card-title>Tax: {{sinvoice.tax}}</v-card-title>
              <v-card-title>Expences: {{sinvoice.expence}} </v-card-title>
              <v-card-title>Amount: {{sinvoice.total}}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

  </back>
</template>

<script>
import axios from '@/axios'

import back from '@/layouts/back'

export default {
  name: "suppliershow",
  components: {
    back
  },
  data() {
    return {
      form: {},
      errs: {},
      option: {},
      title: 'Create',
      init: 'api/sinvoice',
      redirect: '/sinvoice',
      store: 'api/sinvoice',
      method: 'post',
      snackbar: false,
      timeout: 3000,
      supplier: {},
      sinvoice: {},
      stransactions: [],
      expences: [],
      credits:[],
      transactionheader: [{
          text: 'Name',
          value: 'name'
        },
        {
          text: 'sinvoice No',
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
          supplier,
          sinvoices,
          stransactions,
          expences,
          grns
        } = data
        this.supplier = supplier
        this.stransactions = stransactions
        this.sinvoice = sinvoices
        this.expences = expences
        this.credits = grns
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
    //       `api/scarts/creditslist/${this.sinvoice.code}`
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
