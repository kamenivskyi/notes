<template>
  <ListItem>
    <ListItemMeta>
      <template #title>
        <p class="note-title">{{ item.note }}</p>
        <ul>
          <li v-for="todo in getLimitedList(item.todos)">
            {{ todo.title }}
          </li>
        </ul>
      </template>
    </ListItemMeta>
    <template #actions>
      <a key="list-edit" @click.prevent="goToEdit(item.docId)">edit</a>
      <a @click.prevent="showConfirmRemoveNote(item.docId)" key="list-remove">
        delete
      </a>
    </template>
  </ListItem>
</template>

<script setup lang="ts">
import type { INote } from "@/interfaces";
import { getLimitedList } from "@/utils";
import { ListItem, ListItemMeta } from "ant-design-vue";
import { useRouter } from "vue-router";

interface IProps {
  item: INote;
  showConfirmRemoveNote: (noteId?: string) => void;
}

defineProps<IProps>();

const router = useRouter();

const goToEdit = (noteId?: string) => {
  if (noteId) {
    router.push({ name: "edit", params: { noteId } });
  }
};
</script>
