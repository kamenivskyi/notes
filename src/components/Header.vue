<template>
  <header>
    <nav>
      <RouterLink class="nav-link" to="/">
        <Button class="nav-button">Home </Button>
      </RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { Button } from "ant-design-vue";
</script>

<style scoped>
.nav-link {
  font-size: 19px;
}
.nav-button {
  margin-bottom: 15px;
}
</style>
