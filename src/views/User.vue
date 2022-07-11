<template>
  <v-container fluid grid-list-lg>
    <p>Firebase Nutzer-UID:</p>
    <p>'{{ userId }}'</p>
  </v-container>
</template>

<script>
// TODO: document functions
export default {
  name: "User",
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userId() {
      if (this.user) {
        return this.user.uid;
      }
    },
  },
  methods: {},
};
</script>

<style>
</style>
