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
                >
                 <template v-slot:[`item.statement`]="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="View(item.customercode)"
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
      store:'api/customer/report',
       headers:[
                { text: 'Id', value: 'ID' },
                { text: 'Name', value: 'name' },
                { text: 'Company', value: 'company' },
                { text: 'Address', value: 'address' },
                { text: 'Phone', value: 'phone' },
                { text: 'Email', value: 'email' },
                { text: 'Statement', value: 'statement' },
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
    View(code){

      this.$router.push(`/customer/statement/${ code }`)
    } ,
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
          // const {data} = await axios.get("api/customer/report")
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