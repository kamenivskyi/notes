<template>
  <div class="layout">
    <Header />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
</script>

<style scoped>
.layout {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
</style>
