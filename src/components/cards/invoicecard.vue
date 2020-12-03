<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
  > <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="ShowInvoice(item.code)"
              >
                mdi-eye
              </v-icon>
              </template></v-data-table>
</template>

<script> 
export default {
  props:{
    headers: Array,
    items: Array,
  },

methods:{
  ShowInvoice(id){
    this.$router.push(`/invoice/show/${id }`)
    },
}
}
</script>

<style>

</style>