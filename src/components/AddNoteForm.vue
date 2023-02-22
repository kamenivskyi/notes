<template>
  <InputGroup compact>
    <Input
      v-model:value="message"
      class="add-note-input"
      placeholder="Add a note"
      @keyup.enter="addNewNote"
    />
    <Button
      @click="addNewNote"
      :disabled="loading"
      class="add-note-btn"
      type="primary"
      >Add</Button
    >
  </InputGroup>
</template>

<script setup lang="ts">
import Input from "ant-design-vue/lib/input";
import { InputGroup } from "ant-design-vue/lib/input";
import Button from "ant-design-vue/lib/button";
import { ref } from "vue";
import { setDoc, doc } from "@firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { uuidv4 } from "@firebase/util";
import { NOTES_COLLECTION_NAME } from "@/constants";
import { createNote } from "@/utils";

interface IProps {
  loading: boolean;
}

defineProps<IProps>();

const message = ref("");
const emit = defineEmits(["newNote"]);

const addNewNote = async () => {
  const docId = uuidv4();
  const newNote = createNote(message.value, docId);

  try {
    await setDoc(doc(db, NOTES_COLLECTION_NAME, docId), newNote);
    emit("newNote", newNote);

    message.value = "";
  } catch (error) {}
};
</script>

<style scoped>
input.add-note-input {
  width: calc(100% - 150px);
}
.add-note-btn {
  width: 150px;
}
</style>
