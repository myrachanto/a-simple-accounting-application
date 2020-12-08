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
      name: 'CustomerIndex',
    components:{
        DataViewer,
        back,
        
    },
      data(){
          return{
              title:'customer',
              source: '/api/customer',
              create: '/customer/create',
              show: '/customer/',
              headers:[
                { text: 'Id', value: 'ID' },
                { text: 'Name', value: 'name' },
                { text: 'Company', value: 'company' },
                { text: 'Address', value: 'address' },
                { text: 'Phone', value: 'phone' },
                { text: 'Email', value: 'email' },
                { text: 'Actions', value: 'actions', sortable: false },
              ]
          }
      },
}
</script>

<style>

</style>