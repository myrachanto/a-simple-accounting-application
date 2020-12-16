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
    <v-row><v-col>
       <template>
                <v-snackbar :timeout="timeout" v-model="snackbar" :value="true" absolute left shaped top dismisable color="red">
                  <h2>{{errs.error}}</h2>
                  <p>{{errs.message}}</p>
                </v-snackbar>

              </template>
 <v-data-table
    :headers="headers"
    :items="cleared"
    :items-per-page="5"
    class="elevation-1"
  > 
  <template v-slot:[`item.clearancedate`]="{ item }">
      
        {{ formatdate(item.clearancedate) }}
    </template>
  
  <template v-slot:[`item.amount`]="{ item }">
      
        {{ formatcurrency(item.amount) }}
    </template>
  <template v-slot:[`item.status`]="{ item }">
      <v-chip
        :color="getColor(item.status)"
        dark
      >
        {{ item.status }}
      </v-chip>
    </template>
            <template v-slot:[`item.actions`]="{ item }">
       
              <v-icon
                small
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
      </template>
      </v-data-table>
  </v-col></v-row>
  </v-container>

<v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Update the Exepnce Payment Status</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="12">
                 <v-select
                    v-model="status"
                  :items="itemos"
                  label="Status"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="save(form)"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</back>
</template>
<script>
import formatMoney from '@/helpers/currencyformat'
import moment from 'moment'
 import axios from '@/axios'
import back from '@/layouts/back'
export default {
      name: 'paymentsexpenceallocationIndex',
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
              title:'Payment expence allocation',
              source: '/api/payments/clearedexpences',
              // create: '/payments/create',
              show: '/payments/cleared',
              store: '/api/Payrectrasan/transaction',
               headers:[
                { text: 'Id', value: 'ID' },
                { text: 'Name', value: 'itemname' },
                { text: 'Description', value: 'description' },
                { text: 'Payment Form', value: 'type' },
                { text: 'Clearance Date', value: 'clearancedate' },
                { text: 'Amount', value: 'amount' },
                { text: 'Status', value: 'status' },
                { text: 'Actions', value: 'actions', sortable: false },
              ],
             cleared:[],
             payment:{},
             allamount:0,
             bal:0,
              dialog: false,
              itemos:[
                "canceled",
                "allocate",
              ],
            
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

        getColor (status) {
                if (status === "canceled") return 'red'
                else if (status === "pending") return 'orange'
                else return 'green'
              },

        editItem(item) {
          //  console.log(item)
          this.editedIndex = this.cleared.indexOf(item);
          this.form = Object.assign({}, item);
          this.dialog = true;
        },
        close() {
          this.dialog = false;
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem);
            this.editedIndex = -1;
          });
        },

         async save(form) {
          try {
            console.log(form)
            let fd = new FormData();
            fd.append("code", this.form.code);
            fd.append("status", this.status);
            fd.append("amount", this.form.amount);
            await axios.post(this.store, fd, {
              "Content-Type": "multipart/form-data",
            });
            this.close()
            this.GetData()
          } catch (err) {
            this.close()
            this.snackbar = true;
            this.errs = err.response.data
          }
        },
      //  async  alloc(val){
      //      if(this.payment.amount > val.total){
      //        this.allamount = val.total
      //      }else(this.payment.amount < val.total)
      //      this.allamount = this.payment.amount
      //      try {
      //      console.log(val)
      //           let fd = new FormData();
      //           fd.append("itemcode", this.payment.itemcode);
      //           fd.append("paymentcode", this.payment.code);
      //           fd.append("invoicecode", val.code);
      //           fd.append("amount", this.allamount);
      //           fd.append("usercode", this.$store.getters.usercode);
      //           await axios.post(this.store, fd, {
      //             "Content-Type": "multipart/form-data",
      //           });
      //           this.GetData()
      //         } catch (err) {
      //           this.snackbar = true;
      //           this.errs = err.response.data
      //         }
      //    },
          async GetData(){
            try{
              const {data} = await axios.get(this.source)
                // const {cleared} = data  
              this.cleared = data
                // console.log(data)
            }catch(err){
              console.log(err)
            }
        },  
       }
}
</script>

<style>

</style>