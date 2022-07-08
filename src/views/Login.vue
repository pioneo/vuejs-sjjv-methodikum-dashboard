<template>
  <v-container fluid fill-height>
    <!-- Login -->
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-form ref="form_login" @submit.prevent="login">
          <v-text-field
            v-model="input.username"
            label="E-Mail-Adresse"
            name="email"
            prepend-icon="fas fa-user"
            type="text"
            :rules="[(v) => !!v || 'Feld ist erforderlich']"
          ></v-text-field>
          <v-text-field
            v-model="input.password"
            label="Passwort"
            name="password"
            prepend-icon="fas fa-lock"
            type="password"
            :rules="[(v) => !!v || 'Feld ist erforderlich']"
          ></v-text-field>
        </v-form>

        <v-layout align-center justify-center>
          <v-col class="text-left">
            <v-btn text color="primary" @click="loginAnonymous">
              Login Anonymous
              <v-icon right>fas fa-user-secret</v-icon>
            </v-btn>
          </v-col>

          <v-col class="text-right">
            <v-btn text class="lowercase" @click="register">Register</v-btn>
            <v-btn large color="primary" @click="login">Login</v-btn>
          </v-col>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// TOOO: Add Login not anomymous
export default {
  name: "Login",
  data() {
    return {
      input: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
     /**
     * Login via Firebase SDK.
     *    
     */
    login() {
      if (this.$refs.form_login.validate()) {
        this.$modal.show({
          type: "warning",
          text: "Login aktuell nicht verfügbar.",
        });
      }
    },
    /**
     * Anonymous login via Firebase SDK.
     *    
     */
    loginAnonymous() {
      this.$store.dispatch("loginAnonymous");
    },
     /**
     * Registration via Firebase SDK.
     *    
     */
    register() {
      if (this.$refs.form_login.validate()) {
        this.$modal.show({
          type: "warning",
          text: "Registrierung aktuell nicht verfügbar.",
        });
      }
    },
  },
};
</script>

<style>
</style>
