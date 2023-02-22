<template>
  <MainLayout>
    <h1>Edit note</h1>
    <Input v-model:value="note" class="input" placeholder="Note" />

    <InputGroup compact>
      <Input
        v-model:value="todoField"
        class="add-todo-input"
        placeholder="Type a new todo"
        @keyup.enter="addTodo"
      />
      <Button @click="addTodo" class="add-todo-button" type="primary"
        >Add todo</Button
      >
    </InputGroup>
    <template v-if="loading">
      <Spinner />
    </template>
    <template v-else>
      <List
        class="todos"
        size="small"
        bordered
        :data-source="todos"
        :locale="{ emptyText: EMPTY_TODOS_MESSAGE }"
      >
        <template #renderItem="{ item }">
          <ListItem
            >{{ item.title }}
            <a
              @click.prevent="removeItem(item.id)"
              class="remove-btn"
              href=""
              title="Remove todo"
            >
              <DeleteOutlined class="icon-remove" />
            </a>
          </ListItem>
        </template>
      </List>
    </template>
    <Button :block="true" :disabled="loading" @click="onSaveChangesClick"
      >Save changes</Button
    >
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from "@/components/MainLayout.vue";
import { watchEffect, ref } from "vue";
import { useRoute } from "vue-router";
import {
  Input,
  Button,
  InputGroup,
  List,
  ListItem,
  message,
} from "ant-design-vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import type { ITodo } from "@/interfaces";
import { createTodo } from "@/utils";
import { getNoteData, saveChanges } from "@/api";
import Spinner from "@/components/Spinner.vue";
import { EMPTY_TODOS_MESSAGE } from "@/constants";

const note = ref("");
const todos = ref<ITodo[]>([]);
const todoField = ref("");
const loading = ref(false);
const route = useRoute();

async function populateNoteData() {
  loading.value = true;
  const info = await getNoteData(route.params.noteId as string);
  loading.value = false;

  if (info?.note) {
    note.value = info.note;
  }
  todos.value = info?.todos;
}

async function onSaveChangesClick() {
  try {
    await saveChanges(route.params.noteId as string, {
      note: note.value,
      todos: todos.value,
    });
    showSuccessMessage();
  } catch (error) {
    showErrorMessage();
    console.log("Error:", error);
  }
}

async function addTodo() {
  if (todoField.value.trim().length > 0) {
    todos.value.push(createTodo(todoField.value));
    todoField.value = "";
  }
}

function showSuccessMessage() {
  message.success("Successfully saved");
}

function showErrorMessage() {
  message.error("Error occurred!");
}

function removeItem(id: string) {
  todos.value = todos.value.filter((item) => item.id !== id);
}
watchEffect(() => {
  populateNoteData();
});
</script>

<style scoped>
.icon-remove {
  color: crimson;
}
.input {
  margin: 10px 0;
}

.add-todo-input {
  width: calc(100% - 150px);
}
.add-todo-button {
  width: 150px;
}
.todos {
  margin: 10px 0;
}

.remove-btn {
  margin-left: 15px;
}
</style>
