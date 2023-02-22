<script setup lang="ts">
import Input from "ant-design-vue/lib/input";
import List from "ant-design-vue/lib/list";
import ListItem from "ant-design-vue/lib/list/Item";
import ListItemMeta from "ant-design-vue/lib/list/ItemMeta";
import { defineComponent, ref, createVNode, onMounted } from "vue";
import { Modal } from "ant-design-vue";
import ConfirmModal from "./ui/ConfirmModal.vue";
import { useRoute, useRouter } from "vue-router";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { transformQuerySnapshotToItems } from "@/utils";

// export default defineComponent({
//   setup() {
interface DataItem {
  title: string;
}

const items = ref<any[]>([]);

onMounted(() => {
  console.log("mounted");
  getAllNotes();
});

async function getAllNotes() {
  const notesColName = "notes";
  const q = collection(db, notesColName);
  const querySnapshot = await getDocs(q);

  items.value = transformQuerySnapshotToItems(querySnapshot);
}

const visible = ref<boolean>(false);
const router = useRouter();

const showModal = () => {
  visible.value = true;
};
const hideModal = () => {
  visible.value = false;
};
const goToEdit = (id: string) => {
  router.push({ name: "edit", params: { noteId: id } });
};
const confirm = () => {
  // icon: createVNode(ExclamationCircleOutlined),
  Modal.confirm({
    title: "Confirm",
    content: "Delete the note?",
    okText: "Ok",
    onOk: () => {
      console.log("OK@");
    },
    onCancel: () => {
      console.log("cancel");
    },
    cancelText: "Cancel",
  });
};

// const data: DataItem[] = [
//   {
//     title: "Ant Design Title 1",
//   },
//   {
//     title: "Ant Design Title 2",
//   },
//   {
//     title: "Ant Design Title 3",
//   },
//   {
//     title: "Ant Design Title 4",
//   },
// ];
</script>

<template>
  <List item-layout="horizontal" :data-source="items">
    <template #renderItem="{ item }">
      <ListItem>
        <ListItemMeta
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        >
          <template #title>
            <p>{{ item.note }}</p>
          </template>
        </ListItemMeta>
        <template #actions>
          <p key="list-edit" @click="goToEdit(item.docId)">edit</p>
          <p @click="confirm" key="list-remove">delete</p>
        </template>
      </ListItem>
    </template>
  </List>
  <!-- <ConfirmModal
    :showModal="showModal"
    :hideModal="hideModal"
    :confirm="confirm"
    :visible="visible"
  /> -->
</template>
