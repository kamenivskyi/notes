<template>
  <div>
    <h1>Edit note</h1>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
console.log("route: ", route.params);
watch(
  () => route.params,
  (toParams, prevParams) => {
    console.log("toParams: ", toParams);
    console.log("prevParams: ", prevParams);
  }
);
</script>

<style></style>
