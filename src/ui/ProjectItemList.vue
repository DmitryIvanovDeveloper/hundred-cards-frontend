<script setup lang="ts">
import ProjectSidebarItemLayout from "@/ui/ProjectSidebarItemLayout.vue";
import ProjectSidebarElementLayout from "@/ui/ProjectSidebarElementLayout.vue";
import { onMounted, ref } from "vue";

export interface ProjectItem {
  id: string;
  name: string;
  checked?: boolean
  edited?: boolean
}

export interface IProjectItemListProps {
  title: string;
  items: Array<ProjectItem>;
  onCreate: () => void;
  onEdit: (id: string) => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  selectedId: string;
  droppable?: boolean;
  checkable?: boolean;
}

const { title, items, onCreate, onEdit, onSelect, onDelete, selectedId, droppable } =
  defineProps<IProjectItemListProps>();

const draggedItem = ref<number | null>(null);
const draggedOverIndex = ref<number>(-1);

const onDragStart = (index: number): void => {
  draggedItem.value = index;
  draggedOverIndex.value = -1;
};

const onDragOver = (e: DragEvent, index: number): void => {
  e.preventDefault();
  draggedOverIndex.value = index;
};

const onDrop = (index: number): void => {
  if (draggedItem.value === null || draggedOverIndex.value === null) return;

  const draggedItemData = items[draggedItem.value];
  const updatedItems = [...items];

  updatedItems.splice(draggedItem.value, 1);
  updatedItems.splice(index, 0, draggedItemData);

  items.splice(0, items.length, ...updatedItems);

  draggedItem.value = null;
  draggedOverIndex.value = -1;
};
</script>

<template>

  
  <ProjectSidebarItemLayout :title="title" :onAdd="onCreate">
    <div class="flex flex-col gap-[10px] w-full pl-6">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        draggable="true"
        @dragstart="onDragStart(index)"
        @dragover="(e) => onDragOver(e, index)"
        @drop="onDrop(index)"
        :class="[
            draggedOverIndex === index ? 'bg-purple-50' : '',
        ]"
      >
        <ProjectSidebarElementLayout
            :title="item.name"
            :onSelect="() => onSelect(item.id)"
            :onEdit="() => onEdit(item.id)"
            :onDelete="() => onDelete(item.id)"
            :droppable="droppable"
            :selected="item.id === selectedId"
            :checkable="checkable ?? false"
            :edited="item.edited"
        />
      </div>
    </div>
  </ProjectSidebarItemLayout>
</template>
