<template>
  <div class="auth">
    <!-- <h1>{{ msg }}</h1> -->
    <button
      class="justify-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
    >
      Authorize my Github account
    </button>
  </div>
</template>

<script>
export default {
  name: "AuthorizeBtn",
  props: {
    // msg: String
  },

  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
