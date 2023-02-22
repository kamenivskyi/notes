<template>
  <template v-if="loading"><Spinner /> </template>
  <template v-else>
    <List
      item-layout="horizontal"
      :data-source="items"
      :locale="{ emptyText: EMPTY_NOTES_MESSAGE }"
    >
      <template #renderItem="{ item }">
        <NoteItem :item="item" :showConfirmRemoveNote="showConfirmRemoveNote" />
      </template>
    </List>
  </template>
</template>

<script setup lang="ts">
import List from "ant-design-vue/lib/list";
import { ref, onMounted, watch } from "vue";
import { message, Modal } from "ant-design-vue";
import type { INote } from "@/interfaces";
import { EMPTY_NOTES_MESSAGE, removeNoteModalSettings } from "@/constants";
import { getAllNotes, removeFirebaseNoteDocument } from "@/api";
import Spinner from "./Spinner.vue";
import NoteItem from "./NoteItem.vue";

interface IProps {
  newNote: INote;
}

const props = defineProps<IProps>();
const emit = defineEmits(["loading"]);

const items = ref<INote[]>([]);
const loading = ref(false);

onMounted(() => {
  populateNotes();
});

watch(
  () => props.newNote,
  (newNote: INote) => populateEmittedNote(newNote),
  { deep: true }
);

async function populateNotes() {
  emit("loading", true);
  loading.value = true;

  items.value = await getAllNotes();

  loading.value = false;
  emit("loading", false);
}

function populateEmittedNote(newNote: INote) {
  items.value.push(newNote);
}

async function handleRemoveNote(noteId: string) {
  try {
    await removeFirebaseNoteDocument(noteId);
    removeNoteFromArray(noteId);
    message.success("Successfully removed");
  } catch (error) {
    message.error("Failed to remove note");
    console.log("Error: ", error);
  }
}

function removeNoteFromArray(noteId: string) {
  items.value = items.value.filter((item) => item.docId !== noteId);
}

function showConfirmRemoveNote(noteId?: string) {
  if (noteId) {
    Modal.confirm({
      onOk: () => handleRemoveNote(noteId),
      ...removeNoteModalSettings,
    });
  }
}
</script>

<style scoped>
.note-title {
  font-weight: 600;
}
.todo-item {
  padding-left: 15px;
}
</style>
