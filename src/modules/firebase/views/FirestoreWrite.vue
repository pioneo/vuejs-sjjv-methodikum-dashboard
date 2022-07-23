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

    <!-- Forms -->
    <v-container fluid grid-list-lg>
      <v-card>
        <v-card-title class="title"
          >Firestore Formular: '{{ collection.name }}'</v-card-title
        >
        <!-- Form exercises -->
        <div v-if="collection.name == 'uebungen'">
          <v-form ref="form_document" v-model="documentDataExercises.valid">
            <v-container fluid grid-list-lg pa-10>
              <v-text-field
                v-model="documentDataExercises.title"
                label="Titel"
                :rules="rulesTitle"
                required
              ></v-text-field>
              <v-text-field
                v-model="documentDataExercises.description"
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
                    v-model="documentDataExercises.tagsMethodik"
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
                    v-model="documentDataExercises.tagsTechnik"
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
                    v-model="documentDataExercises.duration"
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
                    v-model="documentDataExercises.degree"
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
                v-model="documentDataExercises.steps"
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
        </div>
        <!-- Form techniken -->
        <div v-if="collection.name == 'techniken'">
          <v-form ref="form_document" v-model="documentDataTechniques.valid">
            <v-container fluid grid-list-lg pa-10>
              <!-- :rules="rulesName" -->
              <v-text-field
                v-model="documentDataTechniques.name"
                label="Name"
                required
              ></v-text-field>
              <!-- :rules="rulesGroup" -->
              <v-select
                v-model="documentDataTechniques.group"
                :items="itemsTechniqueGroup"
                :menu-props="{ maxHeight: '400' }"
                label="Technikgruppe"
                required
              ></v-select>
            </v-container>
          </v-form>
        </div>

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
import * as helpers from "../../../helpers";
export default {
  name: "FirestoreWrite",
  data() {
    return {
      // Firebase collection
      collection: {
        name: "",
      },
      // document data for exercise documents
      documentDataExercises: {
        valid: true,
        title: "",
        description: "",
        duration: 1,
        tagsTechnik: [],
        tagsMethodik: [],
        steps: "",
        degree: "",
      },
      // document data for technique documents
      documentDataTechniques: {
        valid: true,
        name: "",
        group: "",
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
     * Retrieve from Firestore collections and format for select component
     *
     * @returns {Array}
     */
    itemsTagsTechnik() {
      const collection = this.firebaseCollections["techniken"];

      // Firestore entries as dictionary
      var techniques = {};
      for (const [index, element] of collection.entries()) {
        const group = element["group"];
        if (!Object.keys(techniques).includes(group)) techniques[group] = [];
        techniques[group].push({ name: element["name"], group: group });
      }

      // Add divider and header
      var items = [];
      for (const [index, group] of Object.keys(techniques).entries()) {
        items.push({ header: group });
        items = items.concat(techniques[group].sort(helpers.compare)); // Sort by name
        items.push({ divider: true });
      }
      return items;
    },

    /**
     * Retrieved Firestore collections and documents.
     *
     * @returns {Object} - Dictionary with collection name as keys and documents list as values
     */
    firebaseCollections() {
      return this.$store.getters.firebaseCollections;
    },
    /**
     * Items of the select Firestore collection names.
     *
     * @returns {Array}
     */
    itemsFirebaseCollectionsNames() {
      return Object.keys(this.firebaseCollections);
    },
    /**
     * Concatenates Arrays of the selected tags.
     *
     * @returns {Array}
     */
    tags() {
      if (this.documentDataExercises) {
        return this.documentDataExercises.tagsTechnik.concat(
          this.documentDataExercises.tagsMethodik
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
     * Concatenates Arrays of the selected Ju-Jutsu technique group.
     *
     * @returns {Array}
     */
    itemsTechniqueGroup() {
      return ["Atemitechniken", "Wurftechniken", "Hebeltechniken"];
    },
    /**
     * Create JSON data from user selected items and text fields.
     *
     * @returns {string} JSON
     */
    firebaseData() {
      var data = {};
      if (this.collection.name == "uebungen") {
        data = {
          title: this.documentDataExercises.title,
          description: this.documentDataExercises.description,
          tags: this.tags,
          duration: parseInt(this.documentDataExercises.duration),
          steps: this.parseSteps(),
          degree: this.documentDataExercises.degree,
        };
      } else if (this.collection.name == "techniken") {
        data = {
          name: this.documentDataTechniques.name,
          group: this.documentDataTechniques.group,
        };
      }

      // always add the UTC time
      data["dateUTC"] = new Date();

      return JSON.stringify(data, null, 2);
    },
  },
  created() {
    this.collection.name = this.itemsFirebaseCollectionsNames[0];
  },
  methods: {
    /**
     * Split steps string by linebreak and generate array with single steps.
     *
     * @returns {Array}
     */
    parseSteps() {
      return this.documentDataExercises.steps.split("\n");
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
          await this.$store.dispatch("getCollections"); // Reload new entries
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
