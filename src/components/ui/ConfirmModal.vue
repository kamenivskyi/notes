<template>
  <div>
    <!-- <Button type="primary" @click="showModal">Modal</Button>
    <Button @click="confirm">Confirm</Button> -->
    <!-- v-model:visible="visible" -->
    <!-- <Modal title="Modal" ok-text="确认" cancel-text="取消" @ok="hideModal">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Modal> -->
  </div>
</template>
<script setup lang="ts">
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref, createVNode } from "vue";
import { Modal, Button } from "ant-design-vue";

interface IProps {
  visible: boolean;
  showModal: () => void;
  hideModal: () => void;
  confirm: () => void;
}

defineProps<IProps>();

// export default defineComponent({
// name: "ConfirmModal",
// setup() {
// return {};
// return {
//   visible,
//   showModal,
//   hideModal,
//   confirm,
// };
// },
// components: {
//   Modal,
//   Button,
// },
// });
</script>
