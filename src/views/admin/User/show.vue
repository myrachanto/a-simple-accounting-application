<template>  
<back>
  <v-container>      <v-row>
<v-col cols="12">
    <v-toolbar
    
    >
<v-toolbar-title>User Details</v-toolbar-title>
<v-spacer></v-spacer>

      <v-btn @click="openDialog">
        Create
      </v-btn>
    </v-toolbar>
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
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
              <v-card color="basil">
                  <v-card-title class="text-center justify-center py-6">
                    <h1 class="font-weight-bold display-3 basil--text">
                      {{form.name}}
                    </h1>
                  </v-card-title>

                  <v-tabs
                    v-model="tab"
                    background-color="transparent"
                    color="basil"
                    grow
                  >
                    <v-tab
                      v-for="item in items"
                      :key="item"
                    >
                      {{ item }}
                    </v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="tab">
                    <v-tab-item
                    >
                      <usercard :form="form"/>
                    </v-tab-item>
                    <v-tab-item
                    >
                      <messageread :headers="inboxheader" :items="inbox"/>
                    </v-tab-item>
                    <v-tab-item
                    >
                      <messageread :headers="sentheaders" :items="sent" />
                    </v-tab-item>
                  </v-tabs-items>
                    <v-card-actions>
              <v-btn
                color="orange"
                text
                @click="Back()"
              >
                Back
              </v-btn>
            </v-card-actions>
                </v-card>




          
        </v-col></v-row>
        <message :dialog="dialog" :closeDialog="closeDialog" :users="users"/>
  </v-container>
</back>
</template>

<script>
 import axios from '@/axios'
 import usercard from '@/components/cards/usercard'
 import messageread from '@/components/cards/message'
//  import message from '@/components/modals/message'

import back from '@/layouts/back'
import Message from '../../../components/modals/message.vue'

export default {
  name: "Customershow",
  components: {
      back,
      usercard,
      messageread,
    Message
    },
  data(){
    return{
       form:{},
        errs:{},
        option:{},
        title:'Create',
        init:'api/messages',
        // redirect: '/messages',
        store: 'api/users',
        method: 'post',
        snackbar:false,
        dialog: false, 
        timeout:3000,
        tab: null,
        users:[],
        items: [
          'Profile', 'Inbox', 'Sent',
        ],
        inbox:[],
        inboxheader:[
          { text: 'Title', value: 'title' },
          { text: 'Description', value: 'description' },
          { text: 'Sent', value: 'UpdatedAt' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        sent:[],
        sentheaders:[
          { text: 'Title', value: 'title' },
          { text: 'Description', value: 'description' },
          { text: 'Sent', value: 'UpdatedAt' },
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
  created(){
      this.GetData()
  },
  methods:{
    openDialog(){
      this.dialog = true
    },
    closeDialog(){
      this.dialog = false
            this.GetData()
    },
        selected(val){
          if (val === 'custom'){
            this.custom = true
          }else {
            this.custom = false
          }
        }, 
  
  resetFilter(){
            this.search = ''
            this.dated = ''
            this.searchq2 = ''
            this.searchq3 = ''
            this.custom = false
            this.GetData()
        },
      async GetData(){
          try{
            var p = this
              const {data} = await axios.get(`${this.store}/${p.$store.getters.usercode}?dated=${p.dated}&searchq2=${p.searchq2}&searchq3=${p.searchq3}`)
              const {user, sent,inbox,users} = data
              this.form = user
              this.inbox = inbox
              this.sent = sent
              this.users = users
        }catch(err){
         this.snackbar = true
        //   console.log(err)
        this.errs = err.response.data
        }
    }
  },    
  }
</script>

<style>

</style>