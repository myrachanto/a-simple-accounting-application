<template>
<back>
  <v-container>
    <v-row><v-col>
       <v-toolbar
    >
      <v-toolbar-title>{{title}}</v-toolbar-title>
<v-spacer></v-spacer>

      <v-btn >
        Pdf
      </v-btn>

      <v-btn >
        Excel
      </v-btn>
    </v-toolbar>
      </v-col></v-row>
    <v-row><v-col col="12" md="7">
      <div class="overline mb-4 green--text ">
      <h1>All Unallocated invoices</h1>
      </div>
      </v-col>
      <v-col>
      <div class="overline green--text"><h1>Payment amount to be allocated : {{payment.amount}}</h1></div>
      </v-col></v-row>
    <v-row><v-col col="12" md="8">
      </v-col>
      <v-col>
      <div class="overline green--text"><h1>Pay Amount allocated : {{allamount}}</h1></div>
      </v-col></v-row>
    <v-row><v-col>
       <template>
                <v-snackbar :timeout="timeout" v-model="snackbar" :value="true" absolute left shaped top dismisable color="red">
                  <h2>{{errs.error}}</h2>
                  <p>{{errs.message}}</p>
                </v-snackbar>

              </template>
 <v-data-table
    :headers="headers"
    :items="invoices"
    :items-per-page="5"
    class="elevation-1"
  > 
            <template v-slot:[`item.actions`]="{ item }">
        <v-simple-checkbox
          v-model="item.actions"
          @click="alloc(item)"
          :ripple="false"
        ></v-simple-checkbox>
      </template>
      </v-data-table>
  </v-col></v-row>
  </v-container>

</back>
</template>
<script>
import formatMoney from '@/helpers/currencyformat'
import moment from 'moment'
 import axios from '@/axios'
import back from '@/layouts/back'
export default {
      name: 'paymentsallocationIndex',
    components:{
        back,
        
    },
      data(){
          return{
            status:'',
            snackbar: false,
            timeout: 3000,
            errs: {},
            form:{},
              title:'Payment allocation',
              source: '/api/payments/cleared',
              // create: '/payments/create',
              show: '/payments/cleared',
              headers:[{
          text: 'Id',
          value: 'ID'
        },
        {
          text: 'Code',
          value: 'code'
        },
        {
          text: 'Name',
          value: 'name',
          sortable: false
        },
        {
          text: 'Title',
          value: 'title',
          sortable: false
        },
        {
          text: 'Description',
          value: 'description',
          sortable: false
        },
        {
          text: 'tax',
          value: 'tax'
        },
        {
          text: 'Discount',
          value: 'discount'
        },
        {
          text: 'Total',
          value: 'total'
        },
        {
          text: 'Balance',
          value: 'balance'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        }
              ],
              operators:['like'],
             invoices:[],
             payment:{},
             allamount:0,
             bal:0
            
          }
      },
    created(){
          this.GetData()
       },
       methods:{ 
      formatcurrency(d) {
          return formatMoney(d)
        },
      formatdate(d) {
          return moment(d).format('L');
        },
       async  alloc(val){
           if(this.payment.amount > val.total){
             this.allamount = val.total
           }else(this.payment.amount < val.total)
           this.allamount = this.payment.amount
           try {
           console.log(val)
                let fd = new FormData();
                fd.append("suppliercode", this.payment.suppliercode);
                fd.append("paymentcode", this.payment.code);
                fd.append("invoicecode", val.code);
                fd.append("amount", this.allamount);
                fd.append("usercode", this.$store.getters.usercode);
                await axios.post(this.source, fd, {
                  "Content-Type": "multipart/form-data",
                });
                this.GetData()
              } catch (err) {
                this.snackbar = true;
                this.errs = err.response.data
              }
         },
          async GetData(){
            try{
              console.log(this.$route.params.code)
              const {data} = await axios.get(`${this.source}/${this.$route.params.code}`)
                const {payment, sinvoices} = data  
              this.invoices = sinvoices
              this.payment = payment
                console.log(data)
            }catch(err){
              console.log(err)
            }
        },  
       }
}
</script>

<style>

</style>