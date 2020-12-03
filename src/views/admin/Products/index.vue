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
      name: 'productsIndex',
    components:{
        DataViewer,
        back,
        
    },
      data(){
          return{
              title:'products',
              source: '/api/products',
              create: '/products/create',
              show: '/products/',
               headers:[
                { text: 'Id', value: 'ID' },
                { text: 'Name', value: 'name' },
                { text: 'Title', value: 'title' },
                { text: 'Description', value: 'description' },
                { text: 'Category', value: 'category' },
                { text: 'Price', value: 'sprice' },
                { text: 'Quantity', value: 'quantity' },
                { text: 'Actions', value: 'actions', sortable: false },
              ],
              filters:[
                  'ID', 'name', 'title', 'description','category','sprice'
              ],
              operators:['like']
              // operators:['equal_to','not_equal_to','less_than','greater_than','greater_than_or_equall_to','less_than_or_equal_to','in','not_in','like','between']
          }
      },
}
</script>

<style>

</style>