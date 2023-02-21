<script setup lang="ts">
import Button from "ant-design-vue/lib/button";

import MainLayout from "@/components/MainLayout.vue";
import { defineComponent, ref, createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import AddNoteForm from "@/components/AddNoteForm.vue";
import NotesList from "@/components/NotesList.vue";
import ConfirmModal from "@/components/ui/ConfirmModal.vue";
import { Modal } from "ant-design-vue";

// export default defineComponent({
//   setup() {
const visible = ref<boolean>(false);

const showModal = () => {
  visible.value = true;
};
const hideModal = () => {
  visible.value = false;
};

const confirm = () => {
  // icon: createVNode(ExclamationCircleOutlined),
  Modal.confirm({
    title: "Confirm",
    content: "Delete the note?",
    okText: "Ok",
    onOk: () => {
      console.log("OK@@@@");
    },
    onCancel: () => {
      console.log("cancel!!");
    },
    cancelText: "Cancel",
  });
};

//   return {};
// },
// components: {
//   MainLayout,
//   AddNoteForm,
//   NotesList,
//   Modal,
// },
// });
</script>

<template>
  <MainLayout>
    <AddNoteForm />
    <NotesList />
  </MainLayout>
  <!-- <Button>Кнопка</Button> -->
</template>
