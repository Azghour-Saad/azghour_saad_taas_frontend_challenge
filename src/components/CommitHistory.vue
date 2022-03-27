<template lang="">
  <div>
    <div
      class="mt-0 space-x-2 text-base border-2 border-solid rounded border-slate-400 bg-gray-50"
    >
      <div class="flex items-start mt-1 ml-2">
        <h4 class="font-semibold text-slate-500">{{ commitMessage }}</h4>
      </div>
      <div class="flex items-center">
        <div>
          <img
            class="inline-block w-12 h-12 mt-2 mb-2 mr-2 rounded-full ring-2 ring-white"
            :src="authorAvatar"
          />
        </div>
        <div>
          <strong class="mr-1 text-xs">{{ authorOfCommit }}</strong>
          <span class="text-xs">{{ dateOfCommit }}</span>
        </div>
      </div>
    </div>
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
    authorAvatar: String,
  },
};
</script>
<style lang=""></style>
