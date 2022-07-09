<template>
  <v-container fluid fill-height>
    <v-tabs v-model="tab" grow flat>
      <v-tabs-slider color="primary"></v-tabs-slider>

      <v-tab v-for="item in items" :key="item.index" :to="`${item.route}`">
        {{ item.name }}
        <!--<v-icon>{{item.icon}}</v-icon>-->
      </v-tab>
    </v-tabs>
    <router-view></router-view>
  </v-container>
</template>

<script>
// TODO: take routes from router and do not duplicate here
export default {
  name: "Firebase",
  data() {
    return {
      tab: null,
      items: [
        {
          index: 0,
          name: "Welcome",
          route: "/firebase/welcome",
          icon: "fas fa-fire"
        },
        {
          index: 1,
          name: "Query",
          route: "/firebase/query",
          icon: "fas fa-database"
        },
        {
          index: 2,
          name: "Write",
          route: "/firebase/write",
          icon: "fas fa-save"
        }
      ]
    };
  },
  mounted() {
    this.getCollections();
  },
  methods: {
    async getCollections() {
    try {
        await this.$store.dispatch("getCollections");
      } catch (error) {
        this.$modal.show({
          type: "error",
          text: "Fehler! Firebase Firestore nicht errreichbar.",
        });
      }
      }
  }
};
</script>

<style>
</style>
