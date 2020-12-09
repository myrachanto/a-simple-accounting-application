<template>
<v-container fluid>
  <v-row>
<v-col cols="12">
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
   
</v-col>
  </v-row>

  <v-row>
   <carding v-for="(item, i) in items" :key="i" :name="item.name" :title="item.company" :description="item.email" :id="item.ID" :View="View" :Edit="Edit" />
  </v-row>
        <v-row align="center"
              justify="center"><v-col cols="12" align="center"
              justify="center">
  <div> 
    
    <v-btn :disabled="show1"
      depressed
      color="primary"
      @click="prevous"
    >
      Previous
    </v-btn> <v-chip
      class="ma-2"
      label
    >
      {{page}}
    </v-chip>
    <v-btn :disabled="show1"
      depressed
      color="primary"
      @click="next"
    >
      Next
    </v-btn></div>
    </v-col></v-row>
   </v-container>

</template>
<script>
 import carding from '@/components/cards/cading'
 import axios from '@/axios'
  export default {
    
    props: ['source', 'headers', 'create', 'title','show'],
     data(){
        return{
            items:[],
            showFilter: false,
            search : '',
            page:1,
            pagesize:12,
            show1:false              
        }
    },
    components:{
      carding
    },
    created(){
          this.GetData()
       },
    methods:{
      prevous(){
        if (this.page > 1){
          this.page --
          this.GetData()
        }else{
          return
        }
      },
      next(){
        var tr = this.items.length - this.pagesize
        if (tr == 0){
          this.page ++
          this.GetData()
        }else{
          return
        }
      },
        resetFilter(){
            this.search = ''
            this.page=1,
            this.pagesize=12     
            this.GetData()
        },
       async GetData(){
        try{
          let vm = this
           const {data} = await axios.get(`${this.source}?q=${vm.search}&&page=${vm.page}&&pagesize=${vm.pagesize}`)
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