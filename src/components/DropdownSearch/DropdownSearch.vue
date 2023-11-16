<script setup>
import { onMounted, ref } from "vue";

const dropdown = ref(null);
const isOpen = ref(false);
const props = defineProps({
    title: String,
    items: Object,
    icon: String,
    marginInline: String,
});
const emit = defineEmits([
    'checked'
]);

onMounted(() => {
    dropdown.value.focus();
});

function openDropdown() {
    dropdown.value.classList.toggle("hidden");
    isOpen.value = true;
    activeEventOutsideClick();
}

function activeEventOutsideClick() {
    setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
    }, 0);
}

function handleOutsideClick(event) {
    if (isOpen.value && !dropdown.value.contains(event.target)) {
        isOpen.value = false;
        dropdown.value.classList.add('hidden');
        document.removeEventListener('click', handleOutsideClick);
    }
}
</script>

<template>
    <div class="flex flex-col justify-center gap-2">
        <button
            id="dropdownSearchButton"
            @click="openDropdown()"
            class="border border-dotted text-sm border-gray-400 rounded-lg px-4 py-1 hover:bg-gray-200 transition-colors"
            type="button"
        >
            <v-icon :name="props.icon" fill="black" />
            {{ props.title }}
        </button>

        <!-- Dropdown menu -->
        <div id="dropdownSearch" ref="dropdown" :class="`mx-[${props.marginInline}rem]`" class="z-10 mt-[20rem] hidden bg-white rounded-lg shadow w-60 fixed">
            <div class="p-3">
                <label for="input-group-search" class="sr-only">Search</label>
                <div class="relative">
                    <div
                        class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
                    >
                        <svg
                            class="w-4 h-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="input-group-search"
                        class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search..."
                    />
                </div>
            </div>
            <ul
                class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownSearchButton"
            >
                <li v-for="(item, i) in items" :key="i">
                    <div class="flex items-center ps-2 rounded hover:bg-gray-200">
                        <input
                            :id="item.type"
                            type="checkbox"
                            @click="emit('checked', item)"
                            v-model="item.isCheck"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                            :for="item.type"
                            class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded"
                            >{{ item.type }}</label
                        >
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
