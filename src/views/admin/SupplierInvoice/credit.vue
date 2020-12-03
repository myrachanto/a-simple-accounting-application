<template>
<back>
  <v-container>

    <DataViewer :source="source" :headers="headers" :filters="filters" :create="create" :title="title" :show="show" :operators="operators" />
  </v-container>

</back>
</template>

<script>
import back from '@/layouts/back'
import DataViewer from '@/components/DataViewerinvoice'
export default {
  name: 'sinvoiceIndex',
  components: {
    DataViewer,
    back,

  },
  data() {
    return {
      title: 'sinvoice',
      source: '/api/sinvoice',
      create: '/sinvoice/create',
      show: '/sinvoice/',
      headers: [{
          text: 'Id',
          value: 'ID'
        },
        {
          text: 'Code',
          value: 'code'
        },
        {
          text: 'Name',
          value: 'name',
          sortable: false
        },
        {
          text: 'Title',
          value: 'title',
          sortable: false
        },
        {
          text: 'Description',
          value: 'description',
          sortable: false
        },
        {
          text: 'tax',
          value: 'tax'
        },
        {
          text: 'Discount',
          value: 'discount'
        },
        {
          text: 'Total',
          value: 'total'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        },
      ],
      filters: [
        'ID', 'name', 'title', 'description', 'total'
      ],
      operators: ['like']
      // operators:['equal_to','not_equal_to','less_than','greater_than','greater_than_or_equall_to','less_than_or_equal_to','in','not_in','like','between']
    }
  },
}
</script>

<style>

</style>
