<template>
  <v-app id="inspire" app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="`http://localhost:5000/imgs/users/${picture}`"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{username}}</v-list-item-title>
        </v-list-item-content>
            <v-btn icon @click="logout">
              <v-icon >mdi mdi-logout</v-icon>
            </v-btn>
      </v-list-item> 

      <v-divider></v-divider>

      <v-list
        nav
      >
        <v-list  >
        <v-list-item link to="/dashboard">
          <v-list-item-icon>
              <v-icon >mdi mdi-view-dashboard</v-icon>
            </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="title">
              Dashboard
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
         link
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
         link
          v-for="child in item.items"
          :key="child.title"
          :to="child.route"
        >
          <v-list-item-content>
                <v-list-item-title v-text="child.title"></v-list-item-title>

            
          </v-list-item-content>
          <v-list-item-icon>
              <v-icon v-text="child.icon"></v-icon>
            </v-list-item-icon>
        </v-list-item>
      </v-list-group>
    </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Estore backend</v-toolbar-title>
      <v-spacer></v-spacer>

 <v-menu
      transition="slide-x-transition"
      bottom
      right
      :nudge-width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-if="n === 0"
          v-bind="attrs"
          v-on="on"
          >
              <v-icon left dark>
                mdi-bell
              </v-icon>
              </v-btn>
              <v-btn text v-else
          v-bind="attrs"
          v-on="on">
                  <v-badge
              color="green"
              :content="n"
            >
              <v-icon left dark>
                mdi-bell
              </v-icon>
            </v-badge>
              </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="item in nortfications"
          link
          :key="item.title"
          @click="updateNortification(item.ID)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-menu>
               <v-menu
      transition="slide-x-transition"
      bottom
      right
      :nudge-width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-if="m === 0"
          v-bind="attrs"
          v-on="on"
          >
              <v-icon left dark>
                mdi-email
              </v-icon>
              </v-btn>
              <v-btn text v-else
          v-bind="attrs"
          v-on="on">
                  <v-badge
              color="green"
              :content="m"
            >
              <v-icon left dark>
                mdi-email
              </v-icon>
            </v-badge>
              </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="item in messages"
          link
          :key="item.title"
          @click="updateMessages(item.ID)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-menu>

      <v-menu
      transition="slide-x-transition"
      bottom
      right
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="deep-orange"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Shortcuts
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="item in shortcuts"
          link
          :key="item.title"
          :to="item.route"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-app-bar>

    <v-main app>
      <slot />
    </v-main>
    <foot/>
  </v-app>
</template>

