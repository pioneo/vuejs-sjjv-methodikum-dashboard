<template>
  <v-container fluid grid-list-lg pa-10>
    <v-card>
      <v-card-title class="title">Firestore Formular: 'exercises'</v-card-title>
      <!-- Form -->
      <v-form ref="form_document" v-model="documentData.valid">
        <v-container fluid grid-list-lg pa-10>
          <v-text-field v-model="documentData.title" label="Titel" :rules="rulesTitle" required></v-text-field>
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
                hint="Techniken basierend auf 'Ju-Jutsu 1x1'"
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

      <!-- Display payload -->
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
            v-model="firebasePayload"
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
        <v-btn block color="primary" @click="writeFirestore">Speichern Firestore</v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import * as rules from "../assets/rules";
export default {
  name: "FirestoreWrite",
  data() {
    return {
      // document payload
      documentData: {
        valid: true,
        title: "",
        description: "",
        duration: 0,
        tagsTechnik: [],
        tagsMethodik: [],
        steps: ""
      },
      switchJSON: false
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
     * Items of the select component.
     *
     * @returns {Array}
     */
    itemsTagsMethodik() {
      return [
        "Technikvoraussetzungstraining",
        "Technikerwerbstraining",
        "Technikanwendungstraining",
        "Technikergänzungstraining"
      ];
    },
    /**
     * Items of the select component.
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
        { name: "Schulterstopp", group: "Atemi" }
      ];
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
     * Create JSON payload from user selected items and text fields.
     *
     * @returns {string} JSON
     */
    firebasePayload() {
      var payload = {
        title: this.documentData.title,
        description: this.documentData.description,
        tags: this.tags,
        duration: parseInt(this.documentData.duration),
        steps: this.parseSteps()
      };
      return JSON.stringify(payload, null, 2);
    }
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
     * TODO
     *
     * @returns {promise}
     */
    async writeFirestore() {
      if (this.$refs.form_document.validate()) {
        try {
          console.log(this.firebasePayload);
          console.log(JSON.parse(this.firebasePayload));
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
</script>

<style>
</style>
