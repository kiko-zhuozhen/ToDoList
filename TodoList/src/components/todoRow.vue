<template>
    <li>
        <div>
        <input type="checkbox" v-model="todo.done">
        <input v-if="todo.editing"
               :value="todo.text"
               @input="handleInput"
               @keyup.enter="finishEdit">
        <span v-else @click="ToggleEdit">
            {{ todo.text }}
        </span>
        </div>

        <span style="margin-left:60px">ç
            {{ formattedDate }}
        </span>
        <button @click="handleDeleteClick">Delete</button>
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

