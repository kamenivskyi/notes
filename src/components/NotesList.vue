<script setup lang="ts">
import List from "ant-design-vue/lib/list";
import ListItem from "ant-design-vue/lib/list/Item";
import ListItemMeta from "ant-design-vue/lib/list/ItemMeta";
import { ref, createVNode, onMounted, watch } from "vue";
import { message, Modal } from "ant-design-vue";
import { useRouter } from "vue-router";
import { getLimitedList } from "@/utils";
import type { INote } from "@/interfaces";
import { removeNoteModalSettings } from "@/constants";
import { getAllNotes, removeFirebaseNoteDocument } from "@/api";

interface IProps {
  newNote: INote;
}

const props = defineProps<IProps>();

const items = ref<INote[]>([]);

onMounted(() => {
  populateNotes();
});

watch(
  () => props.newNote,
  (newNote: INote) => populateEmittedNote(newNote),
  { deep: true }
);

async function populateNotes() {
  items.value = await getAllNotes();
}

function populateEmittedNote(newNote: INote) {
  items.value.push(newNote);
}

const router = useRouter();

const goToEdit = (noteId: string) => {
  router.push({ name: "edit", params: { noteId } });
};
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

function showConfirmRemoveNote(noteId: string) {
  Modal.confirm({
    onOk: () => handleRemoveNote(noteId),
    ...removeNoteModalSettings,
  });
}
</script>

<template>
  <List
    item-layout="horizontal"
    :data-source="items"
    :locale="{ emptyText: 'No notes yet' }"
  >
    <template #renderItem="{ item }">
      <ListItem>
        <ListItemMeta>
          <template #title>
            <p>{{ item.note }}</p>
            <ul>
              <li v-for="todo in getLimitedList(item.todos)">
                {{ todo.title }}
              </li>
            </ul>
          </template>
        </ListItemMeta>
        <template #actions>
          <a key="list-edit" @click.prevent="goToEdit(item.docId)">edit</a>
          <a
            @click.prevent="showConfirmRemoveNote(item.docId)"
            key="list-remove"
          >
            delete
          </a>
        </template>
      </ListItem>
    </template>
  </List>
</template>

<style scoped>
.todo-item {
  padding-left: 15px;
}
</style>
