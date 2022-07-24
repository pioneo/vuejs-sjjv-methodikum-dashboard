<template>
  <v-container fluid grid-list-lg>
    <!-- Select collection -->
    <v-select
      v-model="collection.name"
      :items="itemsFirebaseCollectionsNames"
      :menu-props="{ maxHeight: '400' }"
      label="Firebase collection"
      :rules="rulesCollectionName"
      required
    ></v-select>
    <!-- Table -->
    <v-container fluid grid-list-lg>
      <v-card>
        <v-card-title class="title">
          <!--Collection: '{{ collection.name }}'-->
          <v-text-field
            v-model="search"
            append-icon="fas fa-search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>

          <!-- Download -->
          <v-layout row wrap justify-end>
            <v-flex shrink>
              <v-icon small color="primary" @click="downloadFirestore">
                fas fa-download
              </v-icon>
            </v-flex>
          </v-layout>
        </v-card-title>

        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="documents"
          item-key="id"
          class="elevation-2"
          :sort-by="['dateUTC']"
          :sort-desc="[false]"
          :search="search"
          single-select
          show-select
        ></v-data-table>
      </v-card>
    </v-container>

    <!-- Details selected row -->
    <div v-if="selectedItem">
      <v-container fluid grid-list-lg pa-5>
        <p>Details:</p>
        <ol>
          <li v-for="(item, index) in selectedItemDetails" :key="index">
            {{ item }}
          </li>
        </ol>
      </v-container>
    </div>
    <div v-else><p>Keine Zeile ausgewählt.</p></div>
  </v-container>
</template>

<script>
import * as rules from "../assets/rules";
import * as helpers from "../../../helpers";
export default {
  name: "FirestoreQuery",
  data() {
    return {
      // Firebase collection
      collection: {
        name: "",
      },
      // Table with documents
      search: "",
      selected: [],
    };
  },
  computed: {
    /**
     * Retrieved Firestore collections and documents.
     *
     * @returns {object} - Dictionary with collection name as keys and documents list as values
     */
    firebaseCollections() {
      return this.$store.getters.firebaseCollections;
    },
    /**
     * Items of the select Firestore collection names.
     *
     * @returns {array}
     */
    itemsFirebaseCollectionsNames() {
      return Object.keys(this.firebaseCollections);
    },
    /**
     * Custom validation by rules: collection name select component with single choice.
     *
     * @returns {array}
     */
    rulesCollectionName() {
      return rules.collectioName;
    },
    /**
     * Firestrore collection retrieval and extraction of table headers.
     * @returns {array}
     */
    headers() {
      const headers = [];
      if (this.collection.name != "") {
        const firstDoc = this.firebaseCollections[this.collection.name][0];
        for (const [index, element] of Object.keys(firstDoc).entries()) {
          const col = { text: element, value: element, sortable: true };
          if (element == "steps") col["align"] = " d-none"; // do not show as text too long in table
          headers.push(col);
        }
      }
      return headers;
    },
    /**
     * Firestore documents of a specific collections.
     * @returns {object}
     */
    documents() {
      return this.firebaseCollections[this.collection.name];
    },
    /**
     * Content of the selected row.
     * @returns {object}
     */
    selectedItem() {
      return this.selected[0];
    },
    /**
     * Details of the selected row
     * @returns {array}
     */
    selectedItemDetails() {
      if (this.selectedItem) {
        if (Object.keys(this.selectedItem).includes("steps")) {
          return this.selectedItem.steps;
        } else {
          return ["Keine Details verfügbar."];
        }
      } else {
        return [];
      }
    },
  },
  created() {
    this.collection.name = this.itemsFirebaseCollectionsNames[0];
  },
  mounted() {},
  watch: {
    collection: {
      handler: function (newVal, oldVal) {
        this.selected = [];
      },
      deep: true,
    },
  },
  methods: {
    /**
     * Download selected Firebase Firestore Collection as JSON file.
     *
     */
    downloadFirestore() {
      helpers.saveTextAsFile(
        this.documents,
        "export_collection_" + this.collection.name + ".json"
      );
    },
  },
};
</script>

<style>
</style>
