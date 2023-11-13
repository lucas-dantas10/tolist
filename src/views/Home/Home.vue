<script setup>
import TasksTable from './TasksTable.vue';
</script>

<template>
    <section>
        <div class="flex items-center justify-between mb-14">
            <h1 class="text-4xl text-gray-900 font-bold">Tarefas</h1>

            <button class="border rounded-md py-2 px-4 bg-blue-700 text-white">
                Add Tarefa
            </button>
        </div>

        <TasksTable />
        
    </section>
</template>