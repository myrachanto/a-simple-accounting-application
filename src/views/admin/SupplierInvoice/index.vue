<template>
<back>
  <v-container>

    <DataViewer :source="source" :headers="headers" :create="create" :title="title" :show="show"/>
  </v-container>

</back>
</template>

<script>
import back from '@/layouts/back'
import DataViewer from '@/components/DataViewerInvoice'
export default {
  name: 'sinvoiceIndex',
  components: {
    DataViewer,
    back,

  },
  data() {
    return {
      title: 'Purchases Flow',
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
          text: 'Dated',
          value: 'dated'
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
    }
  },
}
</script>

<style>

</style>
