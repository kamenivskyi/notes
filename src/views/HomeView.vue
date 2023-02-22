<script setup lang="ts">
import MainLayout from "@/components/MainLayout.vue";
import AddNoteForm from "@/components/AddNoteForm.vue";
import NotesList from "@/components/NotesList.vue";
</script>

<template>
  <MainLayout>
    <AddNoteForm />
    <NotesList />
  </MainLayout>
</template>
