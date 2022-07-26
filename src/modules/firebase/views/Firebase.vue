<template>
  <v-container fluid grid-list-lg>
    <!-- <v-container fluid fill-height>-->
    <!-- <v-tabs grow> </v-tabs> -->
    <v-tabs v-model="tab" flat left>
      <!--<v-tabs-slider color="primary"></v-tabs-slider>-->
      <v-tab
        v-for="(item, index) in items"
        :key="index"
        :to="`${item.route}`"
        exact
      >
        {{ item.name }}
        <!--<v-icon>{{item.icon}}</v-icon>-->
      </v-tab>
    </v-tabs>

    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  name: "Firebase",
  data() {
    return {
      tab: "/firebase/welcome",
      items: [
        {
          name: "Welcome",
          route: "/firebase/welcome",
          icon: "fas fa-fire",
        },
        {
          name: "Query",
          route: "/firebase/query",
          icon: "fas fa-database",
        },
        {
          name: "Write",
          route: "/firebase/write",
          icon: "fas fa-save",
        },
      ],
    };
  },
  created() {
    // load tab content
    const path = "/firebase/welcome";
    if (this.$route.path !== path) this.$router.push(path);

    // retrieve Firestore collections
    this.getCollections();
  },
  methods: {
    /**
     * Query Firebase Firestore Collections.
     *
     */
    async getCollections() {
      try {
        await this.$store.dispatch("getCollections");
      } catch (error) {
        this.$modal.show({
          type: "error",
          text: "Fehler! Firebase Firestore nicht errreichbar.",
        });
      }
    },
  },
};
</script>

<style>
</style>
