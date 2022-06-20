<template>
  <div id="app">
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    this.$router.replace({ name: "FirestoreWelcome" });
  }
};
</script>

<style lang="css">
</style>
