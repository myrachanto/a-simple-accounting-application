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
      name: 'receiptsIndex',
    components:{
        DataViewer,
        back,
        
    },
      data(){
          return{
              title:'receipts',
              source: '/api/receipts',
              create: '/receipts/create',
              show: '/receipts/',
              headers:[
                { text: 'Id', value: 'ID' },
                { text: 'Name', value: 'customername' },
                { text: 'Description', value: 'description' },
                { text: 'Payment Form', value: 'type' },
                { text: 'Clearance Date', value: 'clearancedate' },
                { text: 'Amount', value: 'amount' },
                { text: 'Status', value: 'status' },
                { text: 'Actions', value: 'actions', sortable: false },
              ],
              filters:[
                  'ID', 'name', 'title', 'description'
              ],
              operators:['like']
              // operators:['equal_to','not_equal_to','less_than','greater_than','greater_than_or_equall_to','less_than_or_equal_to','in','not_in','like','between']
          }
      },
}
</script>

<style>

</style>