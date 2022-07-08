<template>
  <v-container fluid grid-list-lg>
    <!-- Select collection -->
    <v-select
      v-model="collection.name"
      :items="itemsFirebaseCollections"
      :menu-props="{ maxHeight: '400' }"
      label="Firebase collection"
      :rules="rulesCollectionName"
      required
    ></v-select>
    <!-- Form -->
    <v-container fluid grid-list-lg>
      <v-card>
        <v-card-title class="title"
          >Firestore Formular: '{{ collection.name }}'</v-card-title
        >

        <v-form ref="form_document" v-model="documentData.valid">
          <v-container fluid grid-list-lg pa-10>
            <v-text-field
              v-model="documentData.title"
              label="Titel"
              :rules="rulesTitle"
              required
            ></v-text-field>
            <v-text-field
              v-model="documentData.description"
              label="Kurzbeschreibung"
              :rules="rulesDescription"
              required
            ></v-text-field>

            <v-row align="center">
              <v-col cols="12" sm="3">
                <v-subheader v-text="'Methodik'"></v-subheader>
              </v-col>
              <v-col cols="12" sm="9">
                <v-select
                  v-model="documentData.tagsMethodik"
                  :items="itemsTagsMethodik"
                  :menu-props="{ maxHeight: '400' }"
                  label="Techniktraining"
                  hint="'Grob Koordination' - 'Fein Koordination' - 'Variable Verfügbarkeit'"
                  persistent-hint
                  :rules="rulesTagsSingle"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" sm="3">
                <v-subheader v-text="'Techniken'"></v-subheader>
              </v-col>

              <v-col cols="12" sm="9">
                <v-autocomplete
                  v-model="documentData.tagsTechnik"
                  :items="itemsTagsTechnik"
                  label="Ju-Jutsu Technik"
                  chips
                  multiple
                  clearable
                  deletable-chips
                  hint="Techniken basierend auf dem 'Ju-Jutsu 1x1'"
                  persistent-hint
                  item-text="name"
                  item-value="name"
                  :rules="rulesTagsMultiple"
                  required
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="3">
                <v-subheader v-text="'Dauer [min]'"></v-subheader>
              </v-col>
              <v-col cols="12" sm="9">
                <v-text-field
                  v-model="documentData.duration"
                  single-line
                  hint="Geschätze Anzahl an Minuten für die komplette Übung"
                  persistent-hint
                  type="number"
                  :rules="rulesDuration"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="3">
                <v-subheader v-text="'Graduierung'"></v-subheader>
              </v-col>
              <v-col cols="12" sm="9">
                <v-select
                  v-model="documentData.degree"
                  :items="itemsDegree"
                  :menu-props="{ maxHeight: '400' }"
                  label="6. Kyu - 5. Dan"
                  hint="Erforderliche Graduierung (Schwierigkeitsgrad)"
                  persistent-hint
                  :rules="rulesDegree"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>

          <v-container fluid grid-list-lg pa-5>
            <v-textarea
              v-model="documentData.steps"
              label="Steps: Zeilenumbruch einfügen, um neuen Schritt zu generieren."
              counter
              rows="8"
              filled
              outlined
              color="grey"
              prepend-icon="fas fa-list-ol"
              :rules="rulesSteps"
              required
            ></v-textarea>
          </v-container>
        </v-form>

        <!-- Display data -->
        <v-container fluid grid-list-lg pa-5>
          <div style="margin: 0px 0 20px 0">
            <v-switch
              v-model="switchJSON"
              label="JSON anzeigen"
              color="primary"
              value="secondary"
              hide-details
            ></v-switch>
          </div>
          <div v-if="switchJSON">
            <v-textarea
              v-model="firebaseData"
              label="JSON Dokument"
              counter
              rows="20"
              filled
              outlined
              color="grey"
              prepend-icon="fas fa-save"
              readonly
            ></v-textarea>
          </div>
        </v-container>

        <v-container fluid grid-list-lg pa-5>
          <v-btn block color="primary" @click="writeFirestore">
            Speichern Firestore
            <v-icon right dark>mdi-cloud-upload</v-icon>
          </v-btn>
        </v-container>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import * as rules from "../assets/rules";
