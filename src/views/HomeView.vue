<script setup lang="ts">
import MainLayout from "@/components/MainLayout.vue";
import AddNoteForm from "@/components/AddNoteForm.vue";
import NotesList from "@/components/NotesList.vue";
import { ref } from "vue";
import type { INote } from "@/interfaces";

const item = ref<INote>({ note: "", todos: [] });

function watchNewNote(note: INote) {
  item.value = note;
}
</script>

<template>
  <MainLayout>
    <AddNoteForm @newNote="watchNewNote" />
    <NotesList :newNote="item" />
  </MainLayout>
</template>
