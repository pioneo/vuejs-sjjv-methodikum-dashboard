<template>
  <div id="app">
    <v-app>
      <router-view /> <!-- vue router -->
      <vue-modal /> <!-- dialog modal-->
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  /*
  setup() {
    onBeforeMount(() => {
      this.$store.dispatch("fetchUser");
    });
  },
  */
};
</script>

<style lang="css">
</style>
