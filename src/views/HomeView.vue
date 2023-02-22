<script setup lang="ts">
import MainLayout from "@/components/MainLayout.vue";
import AddNoteForm from "@/components/AddNoteForm.vue";
import NotesList from "@/components/NotesList.vue";
import { ref } from "vue";
import type { INote } from "@/interfaces";

const item = ref<INote>({ note: "", todos: [] });
const loading = ref(false);

function onAddNewNote(note: INote) {
  item.value = note;
}

function onLoading(event: boolean) {
  loading.value = event;
}
</script>

<template>
  <MainLayout>
    <AddNoteForm @newNote="onAddNewNote" :loading="loading" />
    <NotesList :newNote="item" @loading="onLoading" />
  </MainLayout>
</template>
