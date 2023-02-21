<script lang="ts">
import Input from "ant-design-vue/lib/input";
import List from "ant-design-vue/lib/list";
import ListItem from "ant-design-vue/lib/list/Item";
import ListItemMeta from "ant-design-vue/lib/list/ItemMeta";
import { defineComponent } from "vue";

interface DataItem {
  title: string;
}
const data: DataItem[] = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

export default defineComponent({
  setup() {
    return { data };
  },
  components: {
    Input,
    List,
    ListItem,
    ListItemMeta,
  },
});
</script>

<template>
  <List item-layout="horizontal" :data-source="data">
    <template #renderItem="{ item }">
      <ListItem>
        <ListItemMeta
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        >
          <template #title>
            <!-- <a href="https://www.antdv.com/">{{ item.title }}</a> -->
            <p>Title some</p>
          </template>
        </ListItemMeta>
      </ListItem>
    </template>
  </List>
</template>
