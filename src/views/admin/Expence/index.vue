<template>
<back>
  <v-container>
    
<DataViewer :source="source" :headers="headers" :filters="filters" :create="create" :title="title" :show="show" :operators="operators"/>
  </v-container>

</back>
</template>
<script>
import back from '@/layouts/back'
import DataViewer from '@/components/DataViewer'
export default {
      name: 'ExpenceIndex',
    components:{
        DataViewer,
        back,
        
    },
      data(){
          return{
              title:'Expence',
              source: '/api/expence',
              create: '/expence/create',
              show: '/expence/',
              headers:[
                { text: 'Id', value: 'ID' },
                { text: 'Name', value: 'name' },
                { text: 'Title', value: 'title' },
                { text: 'Description', value: 'description' },
                { text: 'Actions', value: 'actions', sortable: false },
              ],
              filters:[
                  'ID', 'name', 'title', 'description'
              ],
              operators:['like']
          }
      },
}
</script>

<style>

</style>