<template>
<v-col v-if="title"
        class="auto"
        cols="12"
        sm="8" 
        md="2">
    <v-card
    shaped
    class="mx-auto"
  >
    <div
           class="height=300px"
           style="background:#CFD8DC"
           >
      <v-card-title >{{title}}</v-card-title>
    </div>

    <v-card-title class="pb-0">
      {{name}}
    </v-card-title>

    <v-card-text class="text--primary">

      <div>{{description}}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="Black"
        text
        @click="View(id)"
      >
        <v-icon>mdi-eye</v-icon>
      </v-btn>
<v-spacer></v-spacer>
      <v-btn
        color="orange"
        text
        @click="Edit(id)"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</v-col>
</template>

<script>
export default {
    props:{
        name: String,
        description: String,
        title: String,
        id: Number,
        View: Function,
        Edit: Function
    }

}
</script>
