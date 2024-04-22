<template>
    <div class="list">
        <h4>Search</h4>
        <input v-model="searchText" type="text" placeholder="Search">

        <h4>To Do List</h4>
        <input v-model="newTodo" @keyup.enter="addTodo" type="text" placeholder="Add to do information">
        <button @click="addTodo">Add</button>

        <!-- 如果searchText 没有值就显示全部列表 如果有值就显示下面的 -->
        <!-- 用一个computed属性去计算 -->

        <todo-row v-for="(todo, index) in currentTodos"
            :key="todo.id"
            :todo="todo"
            @edit="edit"
            @remove="removeTodo"
            @update-todo="updateTodo">
        </todo-row>

            <!-- <li v-for="(todo, index) in todos" :key='todo.id'> -->
                <!-- 使用value和@input input有一个事件 当这个东西触发 就会返回一个新的值 --> 
                <!-- 里面的数据可以编辑的 -->
                <!-- <input type="checkbox" v-model="todo.done"> -->
                <!-- 前面这个变量有值的情况下才运行 -->
                <!-- <input v-if="todo.editing" :value="todo.text" @input="event => todo.text = (event.target as any)?.target" @keyup.enter="finishEdit(todo)"> -->

                <!-- <input v-if="todo.editing" 
                    :value="todo.text" 
                    @input="event => {
                        const newText = (event.target as any)?.value
                        const newTodo = {
                            ...todo,
                            text: newText,
                        }
                        updateTodo(newTodo)
                    }"
                    @keyup.enter="() => {
                        const newTodo: Todo = {
                            ...todo,
                            editing: false
                        }
                        updateTodo(newTodo)
                    }"
                >
                <span v-else @click="edit(todo)"> {{ todo.text }} </span>
                <button @click="removeTodo(todo.id)">Delete</button>
            </li> -->  

        <!-- 计数器 -->
        <p>{{ completeTodos }} / {{ totalTodos }}</p>

    </div>
</template>

<script lang="ts" setup>
    import { ref, computed, watchEffect } from 'vue';
    import type { Todo } from '../models/Todo';
    import { generateUuid } from '../utils/generateUuid';
    import TodoRow from './TodoRow.vue';

    let searchText = ref<string>('');
    let newTodo = ref<string>('');
    let todos = ref<Todo[]>([]);
    let filterTodos = ref<Todo[]>([]);

    watchEffect(() => {
        filterTodos.value = todos.value.filter(item => item.text.toLowerCase().includes(searchText.value.toLowerCase()))
    })

    const currentTodos = computed(()=> {
        return searchText.value === '' ? todos.value : filterTodos.value;
    });

    function addTodo() {
        if (newTodo.value.trim() === '') {
            return;
        }
        todos.value.push({
            id: generateUuid(),
            text: newTodo.value,
            done: false,
            editing: false
        });
        newTodo.value = '';
    }

    function removeTodo(todoID: string) {
        const index = todos.value.findIndex(todo => todo.id === todoID);
        if (index !== -1) {
            todos.value.splice(index, 1);
        }
    }

    function edit(todo:Todo) {
        todo.editing = true;
    }

    function updateTodo(newVal: Todo) {
        const index = todos.value.findIndex(todo => todo.id === newVal.id)
        if(index === -1) {
            return
        }
        todos.value.splice(index, 1, newVal)
    }

    const totalTodos = computed(() => {
        return todos.value.length;
    })

    const completeTodos = computed(() => {
        return todos.value.filter(todo => todo.done).length;
    })


</script>

<style scoped>
    .list{
        background-color: skyblue;
        box-shadow: 0 0 10px;
        padding: 20px;
    }
    button{
        margin:0 10px;
    }
</style>