<template>
  <div></div>
</template>

<script>
// this component can be configured to perform actions once the login process is completed
import router from "../router";

export default {
  name: "LoginComplete",
  created() {
    router.push("/");
  }
};
</script>
