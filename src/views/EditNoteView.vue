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
    <List
      class="todos"
      size="small"
      bordered
      :data-source="todos"
      :locale="{ emptyText: 'No todos yet' }"
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

    <Button :block="true" @click="saveChanges">Save changes</Button>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from "@/components/MainLayout.vue";
import { db } from "@/firebase/firebaseConfig";
import type { INote } from "@/interfaces";
import { doc, getDoc, setDoc, type DocumentData } from "@firebase/firestore";
import { watchEffect, ref, reactive } from "vue";
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
import { NOTES_COLLECTION_NAME } from "@/constants";

const note = ref("");
const todos = ref<ITodo[]>([]);
const todoField = ref("");
const route = useRoute();

async function getNoteData() {
  try {
    const noteRef = doc(
      db,
      NOTES_COLLECTION_NAME,
      route.params.noteId as string
    );
    const data = (await getDoc(noteRef)).data();

    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

async function populateNoteData() {
  const info = await getNoteData();

  if (info?.note) {
    note.value = info.note;
  }
  todos.value = info?.todos;
}

async function saveChanges() {
  try {
    const docRef = doc(
      db,
      NOTES_COLLECTION_NAME,
      route.params.noteId as string
    );
    await setDoc(
      docRef,
      { note: note.value, todos: todos.value },
      { merge: true }
    );
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
