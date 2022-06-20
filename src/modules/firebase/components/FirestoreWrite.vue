<template>
  <v-container fluid grid-list-lg pa-5>
    <v-btn color="primary" @click="writeFirestore">Write</v-btn>
  </v-container>
</template>

<script>
//import { db } from "../db";
export default {
  name: "FirestoreWrite",
  data() {
    return {
      documents: []
    };
  },
  //firestore: {
  //  documents: db.collection("exercises")
  //},
  methods: {
    writeFirestore() {}
  }
};
</script>

<style>
</style>
