<template>
  <InputGroup compact>
    <Input
      class="add-note-input"
      v-model:value="message"
      placeholder="Добавити нотатку"
    />
    <Button @click="addNewNote" type="primary">Добавити</Button>
  </InputGroup>
</template>

<script setup lang="ts">
import Input from "ant-design-vue/lib/input";
import { InputGroup } from "ant-design-vue/lib/input";
import Button from "ant-design-vue/lib/button";
import { ref } from "vue";
import { collection, addDoc, serverTimestamp } from "@firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

const message = ref("");

const addNewNote = async () => {
  console.log("message: ", message);
  await addDoc(collection(db, "notes"), {
    note: message.value,
    todos: [],
    timestamp: serverTimestamp(),
  });
  message.value = "";
};
</script>

<style scoped>
input.add-note-input {
  width: calc(100% - 200px);
}
</style>
