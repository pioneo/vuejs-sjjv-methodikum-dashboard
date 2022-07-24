<template>
  <v-container fluid grid-list-lg>
    <!-- Logout button -->
    <v-col class="text-right">
      <v-btn text small color="black" @click="logout">
        Logout
        <v-icon right>fas fa-power-off</v-icon>
      </v-btn>
    </v-col>

    <!-- Navigation -->
    <!-- <v-card>-->
    <v-navigation-drawer
      v-model="drawer"
      dark
      app
      :mini-variant.sync="mini"
      permanent
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <img :src="require('../assets/logo.png')" />
        </v-list-item-avatar>

        <v-list-item-title class="text-h6">Methodikum</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <p class="version">&copy; {{ this.year }} -- Version v1.0.0</p>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="`${item.route}`"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!--</v-card>-->

    <v-main>
      <v-container fluid grid-list-lg pa-10>
        <v-layout justify-center>
          <v-fade-transition mode="out-in">
            <router-view></router-view>
          </v-fade-transition>
        </v-layout>
      </v-container>
    </v-main>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "fas fa-home", route: "/welcome" },
        { title: "User", icon: "fas fa-user", route: "/user" },
        { title: "Firebase", icon: "fas fa-fire", route: "/firebase" },
      ],
      mini: false,
    };
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
  created() {
    // load tab content
    const path = "/welcome";
    if (this.$route.path !== path) this.$router.push(path);
  },
  methods: {
    logout() {
      // TODO: differentiate between anonymous and not anonymous logout
      this.$store.dispatch("logoutAnonymous");
    },
  },
};
</script>

<style>
.version {
  text-align: center;
  font-family: "Oswald", sans-serif;
  font-size: 11px;
  color: #fff;
}
</style>
