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
      name: 'taxIndex',
    components:{
        DataViewer,
        back,
        
    },
      data(){
          return{
              title:'tax',
              source: '/api/tax',
              create: '/tax/create',
              show: '/tax/',
              headers:[
                { text: 'Id', value: 'ID' },
                { text: 'Name', value: 'name' },
                { text: 'Percentange', value: 'title' },
                { text: 'Description', value: 'description' },
                { text: 'Actions', value: 'actions', sortable: false },
              ]
          }
      },
}
</script>

<style>

</style>