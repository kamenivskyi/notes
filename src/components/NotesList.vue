<script setup lang="ts">
import List from "ant-design-vue/lib/list";
import ListItem from "ant-design-vue/lib/list/Item";
import ListItemMeta from "ant-design-vue/lib/list/ItemMeta";
import { ref, createVNode, onMounted } from "vue";
import { message, Modal } from "ant-design-vue";
import { useRouter } from "vue-router";
import { collection, deleteDoc, doc, getDocs } from "@firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { transformQuerySnapshotToItems } from "@/utils";

const removeNoteModalSettings = {
  title: "Confirm",
  content: "Delete the note?",
  okText: "Ok",
  cancelText: "Cancel",
};

const items = ref<any[]>([]);

onMounted(() => {
  console.log("mounted");
  getAllNotes();
});

async function getAllNotes() {
  const notesColName = "notes";
  const colRef = collection(db, notesColName);
  const querySnapshot = await getDocs(colRef);

  items.value = transformQuerySnapshotToItems(querySnapshot);
}

const router = useRouter();

const goToEdit = (id: string) => {
  router.push({ name: "edit", params: { noteId: id } });
};
async function handleRemoveNote(noteId: string) {
  try {
    await deleteDoc(doc(db, "notes", noteId));
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
  console.log("noteId: ", noteId);
  Modal.confirm({
    onOk: () => handleRemoveNote(noteId),
    onCancel: () => {
      console.log("cancel");
    },
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
        <ListItemMeta description="test">
          <template #title>
            <p>{{ item.note }}</p>
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
