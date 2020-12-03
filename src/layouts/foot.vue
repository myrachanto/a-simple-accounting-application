<template>
  <v-footer
    color="grey lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="black"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col
        class="grey lighten-2 py-4 text-center black--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Accounting</strong>
        <v-btn
        color="black"
        text
        rounded
        class="my-2"
        to="/login"
      >
        Admin
      </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
      links: [
        'Home',
        'About Us',
        'Team',
      ],
    }),
  }
</script>