export default {
  name: "FirestoreWrite",
  data() {
    return {
      // Firebase collection
      collection: {
        name: [],
      },
      // document data
      documentData: {
        valid: true,
        title: "",
        description: "",
        duration: 0,
        tagsTechnik: [],
        tagsMethodik: [],
        steps: "",
        degree: "",
      },
      switchJSON: false,
    };
  },
  computed: {
    /**
     * Custom validation by rules: exercise duration field component.
     *
     * @returns {Array}
     */
    rulesDuration() {
      return rules.duration;
    },
    /**
     * Custom validation by rules: exercise short description field component.
     *
     * @returns {Array}
     */
    rulesDescription() {
      return rules.description;
    },
    /**
     * Custom validation by rules: exercise title field component.
     *
     * @returns {Array}
     */
    rulesTitle() {
      return rules.title;
    },
    /**
     * Custom validation by rules: exercise tags select component with mutiple choices.
     *
     * @returns {Array}
     */
    rulesTagsMultiple() {
      return rules.tagsMultiple;
    },
    /**
     * Custom validation by rules: exercise tags select component with single choice.
     *
     * @returns {Array}
     */
    rulesTagsSingle() {
      return rules.tagsSingle;
    },
    /**
     * Custom validation by rules: exercise steps textarea component.
     *
     * @returns {Array}
     */
    rulesSteps() {
      return rules.steps;
    },
    /**
     * Custom validation by rules: collection name select component with single choice.
     *
     * @returns {Array}
     */
    rulesCollectionName() {
      return rules.collectioName;
    },
    /**
     * Custom validation by rules: degree select component with single choice.
     *
     * @returns {Array}
     */
    rulesDegree() {
      return rules.degree;
    },
    /**
     * Items of the select component.
     *
     * @returns {Array}
     */
    itemsTagsMethodik() {
      return [
        "Technikvoraussetzungstraining",
        "Technikerwerbstraining",
        "Technikanwendungstraining",
        "Technikergänzungstraining",
      ];
    },
    /**
     * Items of the select tag component.
     *
     * @returns {Array}
     */
    itemsTagsTechnik() {
      return [
        { header: "Würfe" },
        { name: "Würfe allgemein", group: "Würfe" },
        { name: "Hüftwurf", group: "Würfe" },
        { name: "Schulterwurf", group: "Würfe" },
        { name: "Beinsteller", group: "Würfe" },
        { name: "Hüftfeger", group: "Würfe" },
        { name: "Hüftrad", group: "Würfe" },
        { divider: true },
        { header: "Atemi" },
        { name: "Atemi allgemein", group: "Atemi" },
        { name: "Halbkreisfußtritt", group: "Atemi" },
        { name: "Fußstoß vorwärts", group: "Atemi" },
        { name: "Faustrückenschlag", group: "Atemi" },
        { name: "Schulterstopp", group: "Atemi" },
      ];
    },
    /**
     * Items of the select collection from all Firebase collections.
     * #TODO: retrieve collection names from Firestore
     *
     * @returns {Array}
     */
    itemsFirebaseCollections() {
      return ["exercisesTest", "tags"];
    },
    /**
     * Concatenates Arrays of the selected tags.
     *
     * @returns {Array}
     */
    tags() {
      if (this.documentData) {
        return this.documentData.tagsTechnik.concat(
          this.documentData.tagsMethodik
        );
      } else {
        return [];
      }
    },
    /**
     * Concatenates Arrays of the selected Ju-Jutsu degrees.
     *
     * @returns {Array}
     */
    itemsDegree() {
      return [
        "6. Kyu (weiß)",
        "5. Kyu (gelb)",
        "4. Kyu (orange)",
        "3. Kyu (grün)",
        "2. Kyu (blau)",
        "1. Kyu (braun)",
        "1. Dan (schwarz)",
        "2. Dan (schwarz)",
        "3. Dan (schwarz)",
        "4. Dan (schwarz)",
        "5. Dan (schwarz)",
      ];
    },
    /**
     * Create JSON data from user selected items and text fields.
     *
     * @returns {string} JSON
     */
    firebaseData() {
      var data = {
        title: this.documentData.title,
        description: this.documentData.description,
        tags: this.tags,
        duration: parseInt(this.documentData.duration),
        steps: this.parseSteps(),
        degree: this.documentData.degree,
        dateUTC: new Date(),
      };
      return JSON.stringify(data, null, 2);
    },
  },
  mounted() {
    this.collection.name = this.itemsFirebaseCollections[0];
  },
  methods: {
    /**
     * Split steps string by linebreak and generate array with single steps.
     *
     * @returns {Array}
     */
    parseSteps() {
      return this.documentData.steps.split("\n");
    },

    /**
     * Store generated JSON file in Firebase Firestore.
     *
     * @returns {promise}
     */
    async writeFirestore() {
      if (this.$refs.form_document.validate()) {
        try {
          await this.$store.dispatch("write", {
            data: JSON.parse(this.firebaseData),
            collectionName: this.collection.name,
          });
          this.$modal.show({
            type: "success",
            text: "Erfolg! Element hinzugefügt.",
          });
        } catch (error) {
          this.$modal.show({
            type: "error",
            text: "Fehler! Element nicht hinzugefügt.",
          });
        }
      }
    },
  },
};
</script>

<style>
</style>
