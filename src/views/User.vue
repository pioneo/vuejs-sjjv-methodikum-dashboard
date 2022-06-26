<template>
  <v-container fluid fill-height>
    <p>
      USER ID:
      {{userId}}
    </p>
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
    }
  },
  methods: {}
};
</script>

<style>
</style>
