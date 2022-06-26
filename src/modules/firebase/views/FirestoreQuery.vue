<template>
  <v-container fluid grid-list-lg>
    <!-- Table -->
    <v-container fluid grid-list-lg>
      <v-card>
        <v-card-title class="title">
          Exercises
          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            append-icon="fas fa-search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="documents"
          item-key="title"
          class="elevation-2"
          :sort-by="['title']"
          :sort-desc="[false]"
          :search="search"
        ></v-data-table>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
// TODO: move db to store
import { db } from "../assets/firebase";
export default {
  name: "FirestoreQuery",
  data() {
    return {
      search: "",
      documents: []
    };
  },
  firestore: {
    documents: db.collection("exercisesTest")
  },
  computed: {
    headers() {
      return [
        { text: "Title", value: "title", sortable: true },
        { text: "Techniques", value: "techniques", sortable: true }
        //{ text: "Description", value: "description", sortable: true }
      ];
    }
  },
  methods: {}
};
</script>

<style>
</style>
