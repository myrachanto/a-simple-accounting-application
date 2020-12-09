<template>
<back>
    <div>
<DataViewer :source="source" :headers="headers" :create="create" :title="title" :show="show" />
    </div>

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
              ]
          }
      },
}
</script>

<style>

</style>