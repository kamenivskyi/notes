<script lang="ts">
import Button from "ant-design-vue/lib/button";

import MainLayout from "@/components/MainLayout.vue";
import { defineComponent } from "vue";
import AddNoteForm from "@/components/AddNoteForm.vue";
import NotesList from "@/components/NotesList.vue";

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    MainLayout,
    AddNoteForm,
    NotesList,
  },
});
</script>

<template>
  <MainLayout>
    <AddNoteForm />
    <NotesList />
  </MainLayout>
  <!-- <Button>Кнопка</Button> -->
</template>
