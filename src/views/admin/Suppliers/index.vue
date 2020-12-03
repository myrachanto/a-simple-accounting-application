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
      name: 'supplierIndex',
    components:{
        DataViewer,
        back,
        
    },
      data(){
          return{
              title:'supplier',
              source: '/api/supplier',
              create: '/supplier/create',
              show: '/supplier/',
              headers:[
                { text: 'Id', value: 'ID' },
                { text: 'Name', value: 'name' },
                { text: 'Company', value: 'company' },
                { text: 'Address', value: 'address' },
                { text: 'Phone', value: 'phone' },
                { text: 'Email', value: 'email' },
                { text: 'Actions', value: 'actions', sortable: false },
              ],
              filters:[
                  'ID', 'name', 'company', 'phone','address','email'
              ],
              operators:['like']
              // operators:['equal_to','not_equal_to','less_than','greater_than','greater_than_or_equall_to','less_than_or_equal_to','in','not_in','like','between']
          }
      },
}
</script>

<style>

</style>