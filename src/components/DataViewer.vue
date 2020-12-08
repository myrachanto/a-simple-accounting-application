<template>
<v-container>
  <v-row>
<v-col offset-sm="1" cols="11">
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
          md="8"
        >
          <v-text-field
            v-model="search"
            label="Search query"
            required
            @keyup.enter="GetData"
          ></v-text-field>
        </v-col>

       
        <v-col
          cols="12"
          md="2"
        >
         <v-btn class="ma-2" 
      depressed
      color="success"
      @click="GetData"
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

          <v-data-table
            :headers="headers"
            :items="items"
            item-key="ID"
            class="elevation-1 display-2"
            style="font-size:10rem"
          :footer-props="{
              'items-per-page-options': [5,10, 20, 30, 40, 50]
            }"
          :items-per-page="10"
          >
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
                @click="Edit(item.ID)"
              >
                mdi-pencil
              </v-icon>
            </template>
            
          </v-data-table>
</v-col>
  </v-row></v-container>
</template>
<script>
 import axios from '@/axios'
  export default {
    
    props: ['source', 'headers', 'create', 'title','show'],
    data(){
        return{
            items:[],
            showFilter: false,
            search : ''
               
        }
    },
    created(){
          this.GetData()
       },
    methods:{
        resetFilter(){
            this.search = ''
            this.GetData()
        },
       async GetData(){
        try{
          let vm = this
           const {data} = await axios.get(`${this.source}?q=${vm.search}`)
            this.items = data  

            // console.log(data)
        }catch(err){
           console.log(err)
        }
    },  
    
    View(id){

      this.$router.push(`${this.show}show/${id }`)
    } ,

    Edit(id){
      this.$router.push(`${this.show}${id}/edit`)
    } ,
    }
  }
</script>
<style>

</style>