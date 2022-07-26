<template>
  <v-container fluid grid-list-lg>
    <p>
      Welcome to
      <a href="https://vuejs.org/" target="_blank">Vue.js</a>&nbsp;
      <a href="https://console.firebase.google.com/" target="_blank"
        >Firebase</a
      >
      Connector.
    </p>

    <!-- Reload -->
    <v-btn text icon @click="getCollections">
      <v-icon right dark>fas fa-sync-alt</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "FirestoreWelcome",
  data() {
    return {};
  },
  methods: {
    /**
     * Query Firebase Firestore Collections.
     *
     */
    async getCollections() {
      try {
        await this.$store.dispatch("getCollections");
        this.$modal.show({
          type: "success",
          text: "Erfolg! Firebase Firestore Collections wurden neu geladen.",
        });
      } catch (error) {
        this.$modal.show({
          type: "error",
          text: "Fehler! Firebase Firestore nicht errreichbar.",
        });
      }
    },
  },
  computed: {},
};
</script>

<style>
</style>
