<template>
  <div> 
    <v-btn
      depressed
      color="primary"
      @click="prevous"
    >
      Previous
    </v-btn><span>no</span>  
    <v-btn
      depressed
      color="primary"
      @click="next"
    >
      Next
    </v-btn></div>
</template>

<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  }
};
</script>
</script>

<style>

</style>