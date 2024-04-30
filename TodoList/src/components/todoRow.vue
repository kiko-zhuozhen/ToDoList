<template>
<li class="flex items-center justify-between bg-white p-3 rounded-lg shadow-md mb-2 mt-4">
    <div class="flex items-center">
        <input type="checkbox" v-model="todo.done" class="mr-2 h-4 w-4">
        <input v-if="todo.editing" 
            :value="todo.text" 
            @input="handleInput" 
            @keyup.enter="finishEdit" 
            class="border p-1 rounded-md mr-2 flex-1">
        <span v-else @click="ToggleEdit" class="cursor-pointer mr-2 select-none">{{ todo.text }}</span>
    </div>

    <div>
        <span class="text-sm text-gray-500 mr-4">{{ formattedDate }}</span>
        <button @click="handleDeleteClick" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md">Delete</button>
    </div>
</li>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';
import type { Todo } from '../models/Todo';
import { useDateFormat } from '@vueuse/core'

const formattedDate = computed(() => {
    return useDateFormat(props.todo.created, 'YYYY-MM-DD HH:mm:ss');
});

const props = defineProps<{
    todo: Todo;
}>();

const emit = defineEmits<{
    (e: 'update-todo', todo:Todo): void;
    (e: 'edit', todo:Todo): void;
    (e: 'remove', id:string):void;
}>()

function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const newText = target.value;
    emit('update-todo', { ...props.todo, text: newText });
}

function finishEdit() {
    emit('update-todo', { ...props.todo, editing: false });
}

function ToggleEdit() {
    emit('edit', props.todo);
}

function handleDeleteClick() {
    emit('remove', props.todo.id);
}

</script>

