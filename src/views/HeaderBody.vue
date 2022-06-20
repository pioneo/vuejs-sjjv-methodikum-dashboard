<template>
  <div>
    <v-card color="primary">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold heading--text">SJJV Methodikum Dashboard</h1>
      </v-card-title>

      <v-card-subtitle class="text-center justify-center py-6">
        <h2 class="heading--text">Vue.js Firebase Connector</h2>
      </v-card-subtitle>

      <v-tabs v-model="tab" background-color="primary" dark grow icons-and-text>
        <v-tabs-slider color="white"></v-tabs-slider>

        <v-tab v-for="item in items" :key="item.index" :to="`${item.route}`">
          {{ item.name }}
          <v-icon>{{item.icon}}</v-icon>
        </v-tab>
      </v-tabs>
    </v-card>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "HeaderBody",
  data() {
    return {
      tab: null,
      items: [
        {
          index: 0,
          name: "Welcome",
          route: "/firestore/welcome",
          icon: "fas fa-fire"
        },
        {
          index: 1,
          name: "Query",
          route: "/firestore/query",
          icon: "fas fa-database"
        },
        {
          index: 2,
          name: "Write",
          route: "/firestore/write",
          icon: "fas fa-save"
        }
      ]
    };
  },
  created() {},
  methods: {}
};
</script>

<style>
.heading--text {
  color: white;
}
</style>
