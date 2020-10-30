<template>
  <div class="home">
    <h1>{{title}}</h1>
    <p>This is a template that can be used for many different types of applications</p>
    <p>It is probably best if you <router-link to="/sign-in">sign in</router-link> to see more things.</p>
  </div>
</template>

<script>
// @ is an alias to /src
import * as config from "../config";
import router from '../router';
import store from '../store';

export default {
  name: "Home",
  data: () => ({
    title: `Welcome to ${config.applicationName}`
  }),
  async created() {
    await store.dispatch("checkAuthentication");
    var isAuth = store.getters.isAuthenticated;

    if (isAuth)
      router.push("/dashboard");
  },
  methods: {
  }
};
</script>
