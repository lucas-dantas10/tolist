<script setup>
import { computed, onMounted, ref } from "vue";
import DropdownSearch from "../../components/DropdownSearch/DropdownSearch.vue";
import Dropdown from "../../components/Dropdown/Dropdown.vue";
import store from "../../store";

const tasks = computed(() => store.state.tasks);
const status = computed(() => store.state.status.data);
const priorities = computed(() => store.state.priority.data);
const spinner = computed(() => store.state.spinner);

const views = ref([{ type: "Titulo" }, { type: "Status" }, { type: "Prioridade" }]);
const isViewActive = ref({ title: true, status: true, priority: true });

const search = ref("");
const perPage = ref(10);
const sortField = ref("title");
const sortDirection = ref("asc");
const priorityId = ref(0);
const statusId = ref(0);


const emit = defineEmits(["click-edit"]);

onMounted(() => {
    getTasks();
    getStatus();
    getPriority();
});

function getTasks(url = null) {
    store.dispatch("getTasks", {
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
    store.dispatch("getStatus");
}

function getPriority() {
    store.dispatch("getPriority");
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
    if (action.type == "deletar") {
        if (!confirm(`Você deseja deletar a tarefa "${action.task.title}"" ?`)) {
            return;
        }
        store.dispatch("deleteTask", action.task.id);
        getTasks();
        return;
    }

    if (action.type == "editar") {
        emit("click-edit", action.task);
    }
}

function reset() {
    search.value = "";
    perPage.value = 10;
    sortField.value = "title";
    sortDirection.value = "asc";
    priorityId.value = 0;
    statusId.value = 0;
    getTasks();
}

function getForPage(link) {
    if (!link.url || link.active) {
        return;
    }

    getTasks(link.url);
}

function changeStatus(task, ev) {
    task.status.id = 3; // id do status 'Feito'
    if (ev.checked) {
        store.dispatch('updateTask', task)
            .finally(() => getTasks());
        
    } else {
        task.status.id = 1;
        store.dispatch('updateTask', task)
            .finally(() => getTasks());
    }
} 
</script>

<template>
    <div class="w-full h-screen">
        <form
            @submit.prevent="getTasks"
            class="flex flex-col items-start gap-2 mb-8 lg:flex-row lg:items-center lg:justify-between"
        >
            <div class="flex flex-col items-start gap-2 lg:flex-row lg:items-center">
                <input
                    type="text"
                    placeholder="Filtro tarefas..."
                    v-model="search"
                    class="border border-gray-200 rounded-lg px-2 py-[.1rem] focus:outline-gray-200 dark:bg-gray-200 dark:text-black"
                />

                <DropdownSearch title="Status" icon="bi-plus-circle" :items="status" @checked="filter" />

                <DropdownSearch title="Prioridade" icon="bi-plus-circle" :items="priorities" @checked="filter" />

                <button
                    v-if="search != ''"
                    type="button"
                    @click="reset()"
                    class="font-semibold px-4 py-1 hover:border hover:bg-gray-100 hover:rounded-md transition-colors dark:hover:bg-gray-700"
                >
                    Reset
                    <v-icon name="io-close-outline" />
                </button>
            </div>

            <DropdownSearch
                title="View"
                icon="bi-arrow-down-up"
                margin-inline="-9"
                :items="views"
                @checked="filter"
            />

            <button
                type="submit"
                class="border border-blue-700 bg-blue-700 text-white rounded-lg px-4 py-1 hover:bg-blue-500 transition-colors lg:hidden"
            >
                Pesquisar
            </button>
        </form>

        <div class="w-full h-full relative animate-fade-in-down">
            <table
                class="w-full border border-gray-200 rounded-md shadow-sm text-sm text-left rtl:text-right text-gray-500 dark:border-gray-500"
            >
                <thead class="text-xs border-b border-gray-300 text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:border-gray-500">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-gray-400">Tarefa</th>
                        <th v-if="isViewActive.title" scope="col" class="px-6 py-3 text-gray-400">Descrição</th>
                        <th v-if="isViewActive.status" scope="col" class="px-6 py-3 text-gray-400">Status</th>
                        <th v-if="isViewActive.priority" scope="col" class="px-6 py-3 text-gray-400">
                            Prioridade
                        </th>
                        <th scope="col" class="px-6 py-3 text-gray-400">Ações</th>
                    </tr>
                </thead>

                <tbody v-if="tasks.data.length == 0">
                    <h2 class="p-6 dark:text-white">Não possui tarefas</h2>
                </tbody>

                <tbody v-else-if="tasks.loading">
                    <div class="p-6">
                        <pacman-loader :loading="spinner.loading" size="20px" color="#FFFFFF" />
                    </div>
                </tbody>

                <tbody v-else>
                    <tr
                        v-for="(task, i) in tasks.data"
                        :key="i"
                        class="bg-white border-b border-gray-200 text-gray-900 hover:bg-gray-800 dark:bg-gray-900 dark:text-white"
                    >
                        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                            <div class="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    :id="task.title"
                                    :checked="task.status.type == 'Feito' ? true : false"
                                    @click="changeStatus(task, $event.target)"
                                    class="form-checkbox w-4 h-4 rounded-md text-indigo-600 checked:bg-gray-900:rounded-md"
                                />
                                {{ task.title }}
                            </div>
                        </th>
                        <td class="px-6 py-4" v-if="isViewActive.title">
                            <span class="border border-gray-200 px-2 py-1 rounded-md mr-2">{{
                                task.category.name
                            }}</span>
                            {{ task.description }}
                        </td>
                        <td class="px-6 py-4" v-if="isViewActive.status">
                            <v-icon :name="task.status.icon" />
                            {{ task.status.type }}
                        </td>
                        <td class="px-6 py-4" v-if="isViewActive.priority">
                            <v-icon :name="task.priority.icon" />
                            {{ task.priority.type }}
                        </td>
                        <td class="px-6 py-4">
                            <Dropdown
                                icon="bi-three-dots"
                                :items="[
                                    { title: 'Editar', task: task },
                                    { title: 'Deletar', task: task },
                                ]"
                                @action="deleteTask"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="!tasks.loading" class="w-full flex justify-between items-center mt-20 p-2">
            <div v-if="tasks.data.length" class="font-semibold">Mostando de {{ tasks.from }} a {{ tasks.to }}</div>
            <div class="flex items-center gap-8">
                <div class="flex gap-2 items-center">
                    <label class="font-semibold">Linhas por página</label>
                    <select @change="getTasks()" v-model="perPage" class="border border-gray-300 rounded-md px-2 py-2">
                        <option>10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                    </select>
                </div>

                <nav
                    v-if="tasks.total > tasks.limit"
                    class="relative z-1 inline-flex justify-center rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                >
                    <a
                        v-for="(link, i) of tasks.links"
                        :key="i"
                        :disabled="!link.url"
                        href="#"
                        @click.prevent="getForPage(link)"
                        aria-current="page"
                        class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
                        :class="[
                            link.active
                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                            i === 0 ? 'rounded-l-md' : '',
                            i === tasks.links.length - 1 ? 'rounded-r-md' : '',
                            !link.url ? ' bg-gray-100 text-gray-700' : '',
                        ]"
                        v-html="link.label"
                    >
                    </a>
                </nav>
            </div>
        </div>
    </div>
</template>
