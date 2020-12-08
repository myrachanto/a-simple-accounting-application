<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
  > 
          <template v-slot:[`item.total`]="{ item }">
              
                {{ formatcurrency(item.total) }}
            </template>
            <template v-slot:[`item.actions`]="{ item }">
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
import formatMoney from '@/helpers/currencyformat'
export default {
  props:{
    headers: Array,
    items: Array,
  },

methods:{
      formatcurrency(d) {
          return formatMoney(d)
        },
  ShowInvoice(id){
    this.$router.push(`/sinvoice/show/${id }`)
    },
}
}
</script>

<style>

</style>