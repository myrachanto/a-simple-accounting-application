<template>
  <back>
    <v-container>
      <DataViewer
        :source="source"
        :headers="headers"
        :title="title"
        :show="show"
      />
    </v-container>
  </back>
</template>
<script>
import back from "@/layouts/back";
import DataViewer from "@/components/DataViewerCredit";
export default {
  name: "CreditIndex",
  components: {
    DataViewer,
    back,
  },
  data() {
    return {
      title: "Creidt Notes",
      source: "/api/invoice/credit",
      show: "/credit/",
      headers: [
        {
          text: 'ID',
          value: 'ID'
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Invoice No',
          value: 'code'
        },
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Description',
          value: 'description'
        },
        {
          text: 'Tax',
          value: 'tax'
        },
        {
          text: 'Discount',
          value: 'discount'
        },
        {
          text: 'Amount',
          value: 'total'
        }
      ],
    }
  },
};
</script>

<style>
</style>