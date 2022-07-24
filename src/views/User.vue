<template>
  <v-container fluid grid-list-lg>
    <p>Firebase Nutzer-UID: '{{ userId }}'</p>
    <v-switch
      v-model="userIsAnonymous"
      :label="`IsAnonymous: ${userIsAnonymous.toString()}`"
      color="primary"
      disabled
    ></v-switch>
  </v-container>
</template>

<script>
export default {
  name: "User",
  data() {
    return {};
  },
  computed: {
    /**
     * Firebase Firestore user.
     *
     * @returns {object} - User as returned from Firebase.
     */
    user() {
      return this.$store.getters.user;
    },
    /**
     * Firebase Firestore user Id.
     *
     * @returns {string} - User Id as returned from Firebase.
     */
    userId() {
      if (this.user) {
        return this.user.uid;
      }
    },
    /**
     * Firebase Firestore user isAnonymous state.
     *
     * @returns {boolean} - User isAnonymous state as returned from Firebase.
     */
    userIsAnonymous() {
      if (this.user) {
        return this.user.isAnonymous;
      }
    },
  },
  methods: {},
};
</script>

<style>
</style>
