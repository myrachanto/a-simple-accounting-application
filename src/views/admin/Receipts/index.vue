<template>
<back>
  <v-container>
    <v-row><v-col>
       <v-toolbar
    >
      <v-toolbar-title>{{title}}</v-toolbar-title>
<v-spacer></v-spacer>

      <v-btn :to="create">
        Create
      </v-btn>

      <v-btn >
        Pdf
      </v-btn>

      <v-btn >
        Excel
      </v-btn>
    </v-toolbar>
      </v-col></v-row> <template>
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
    <v-row><v-col>
<h1>All Receipts</h1>
 <v-data-table
    :headers="headers1"
    :items="allreceipts"
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
                class="mr-2"
                @click="View(item.ID)"
              >
                mdi-eye
              </v-icon>
            </template></v-data-table>
  </v-col>
  <v-col>
<h1>Pending Receipts</h1>
 <v-data-table
    :headers="headers"
    :items="pending"
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
                class="mr-2"
                @click="View(item.ID)"
              >
                mdi-eye
              </v-icon>
              <v-icon
                small
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
            </template></v-data-table>
  </v-col></v-row>
  </v-container>
<v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Update the Receipt Status</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
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
          <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
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
      name: 'receiptsIndex',
    components:{
        back,
        
    },
      data(){
          return{
            status:'',
            form:{},
              title:'receipts',
              source: '/api/receipts',
              create: '/receipts/create',
              show: '/receipts/',
              dialog: false,
              headers:[
                { text: 'Id', value: 'ID' },
                { text: 'Name', value: 'customername' },
                { text: 'Description', value: 'description' },
                { text: 'Payment Form', value: 'type' },
                { text: 'Clearance Date', value: 'clearancedate' },
                { text: 'Amount', value: 'amount' },
                { text: 'Status', value: 'status' },
                { text: 'Actions', value: 'actions', sortable: false },
              ],
               headers1:[
                { text: 'Id', value: 'ID' },
                { text: 'Name', value: 'customername' },
                { text: 'Description', value: 'description' },
                { text: 'Payment Form', value: 'type' },
                { text: 'Clearance Date', value: 'clearancedate' },
                { text: 'Amount', value: 'amount' },
                { text: 'Status', value: 'status' },
                { text: 'Actions', value: 'actions', sortable: false },
              ],
                itemos:[
                  "canceled",
                  "cleared",
                ],
              operators:['like'],
             allreceipts:[],
             pending:[],
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
        View(id){

          this.$router.push(`${this.show}show/${id }`)
        } ,

        Edit(id){
          this.$router.push(`${this.show}${id}/edit`)
        } ,
        editItem(item) {
          //  console.log(item)
          this.editedIndex = this.pending.indexOf(item);
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
         async save() {
          try {
            let fd = new FormData();
            fd.append("code", this.form.code);
            fd.append("status", this.status);
            await axios.post("api/receipts/transaction", fd, {
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
                const {allreceipts,pending} = data  
              this.allreceipts = allreceipts
              this.pending = pending
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