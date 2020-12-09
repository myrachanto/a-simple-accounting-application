<template>
   <v-card
    class="mx-auto"
    >
    <v-list-item three-line>
        <v-list-item-content>
        <div class="overline mb-4 green--text ">
            <h1>{{title}}</h1>
        </div>
        <v-list-item-title class="headline mb-1">
           <h3>{{total}}</h3>
        </v-list-item-title>
        <v-list-item-subtitle>{{desc}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar
        tile
        size="80"
        color="grey"
        >
        <v-icon size="70" dark>{{icon}}</v-icon></v-list-item-avatar>
    </v-list-item>

    <v-card-actions v-if="rout">
        <v-btn
        outlined
        rounded
        text
        :to="rout"
        >
        see all
        </v-btn>
    </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props:{
        title: String,
        total: String,
        desc: String,
        icon: String,
        rout: String
    }

}
</script>

<style>

</style>