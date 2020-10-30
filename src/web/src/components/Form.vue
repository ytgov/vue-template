<template>
  <div class="books">
    <h1>This is a basic form</h1>

    <v-banner icon="mdi-cash-register">
      <h2>Form help</h2>
      Help text can go in here to make the form more</v-banner
    >

    <p></p>
    <v-form v-model="form1Valid">
      <div class="row">
        <div class="col-6">
          <v-text-field
            dense
            v-model="firstName"
            outlined
            label="First name (required)"
            required
            :rules="firstNameRules"
          ></v-text-field>
        </div>
        <div class="col-6">
          <v-text-field
            dense
            v-model="lastName"
            outlined
            label="Last name (required)"
            required
            :rules="lastNameRules"
          ></v-text-field>
        </div>
      </div>
      <v-text-field
        v-model="email"
        dense
        outlined
        label="Email (required)"
        required
        :rules="emailRules"
      ></v-text-field>

      <v-textarea outlined label="Skills">This is the text</v-textarea>

      <v-select
        v-model="team"
        outlined
        dense
        label="Choose a team (required)"
        hint="Seahawks is the correct answer"
        persistent-hint
        :items="teams"
        required
        clearable
        :rules="teamRules"
      ></v-select>

      <v-card>
        <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
          <v-tab key="1">
            Tab item 1
          </v-tab>
          <v-tab key="2">
            Tab item 2
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" style="height: 250px; padding: 20px">
          <v-tab-item key="1">
            <v-card>
              This is cool info about tab item 1
            </v-card>
          </v-tab-item>
          <v-tab-item key="2">
            This is cool info about tab item 2
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-form>

    <v-banner :hidden="!showError" icon="mdi-alert-circle" class="problem mt-4">
      <h3>There is a problem</h3>
      <span>That's not the right team!</span>
    </v-banner>

    <v-btn
      color="primary"
      class="mr-5"
      :disabled="!form1Valid"
      @click="saveForm"
      >Save</v-btn
    >
    <v-btn color="secondary">Cancel</v-btn>

    <v-snackbar v-model="snackbar" right color="success">
      <v-icon class="mr-3">mdi-thumb-up-outline</v-icon>
      {{ apiSuccess }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Form",
  data: () => ({
    form1Valid: true,
    firstName: "",
    firstNameRules: [
      v => !!v || "First name is required",
      v => (v && v.length <= 10) || "First name must be less than 10 characters"
    ],
    lastName: "",
    lastNameRules: [
      v => !!v || "Last name is required",
      v => (v && v.length <= 10) || "Last name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "Email is required",
      v => {
        if (v) return true;

        return "";
      }
    ],
    team: "",
    teamRules: [v => !!v || "Team is required"],
    teams: ["Seahawks", "Patriots", "Chiefs"],
    tab: 1,
    showError: null,
    snackbar: null,
    apiSuccess: ""
  }),
  methods: {
    saveForm() {
      this.showError = false;

      console.log("SAVING " + this.team);

      if (this.team == "Seahawks") {
        this.snackbar = true;
        this.apiSuccess = "This message came from the API";
        console.log("CORRECT!@");
      } else {
        this.showError = true;
      }
    }
  }
};
</script>
