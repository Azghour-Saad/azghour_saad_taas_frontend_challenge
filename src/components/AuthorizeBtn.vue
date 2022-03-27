<template>
  <div class="auth">
    <button
      @click="authGithub"
      class="justify-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
    >
      Authorize my Github account
    </button>
  </div>
</template>

<script>
import * as config from "../config/config";
import "dotenv/config";

const GITHUB_CLIEN_ID = config.development.GITHUB_CLIEN_ID;
const REDIRECT_URI = config.development.REDIRECT_URI;

export default {
  name: "AuthorizeBtn",
  props: {
    // msg: String
  },
  data() {
    return {
      config,
    };
  },

  mounted() {},

  methods: {
    authGithub() {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIEN_ID}&scope=user&redirect_uri=${REDIRECT_URI}`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
