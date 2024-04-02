<template>
    <div class="list">
        <h1>To Do List</h1>
        <input v-model="newTodo" @keyup.enter="addTodo" type="text" placeholder="Add to do information">
        <button @click="addTodo">Add</button>

        <ul>
            <li v-for="(todo, index) in todos" :key='index'>
                {{ todo.text }}
                <button @click="removeTodo(index)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup name="Person">
    import {ref} from 'vue'

    let newTodo = ref('')
    let todos = ref([] as { text:string }[])

    function addTodo() {
        if (newTodo.value.trim()!=='') {
            todos.value.push({ text:newTodo.value })
            newTodo.value = ''
        }
    }

    function removeTodo(index:number){
        todos.value.splice(index, 1);
    }

</script>

<style scoped>
/* scoped是局部样式，一定要加 */
    .list{
        background-color: skyblue;
        box-shadow: 0 0 10px;
        padding: 20px;
    }
    button{
        margin:0 10px;
    }
    .br{
        margin:10px 0;
    }
</style>