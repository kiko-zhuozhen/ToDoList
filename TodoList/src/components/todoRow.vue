<template>
    <li>
        <input type="checkbox" v-model="todo.done">
        <input v-if="todo.editing"
               :value="todo.text"
               @input="handleInput"
               @keyup.enter="finishEdit">
        <span v-else @click="emitEdit">
            {{ todo.text }}
        </span>
        <button @click="emitRemove">Delete</button>
    </li>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import type { Todo } from '../models/Todo';

const props = defineProps<{
    todo: Todo;
}>();

const emit = defineEmits(['update-todo', 'edit', 'remove']);

function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const newText = target.value;
    emit('update-todo', { ...props.todo, text: newText });
}

function finishEdit() {
    emit('update-todo', { ...props.todo, editing: false });
}

function emitEdit() {
    emit('edit', props.todo);
}

function emitRemove() {
    emit('remove', props.todo.id);
}
</script>