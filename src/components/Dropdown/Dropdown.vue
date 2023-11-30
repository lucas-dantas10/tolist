<script setup>
import { onMounted, ref } from 'vue';

const dropdown = ref(null);
const props = defineProps({
    icon: String,
    items: Array,
});
const emit = defineEmits(['action']);

onMounted(() => {
    dropdown.value.focus();
});

function openDropdown() {
    dropdown.value.classList.toggle("hidden");
}

function actionTask(item) {
    if (item.title == 'Deletar') {
        if (!confirm('Você deseja deletar esta tarefa?')) {
            return;
        }

        console.log('deletado')
        return;
    }
}
</script>

<template>
    <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        @click="openDropdown()"
        class="border border-gray-200 rounded-lg px-2 py-1 hover:bg-gray-300 hover:cursor-pointer"
        type="button"
    >
        <v-icon :name="props.icon" />
    </button>

    <!-- Dropdown menu -->
    <div
        id="dropdown"
        ref="dropdown"
        class="z-[9998] hidden mt-2 mr-8 fixed bg-white divide-y divide-gray-100 rounded-lg shadow w-20 animate-fade-in-downd dark:bg-gray-800"
    >
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li v-for="(item, i) in props.items" :key="i">
                <a href="#" @click="emit('action', {type: item.title, task: item.task})" class="block px-4 py-2 hover:bg-gray-100 text-black dark:text-white dark:hover:bg-gray-600"
                    >{{item.title}}</a
                >
            </li>
        </ul>
    </div>
</template>
