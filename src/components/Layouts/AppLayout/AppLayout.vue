<script setup>
import { onMounted } from 'vue';
import Sidebar from '../../Sidebar/Sidebar.vue';
import store from '../../../store';
import { useDark } from "@vueuse/core";

const isDark = useDark();

onMounted(() => {
    store.dispatch('getCurrentUser');
    store.dispatch('getCategories');
});
</script>

<template>
    <div>
        <Sidebar />
        <main class="p-4 sm:ml-64 bg-white dark:bg-gray-900">
            <router-view></router-view>
        </main>
    </div>
</template>