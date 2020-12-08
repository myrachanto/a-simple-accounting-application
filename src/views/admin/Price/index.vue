<template>
<back>
  <v-container>
    
<DataViewer :source="source" :headers="headers" :create="create" :title="title" :show="show"/>
  </v-container>

</back>
</template>
<script>
import back from '@/layouts/back'
import DataViewer from '@/components/DataViewer'
export default {
      name: 'pricesIndex',
    components:{
        DataViewer,
        back,
        
    },
      data(){
          return{
              title:'prices',
              source: '/api/prices',
              create: '/prices/create',
              show: '/prices/',
              headers:[
                { text: 'Id', value: 'ID' },
                { text: 'Name', value: 'name' },
                { text: 'Title', value: 'title' },
                { text: 'Description', value: 'description' },
                { text: 'Product', value: 'product' },
                { text: 'Actions', value: 'actions', sortable: false },
              ]
          }
      },
}
</script>

<style>

</style>