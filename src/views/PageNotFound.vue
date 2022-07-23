<template>
  <center>
    <h1>404</h1>
    <h2>Not Found</h2>
    <div style="margin: 50px 0 0px 0">
      <p>
        <router-link to="/login">Go to Login</router-link>
      </p>
    </div>
  </center>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>

<style scoped>
center {
  margin: 15vw;
}
h1 {
  font-size: 7em;
}
</style>