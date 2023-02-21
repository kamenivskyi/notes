<template>
  <InputGroup compact>
    <Input
      class="add-note-input"
      v-model:value="message"
      placeholder="Добавити нотатку"
    />
    <Button type="primary">Добавити</Button>
  </InputGroup>
</template>

<script lang="ts">
import Input from "ant-design-vue/lib/input";
import { InputGroup } from "ant-design-vue/lib/input";
import Button from "ant-design-vue/lib/button";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const message = ref("");

    return {
      message,
    };
  },
  components: {
    Input,
    InputGroup,
    Button,
  },
});
</script>

<style scoped>
input.add-note-input {
  width: calc(100% - 200px);
}
</style>
