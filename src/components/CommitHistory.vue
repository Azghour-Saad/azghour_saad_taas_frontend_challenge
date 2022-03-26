<template lang="">
  <div>
    <article>
      <h3>commit Message: {{ commitMessage }}</h3>
      <p>Author Of Commit: {{ authorOfCommit }}</p>
      <!-- <p>{{ commitHash }}</p> -->
      <p>Date Of Commit: {{ dateOfCommit }}</p>
    </article>
  </div>
</template>
<script>
export default {
  name: "CommitHistory",
  props: {
    commitMessage: String,
    hash: String,
    dateOfCommit: String,
    authorOfCommit: String,
  },
};
</script>
<style lang=""></style>
