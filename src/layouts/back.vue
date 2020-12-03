<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="`/imgs/users/${picture}`"></v-img>
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
        <v-list>
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

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-email</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
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
    
     items: [
        {
          action: 'mdi mdi-account-multiple',
          items: [
                {title:'Customers', icon:'mdi mdi-account-multiple', route:'/customer'},
                {title:'Invoice', icon:'mdi mdi mdi-file', route:'/invoice'},
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
          action: 'mdi mdi-account-multiple',
          items: [              
                {title:'Suppliers', icon:'mdi  mdi-account-multiple',route:'/supplier'},
                {title:'Invoice', icon:'mdi  mdi-file',route:'/sinvoice'},
                {title:'Credit Note', icon:'mdi  mdi-redo', route: '/grnnotes'},
          ],
          title: 'Suppliers',
        },
        {
          action: 'mdi mdi-database-minus',
          items: [
                {title:'Payments', icon:'mdi  mdi-database-minus'},
                {title:'Receipts', icon:'mdi  mdi-database-plus',route:'/receipts'},
                {title:'PaymentForms', icon:'mdi mdi-clipboard-text',route:'/paymentform'},
                {title:'Expence', icon:'mdi mdi-clipboard-outline',route:'/expence'},
                {title:'AllocatePayments', icon:'mdi mdi-checkbox-multiple-marked'},
                {title:'ALlocateReceipts', icon:'mdi mdi-checkbox-multiple-marked-outline'},
            ],
          title: 'Accounts',
        },
        {
          action: 'mdi mdi-account-multiple',
          items: [
                {title:'Sales', icon:'mdi  mdi-account-multiple',route:'/sales/dashboard'},
                {title:'Expences', icon:'mdi mdi-clipboard-outline',route:'/expences/report'},
                {title:'Customers', icon:'mdi mdi-account-multiple',route:'/customers/report'},
                {title:'Suppliers', icon:'mdi mdi-account-multiple'},
                {title:'Payments', icon:'mdi  mdi-database-minus'},
                {title:'Receipts', icon:'mdi mdi-database-plus'},
          ],
          title: 'Reports',
        },
        {
          action: 'mdi mdi-account-multiple',
          items: [
                {title:'Users', icon:'mdi  mdi-account-multiple'},
                {title:'Tax', icon:'mdi  mdi-file', route:'/tax'},
                ],
          title: 'Settings',
        },
        {
          action: 'mdi mdi-account-outline',
          items: [
                {title:'Profile', icon:'mdi mdi-account-outline'},
                {title:'Inbox', icon:'mdi mdi-inbox'},
                {title:'Outgoing', icon:'mdi  mdi-open-in-app'},
                // {title:'logout', icon:'mdi  mdi-logout', route:'/logout'},
                // ['Invoice', 'mdi mdi-file'],
                ],
          title: 'User',
        },
      ],
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
    }

  }
</script>