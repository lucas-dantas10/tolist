<script setup>
import { computed, onMounted, ref } from 'vue';
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
            <h1 class="text-4xl text-gray-900 font-bold">Tarefas</h1>

            <button class="border rounded-md py-1 px-4 bg-gray-800 text-white">
                Add Tarefa
            </button>
        </div>

        <TasksTable @click-edit="editTask" />

        <TaskModal :model-value="showTaskModal" :task="tasksModel" @close="onModalClose" />
        
    </section>
</template>