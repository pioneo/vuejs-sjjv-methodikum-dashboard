<template>
  <div>
    <v-snackbar v-model="snackbar" multi-line>
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn :color="color" text v-bind="attrs" @click="snackbar = false">
          Schliessen
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>


<script>
import Modal from "../plugins/modal.js";
export default {
  data() {
    return {
      snackbar: false,
      text: "",
      color: "",
    };
  },
  methods: {
   /**
     * Show a quick message with timeout that is based on JS modal and a snackbar component.
     * @param {object} params - The dialog that should be displayed.
     * @param {string} params.text - The message of the dialog.
     * @param {string} params.type - The color of the dialog. Can be either success, error or warning as defined in ./plugins/vuetify.js.
     */
    show(params) {
      this.snackbar = true;
      this.text = params.text;
      this.color = params.type;
    },
  },

  beforeMount() {
    Modal.EventBus.$on("show", (params) => {
      this.show(params);
    });
  },
};
</script>

<style scoped>
</style>