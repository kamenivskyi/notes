<script setup lang="ts">
import List from "ant-design-vue/lib/list";
import ListItem from "ant-design-vue/lib/list/Item";
import ListItemMeta from "ant-design-vue/lib/list/ItemMeta";
import { ref, createVNode, onMounted, watch } from "vue";
import { message, Modal } from "ant-design-vue";
import { useRouter } from "vue-router";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "@firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { transformQuerySnapshotToItems, getLimitedList } from "@/utils";
import type { INote } from "@/interfaces";
import { NOTES_COLLECTION_NAME, removeNoteModalSettings } from "@/constants";

interface IProps {
  newNote: INote;
}

const props = defineProps<IProps>();

const items = ref<INote[]>([]);

onMounted(() => {
  getAllNotes();
});

watch(
  () => props.newNote,
  (newNote: INote) => populateEmittedNote(newNote),
  { deep: true }
);

function populateEmittedNote(newNote: INote) {
  items.value.push(newNote);
}

async function getAllNotes() {
  const q = query(collection(db, NOTES_COLLECTION_NAME), orderBy("timestamp"));
  const querySnapshot = await getDocs(q);

  items.value = transformQuerySnapshotToItems(querySnapshot);
}

const router = useRouter();

const goToEdit = (id: string) => {
  router.push({ name: "edit", params: { noteId: id } });
};
async function handleRemoveNote(noteId: string) {
  try {
    await deleteDoc(doc(db, NOTES_COLLECTION_NAME, noteId));
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
