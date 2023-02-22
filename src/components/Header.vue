<template>
  <header>
    <nav>
      <RouterLink class="nav-link" to="/"><Button> Home </Button></RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { Button } from "ant-design-vue";
</script>

<style scoped>
.nav-link {
  display: block;
  font-size: 19px;
  margin-bottom: 15px;
}
</style>
