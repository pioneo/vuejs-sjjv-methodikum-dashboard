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
  setup() {
    onBeforeMount(() => {
      this.$store.dispatch("fetchUser");
    });
  },
};
</script>

<style lang="css">
</style>
