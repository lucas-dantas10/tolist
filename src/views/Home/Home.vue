<script setup>
import { onMounted, ref } from 'vue';
import TasksTable from './TasksTable.vue';
import TaskModal from './TaskModal.vue';

const DEFAULT_TASK = {
    id: '',
    title: '',
    description: '',
    category: {},
    priority: {},
    status: {},
}

const tasksModel = ref({...DEFAULT_TASK});
const showTaskModal = ref(false);

function showAddNewModal() {
    showTaskModal.value = true;
}

function editTask(task) {
    tasksModel.value = task;
    showAddNewModal();
}

function onModalClose() {
    tasksModel.value = {...DEFAULT_TASK};
    showTaskModal.value = false;
}

</script>

<template>
    <section>
        <div class="flex items-center justify-between mb-14">
            <div class="flex flex-col gap-2">
                <h1 class="text-4xl text-gray-900 font-bold">Tarefas</h1>

                <p class="text-gray-500">Aqui está uma lista das suas tarefas dessa semana!</p>
            </div>
            

            <router-link :to="{name: 'app.cadastro.tarefa'}" class="border rounded-md py-1 px-4 bg-gray-800 text-white">
                Add Tarefa
            </router-link>
        </div>

        <TasksTable @click-edit="editTask" />

        <TaskModal :model-value="showTaskModal" :task="tasksModel" @close="onModalClose" />
        
    </section>
</template>