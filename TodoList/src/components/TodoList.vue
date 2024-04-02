<template>
    <div class="list">
        <h4>Search</h4>
        <input v-model="searchText" type="text" placeholder="Search">
        <h4 v-if="searchText">Search Results</h4>
        <ul v-if="searchText">
            <li v-for="(todo, index) in filterText" :key='index'>
                {{ todo.text }}
                <button @click="removeTodo(index)">Delete</button>
            </li>
        </ul>

        <h4>To Do List</h4>
        <input v-model="newTodo" @keyup.enter="addTodo" type="text" placeholder="Add to do information">
        <button @click="addTodo">Add</button>

        <ul>
            <li v-for="(todo, index) in todos" :key='index'>
                <input type="checkbox" v-model="checkTodo[index]" @change="removeChecked(index)">
                {{ todo.text }}
                <button @click="removeTodo(index)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup name="Person">
    import {ref, watchEffect} from 'vue'

    let searchText=ref('')
    let newTodo = ref('')
    let todos = ref([] as { text:string }[])
    let filterText = ref([] as { text: string }[])
    let checkTodo = ref([] as boolean[] )

    watchEffect(() => {
        filterText.value = todos.value.filter(item => item.text.toLowerCase().includes(searchText.value.toLowerCase()))
    })

    function addTodo() {
        if (newTodo.value.trim()!=='') {
            todos.value.push({ text:newTodo.value })
            checkTodo.value.push(false)
            newTodo.value = ''
        }
    }

    function removeTodo(index:number){
        todos.value.splice(index, 1);
    }

    function removeChecked(index:number){
        if (checkTodo.value[index]) {
            todos.value.splice(index, 1);
            checkTodo.value.splice(index, 1);
        }
    }


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