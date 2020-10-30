<template>
  <div>
    <h1>My Profile</h1>
    <p>** This information is all read-only</p>

    <div class="row ">
      <div class="col-md-6 mb-3">
        <v-text-field
          v-model="firstName"
          outlined
          label="First name"
          readonly
          hide-details
        ></v-text-field>
      </div>
      <div class="col-md-6 mb-3">
        <v-text-field
          v-model="lastName"
          outlined
          label="Last name"
          readonly
          hide-details
        ></v-text-field>
      </div>

      <div class="col-md-6 mb-3">
        <v-text-field
          v-model="email"
          outlined
          label="Email"
          readonly
          hide-details
        ></v-text-field>
      </div>
      <div class="col-md-6 mb-3">
        <v-text-field
          v-model="username"
          outlined
          label="Username"
          readonly
          hide-details
        ></v-text-field>
      </div>
    </div>
    <v-divider class="mt-0 mb-4"></v-divider>

    <h2>My teams</h2>
    <div class="row">
      <div class="col-md-6" v-for="team in teams" v-bind:key="team.name">
        <v-card color="#fff2d5">
          <v-card-title> {{ team.name }}</v-card-title>
          <v-card-text>Role: {{ team.role }}</v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store";
//import router from "../router";

export default {
  name: "Profile",
  computed: {
    ...mapState("profile", [
      "firstName",
      "lastName",
      "username",
      "email",
      "teams"
    ])
  },
  data: () => ({}),
  async created() {
    await store.dispatch("profile/loadProfile");
  }
};
</script>
