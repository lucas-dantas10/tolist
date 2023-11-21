<script setup>
import { computed, onMounted, ref } from 'vue';
import DropdownSearch from '../../components/DropdownSearch/DropdownSearch.vue';
import Dropdown from '../../components/Dropdown/Dropdown.vue';
import store from '../../store';

const tasks = computed(() => store.state.tasks.data);
const status = computed(() => store.state.status.data);
const priorities = computed(() => store.state.priority.data);
const views = ref([{type: 'Titulo'}, {type: 'Status'}, { type: 'Prioridade' }]);
const isViewActive = ref({title: true, status: true, priority: true});

const search = ref('');
const perPage = ref(10);
const sortField = ref('title');
const sortDirection = ref('asc');
const priorityId = ref(0);
const statusId = ref(0);

onMounted(() => {
    getTasks();
    getStatus();
    getPriority();
});

function getTasks(url = null) {
    store.dispatch('getTasks', {
        url,
        search: search.value,
        per_page: perPage.value,
        sort_field: sortField.value,
        sort_direction: sortDirection.value,
        status: statusId.value,
        priority: priorityId.value,
    });
}

function getStatus() {
    store.dispatch('getStatus');
}

function getPriority() {
    store.dispatch('getPriority');
}

function filter(item) {
    if (store.state.status.options.includes(item.type) && !item.isCheck) {
        statusId.value = item.id;
        getTasks();
        return;
    }

    if (store.state.priority.options.includes(item.type) && !item.isCheck) {
        priorityId.value = item.id;
        getTasks();
        return;
    }

    switch (item.type) {
        case "Titulo":
            isViewActive.value.title = !isViewActive.value.title;
            break;
        case "Status":
            isViewActive.value.status = !isViewActive.value.status;
            break;
        case "Prioridade":
            isViewActive.value.priority = !isViewActive.value.priority;
            break;
    }

    statusId.value = 0;
    priorityId.value = 0;
    getTasks();
    
}

function deleteTask(action) { 
    action.type = action.type.toLowerCase();
    if (action.type == 'deletar') {
        if (!confirm('Você deseja deletar esta tarefa?')) {
            return;
        }
        store.dispatch('deleteTask', action.task.id);
        getTasks();
        return;
    }

    // if (action.type == 'editar') {
    //     store.dispatch('editarTask', action.task.id);
    // }
    
}

function reset() {
    search.value = '';
    perPage.value = 10;
    sortField.value = 'title';
    sortDirection.value = 'asc';
    priorityId.value = 0;
    statusId.value = 0;
    getTasks();
}

</script>

<template>
    <div>
        <form @submit.prevent="getTasks()" class="flex flex-col items-start gap-2 mb-8 lg:flex-row lg:items-center lg:justify-between">
            <div class="flex flex-col items-start gap-2 lg:flex-row lg:items-center">
                <input
                    type="text"
                    placeholder="Filtro tarefas..."
                    v-model="search"
                    class="border border-gray-200 rounded-lg px-2 py-1 focus:outline-gray-200"
                />

                <DropdownSearch title="Status" icon="bi-plus-circle" :items="status" @checked="filter" />

                <DropdownSearch title="Prioridade" icon="bi-plus-circle" :items="priorities" @checked="filter" />

                <button v-if="search != ''" type="button" @click="reset()" class="font-semibold px-4 py-1 hover:border hover:bg-gray-100 hover:rounded-md transition-colors">
                    Reset
                    <v-icon name="io-close-outline" />
                </button>
            </div>

            <DropdownSearch title="View" icon="bi-arrow-down-up" margin-inline="-9" :items="views" @checked="filter" />

            <button
                type="submit"
                class="border border-blue-700 bg-blue-700 text-white rounded-lg px-4 py-1 hover:bg-blue-500 transition-colors lg:hidden"
            >
                Pesquisar
            </button>
        </form>

        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">Tarefa</th>
                        <th v-if="isViewActive.title" scope="col" class="px-6 py-3">Titulo</th>
                        <th v-if="isViewActive.status" scope="col" class="px-6 py-3">Status</th>
                        <th v-if="isViewActive.priority" scope="col" class="px-6 py-3">Prioridade</th>
                        <th scope="col" class="px-6 py-3">Ações</th>
                    </tr>
                </thead>

                <tbody v-if="tasks.length == 0">
                    <h2 class="p-6">Não possui tarefas</h2>
                </tbody>
                <tbody v-else>
                    <tr v-for="(task, i) in tasks" :key="i" class="bg-white border-b border-gray-50 text-gray-900">
                        <th
                            scope="row"
                            class="px-6 py-4 font-medium whitespace-nowrap"
                        >  
                            <div class="flex items-center gap-2">
                                <input type="checkbox" id="myCheckbox" class="form-checkbox w-4 h-4 rounded-md text-indigo-600 checked:bg-gray-900:rounded-md">
                                {{task.title}}
                            </div>                            
                        </th>
                        <td class="px-6 py-4" v-if="isViewActive.title">
                            <span class="border border-gray-200 px-2 py-1 rounded-md mr-2">{{task.category.name}}</span>
                            {{task.description}}
                        </td>
                        <td class="px-6 py-4" v-if="isViewActive.status">
                            <v-icon :name="task.status.icon" fill="black" />
                            {{task.status.type}}
                        </td>
                        <td class="px-6 py-4" v-if="isViewActive.priority">
                            <v-icon :name="task.priority.icon" fill="black" />
                            {{task.priority.type}}
                        </td>
                        <td class="px-6 py-4">
                            <Dropdown icon="bi-three-dots" :items="[{title: 'Editar', task: task}, {title: 'Deletar', task: task}]" @action="deleteTask" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