<script>
import axios from '../axios'
import foot from './foot'
  export default {
    data: () => ({ drawer: null,
        nortfications:[],
        messages:[],
        m:0,
        n:0,
    
     items: [
        {
          action: 'mdi mdi-account-multiple',
          items: [
                {title:'Customers', icon:'mdi mdi-account-multiple', route:'/customer'},
                {title:'Sales', icon:'mdi-cash-plus', route:'/invoice'},
                {title:'Credit Note', icon:'mdi mdi mdi-redo', route:'/creditnotes'},
          ],
          title: 'Customer',
        },
        {
          action: 'mdi mdi-file-multiple',
        //   active: true,
          items: [
                {title:'products', icon:'mdi mdi-file-multiple', route:'/products'},
                {title:'Category', icon:'mdi-cards', route:'/categorys'},
                {title:'MajorCagory', icon:'di-cards-outline', route:'/majorcat'},
                {title:'Price', icon:'mdi mdi-currency-usd', route:'/prices'},
                {title:'Discounts', icon:'mdi mdi-window-minimize', route:'/discounts'},
          ],
          title: 'Products',
        },
        {
          action: 'mdi-account-multiple-check-outline',
          items: [              
                {title:'Suppliers', icon:'mdi-account-multiple-check-outline',route:'/supplier'},
                {title:'Purchases', icon:'mdi-cash-minus',route:'/sinvoice'},
                {title:'Goods Return Note', icon:'mdi  mdi-redo', route: '/grnnotes'},
          ],
          title: 'Suppliers',
        },
        {
          action: 'mdi mdi-database-minus',
          items: [
                {title:'Payments', icon:'mdi  mdi-database-minus',route:'/payments'},
                {title:'Receipts', icon:'mdi  mdi-database-plus',route:'/receipts'},
                {title:'Expence', icon:'mdi mdi-clipboard-outline',route:'/expenceTran'},
                {title:'AllocatePayments', icon:'mdi mdi-checkbox-multiple-marked',route:'/payments/allocation'},
                {title:'AllocateExpences', icon:'mdi mdi-checkbox-multiple-marked',route:'/payments/allocation/expence'},
                {title:'AllocateReceipts', icon:'mdi mdi-checkbox-multiple-marked-outline',route:'/receipts/allocation'},
                {title:'Liability', icon:'mdi mdi-clipboard-outline',route:'/liability'},
                {title:'Assets', icon:'mdi mdi-clipboard-outline',route:'/assets'},
            ],
          title: 'Accounts',
        },
        {
          action: 'mdi-file-chart-outline',
          items: [
                {title:'Sales', icon:'mdi-cash-plus',route:'/sales/report'},
                {title:'Purchases', icon:'mdi-cash-minus',route:'/purchases/report'},
                {title:'Expences', icon:'mdi mdi-clipboard-outline',route:'/expences/report'},
                {title:'Products', icon:'mdi mdi-file-multiple',route:'/product/report'},
                {title:'Customers', icon:'mdi mdi-account-multiple',route:'/customers/report'},
                {title:'Suppliers', icon:'mdi-account-multiple-check-outline',route:'/suppliers/report'},
                {title:'Payments', icon:'mdi  mdi-database-minus',route:'/payments/report'},
                {title:'Receipts', icon:'mdi mdi-database-plus',route:'/receipts/report'},
          ],
          title: 'Reports',
        },
        {
          action: 'mdi-cog',
          items: [
                {title:'Users', icon:'mdi  mdi-account-multiple',route:'/users'},
                {title:'PaymentForms', icon:'mdi mdi-clipboard-text',route:'/paymentform'},
                {title:'Stocks', icon:'mdi mdi-file-multiple',route:'/products/update'},
                {title:'Expence', icon:'mdi mdi-clipboard-outline',route:'/expence'},
                {title:'Tax', icon:'mdi  mdi-file', route:'/tax'},
                ],
          title: 'Settings',
        },
        {
          action: 'mdi mdi-account-outline',
          items: [
                {title:'Profile', icon:'mdi mdi-account-outline',route:'/user/messages'},
                // {title:'logout', icon:'mdi  mdi-logout', route:'/logout'},
                // ['Invoice', 'mdi mdi-file'],
                ],
          title: 'User',
        },
      ],
      shortcuts:[
        {title:'Create a Sale', icon:'mdi-cash-plus', route:'/invoice/create'},
        {title:'Create a Purchase', icon:'mdi-cash-minus',route:'/sinvoice/create'},
        {title:'Create a Customer', icon:'mdi mdi-account-multiple', route:'/customer/create'},
        {title:'Create a Supplier', icon:'mdi-account-multiple-check-outline',route:'/supplier/create'},
        {title:'Create a Expence', icon:'mdi mdi-clipboard-outline',route:'/expenceTran/create'},
        {title:'Create a Payment', icon:'mdi  mdi-database-minus',route:'/payments/create'},
        {title:'Create a Receipt', icon:'mdi  mdi-database-plus',route:'/receipts/create'},
        {title:'Create a Discount', icon:'mdi mdi-window-minimize', route:'/discounts/create'},
        {title:'Create a Expence', icon:'mdi mdi-clipboard-outline',route:'/expence/create'},
        {title:'Create a Tax', icon:'mdi  mdi-file', route:'/tax/create'},
      ]
     }),
    components:{
        foot
    },
    computed:{
        username(){
            return this.$store.getters.username
        },
        picture(){
          console.log(this.$store.getters.picture)
            return this.$store.getters.picture
        }
    },
    created() {
      this.fetchMessages()
      this.fetchNort()
      // this.newInvoice()
    
  },
    methods:{
         async logout(){
        try {
                await axios.get(`/api/logout/${this.$store.getters.Token}`)
                    localStorage.removeItem('access_token')
                    localStorage.removeItem('username')
                    localStorage.removeItem('admin')
                    localStorage.removeItem('picture')
                    this.$store.commit('logout')      
            }catch(err){
                this.snackbar = true
                console.log(err.response.data)
                this.errs = err.response.data
            }
      },
    async updateMessages(id){
                try{
                  const {data} = await axios.put(`api/messages/${id}`)
                      if(data){
                      this.$router.push(this.redirect)
                      }
              }catch(err){
                  this.snackbar = true
                  this.errs = err.response.data

              }

        },
      async updateNortification(id){
                try{
                  const {data} = await axios.put(`api/nortifications/${id}`)
                      if(data){
                      this.$router.push(this.redirect)
                      }
              }catch(err){
                  this.snackbar = true
                  this.errs = err.response.data

              }

        },
    async fetchMessages(){
        try{
            const {data} = await axios.get("api/messages/unread")
            const {num, messages} = data
            this.m = num
            this.messages = messages
          }catch(err){
          this.snackbar = true
          //   console.log(err)
          this.errs = err.response.data 
          }
      },
       async fetchNort(){
        try{
            const {data} = await axios.get("api/nortifications/unread")
            const {num, nortfications} = data
            this.n = num
            this.nortfications = nortfications
          }catch(err){
          this.snackbar = true
          //   console.log(err)
          this.errs = err.response.data
          }
      },
    }

  }
</script>