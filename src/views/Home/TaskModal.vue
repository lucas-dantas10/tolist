<script setup>
import { computed, onUpdated, onMounted, ref } from "vue";
import store from "../../store";

const taskModel = ref({});

onMounted(() => {
    taskModel.id = props.task.id;
    taskModel.title = props.task.title;
    taskModel.description = props.task.description;
    taskModel.category = props.task.category;
    taskModel.priority = props.task.priority;
    taskModel.status = props.task.status;
});

const props = defineProps({
    modelValue: Boolean,
    task: {
        required: true,
        type: Object,
    },
});

const emit = defineEmits(["update:modelValue", "close"]);

const show = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});

const priorities = computed(() => store.state.priority);
const status = computed(() => store.state.status);
const categories = computed(() => store.state.category);

onUpdated(() => {
    taskModel.value = {
        id: props.task.id,
        title: props.task.title,
        description: props.task.description,
        category: props.task.category,
        priority: props.task.priority,
        status: props.task.status,
    };
});

function editTask() {
    store.dispatch('updateTask', taskModel.value)
        .then(res => {
            if (res.status == 200) {
                store.dispatch('getTasks');
                store.commit('showToast', {
                    message: res.data.message,
                    type: 'success'
                });
                closeModal();
            }
            
        })
}

function closeModal() {
    show.value = false;
    emit("close");
}
</script>

<template>
    <Transition name="slide-fade">
        <div
            v-show="show"
            class="bg-gray-100 fixed bg-opacity-50 z-[9998] top-0 left-0 w-full h-full table transition-opacity duration-300 ease dark:bg-gray-700 dark:bg-opacity-50"
            @close="show = false"
        >
            <div class="table-cell align-middle">
                <div
                    class="w-[500px] h-[550px] my-0 mx-auto py-[20px] px-[30px] shadow-md bg-gray-300 rounded-md transition-all duration-300 ease dark:bg-gray-900"
                >
                    <form @submit.prevent="editTask" class="flex flex-col justify-center gap-2">
                        <h1 class="text-2xl font-bold">Edição de Tarefa</h1>

                        <div class="flex flex-col gap-2 justify-center">
                            <label for="title" class="font-semibold">Título</label>
                            <input type="text" v-model="taskModel.title" id="title" class="py-1 px-2 rounded-md border-2 border-gray-300 text-gray-900 focus:ring-blue-900 focus:outline-blue-500 active:outline-blue-900 dark:bg-gray-300" />
                        </div>

                        <div class="flex flex-col gap-2 justify-center">
                            <label for="description" class="font-semibold">Descrição</label>
                            <input type="text" v-model="taskModel.description" id="description" class="py-1 px-2 rounded-md border-2 border-gray-300 text-gray-900 focus:ring-blue-900 focus:outline-blue-500 active:outline-blue-900 dark:bg-gray-300" />
                        </div>

                        <div class="flex flex-col gap-2 justify-center">
                            <label class="font-semibold">Categoria</label>
                            <select v-model="taskModel.category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-300">
                                <option disabled value="">Escolha uma categoria</option>
                                <option :value="category" v-for="category in categories.data" :key="category.id" :disabled="taskModel.category.name === category.name">
                                    {{category.name}}
                                </option>
                            </select>
                        </div>

                        <div class="flex flex-col gap-2 justify-center">
                            <label class="font-semibold">Prioridade</label>
                            <select v-model="taskModel.priority" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-300">
                                <option disabled value="">Escolha uma prioridade</option>
                                <option :value="priority" v-for="priority in priorities.data" :key="priority.id" :disabled="taskModel.priority.type === priority.type">
                                    {{ priority.type}}
                                </option>
                            </select>
                        </div>

                        <div class="flex flex-col gap-2 justify-center">
                            <label class="font-semibold">Status</label>
                            <select v-model="taskModel.status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-300">
                                <option disabled value="">Escolha um status</option>
                                <option :value="st" v-for="st in status.data" :key="st.id" :disabled="taskModel.status.type === st.type">
                                    {{ st.type }}
                                </option>
                            </select>
                        </div>

                        <div class="flex justify-between items-center mt-8">
                            <button
                                type="button"
                                class="border border-gray-800 py-2 px-4 rounded-md text-white bg-gray-800"
                                @click="closeModal"
                            >
                                Cancelar
                            </button>
                            <button type="submit" class="border border-blue-500 py-2 px-4 rounded-md text-white bg-blue-600">
                                Editar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
