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
      name: 'CategorysIndex',
    components:{
        DataViewer,
        back,
        
    },
      data(){
          return{
              title:'Categorys',
              source: '/api/categorys',
              create: '/categorys/create',
              show: '/categorys/',
              headers:[
                { text: 'Id', value: 'ID' },
                { text: 'Name', value: 'name' },
                { text: 'Title', value: 'title' },
                { text: 'Description', value: 'description' },
                { text: 'Majorcategory', value: 'majorcategory' },
                { text: 'Actions', value: 'actions', sortable: false },
              ]
          }
      },
}
</script>

<style>

</style>