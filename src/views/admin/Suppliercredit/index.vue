<template>
  <back>
    <v-container>
      <DataViewer
        :source="source"
        :headers="headers"
        :filters="filters"
        :title="title"
        :show="show"
        :operators="operators"
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
      title: "Good  return Notes",
      source: "/api/sinvoice/credit",
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
      filters: ["ID", "name", "title", "description"],
      operators: ["like"],
      // operators:['equal_to','not_equal_to','less_than','greater_than','greater_than_or_equall_to','less_than_or_equal_to','in','not_in','like','between']
    };
  },
};
</script>

<style>
</style>