<template>
<back>
 <v-container fluid>  <v-row>
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

   <v-card
  elevation="2"
    class="mx-auto"
>
    
        <v-row align="center"
              justify="center"
              > 
              <v-col 
                class="auto"
                cols="12"
                sm="8"
                md="4">
                
                </v-col>
                <v-col
                class="auto"
                cols="12"
                sm="8"
                md="8">
                 <h1>Profit and Loss account for the period</h1>
                 <h2>{{dato}}</h2>
                </v-col>
                <v-col
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 
                </v-col> 
      </v-row>

 <v-row align="center"
              justify="center"
              >  
                <v-col
                class="auto"
                cols="12"
                sm="8"
                md="4">
                </v-col>
              <v-col 
                class="auto"
                cols="12"
                sm="8"
                md="4">
                Total sales for the period
                </v-col>
                <v-col
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 {{formatcurrency(sales)}}
                </v-col> 
             
             
            </v-row>
 <v-row align="center"
              justify="center"
              >  
                <v-col
                class="auto"
                cols="12"
                sm="8"
                md="4">
                </v-col>
              <v-col 
                class="auto"
                cols="12"
                sm="8"
                md="4">
                Total cost for the period
                </v-col>
                <v-col
                class="auto"
                cols="12"
                sm="8"
                md="4">
                <span class="cost">({{formatcurrency(cost)}})</span>
                </v-col> 
            </v-row>

 <v-row align="center"
              justify="center"
              >  
                <v-col
                class="auto"
                cols="12"
                sm="8"
                md="4">
                </v-col>
              <v-col 
                class="auto"
                cols="12"
                sm="8"
                md="4">
                Gross Profit for the period
                </v-col>
                <v-col
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 
                <span class="dblUnderlined">{{formatcurrency(sales - cost)}}</span>
                </v-col> 
            </v-row>
 <v-row align="center"
              justify="center"
              >  
                <v-col
                class="auto"
                cols="12"
                sm="8"
                md="4">
                </v-col>
              <v-col 
                class="auto"
                cols="12"
                sm="8"
                md="4">
                Total Direct expence for the period
                </v-col>
                <v-col
                class="auto"
                cols="12"
                sm="8"
                md="4" 
                >
                <span class="cost"> ({{formatcurrency(directExpences)}})</span>
                </v-col> 
            </v-row>
 <v-row align="center"
              justify="center"
              >  
                <v-col
                class="auto"
                cols="12"
                sm="8"
                md="4">
                </v-col>
              <v-col 
                class="auto"
                cols="12"
                sm="8"
                md="4">
                Total In Direct expence for the period
                </v-col>
                <v-col
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <span class="cost">({{formatcurrency(indirectExpences)}})</span>
                </v-col> 
            </v-row>
 <v-row align="center"
              justify="center"
              >  
                <v-col
                class="auto"
                cols="12"
                sm="8"
                md="4">
                </v-col>
              <v-col 
                class="auto"
                cols="12"
                sm="8"
                md="4">
                Total Other expence for the period
                </v-col>
                <v-col
                class="auto"
                cols="12"
                sm="8"
                md="4">
                <span class="cost">( {{formatcurrency(otherExpences)}})</span>
                </v-col> 
            </v-row>

 <v-row align="center"
              justify="center"
              >  
                <v-col
                class="auto"
                cols="12"
                sm="8"
                md="4">
                </v-col>
              <v-col 
                class="auto"
                cols="12"
                sm="8"
                md="4">
                Net Profit for the period
                </v-col>
                <v-col
                class="auto"
                cols="12"
                sm="8"
                md="4">
                <span class="dblUnderlined" :class="netprofit > 0 ? 'profit' : 'loss'"> {{formatcurrency(netprofit)}}</span>
                </v-col> 
            </v-row>
   </v-card>
  </v-container>
</back>
</template>

<script>
import formatMoney from '@/helpers/currencyformat'
import axios from '@/axios'
import back from '@/layouts/back'
export default {
    data(){
    return{
      sales:0,
      cost:0,
      directExpences:0,
      indirectExpences:0,
      otherExpences:0,
      dato: '',
      errs:{},
      store:'api/profitandloss',
      
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
  computed:{
    netprofit(){
        return this.sales - (this.cost + this.directExpences + this.indirectExpences + this.otherExpences)
    }
  },

  components:{
    back,
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
            const {data} = await axios.get(`${this.store}?dated=${p.dated}&searchq2=${p.searchq2}&searchq3=${p.searchq3}`)
           const { sales,cost,directExpences,indirectExpences,otherExpences, dated } = data
           this.sales = sales
           this.cost = cost
           this.directExpences = directExpences
           this.indirectExpences = indirectExpences
           this.otherExpences = otherExpences
           this.dato = dated
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
span.dblUnderlined { border-bottom: 3px double; }
.cost {
  color: rgb(255, 187, 0);
}
.profit {
  color: green;
}
.loss {
  color: red;
}
</style>