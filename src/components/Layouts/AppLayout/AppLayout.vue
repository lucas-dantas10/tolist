<script setup>
import { onMounted } from 'vue';
import Sidebar from '../../Sidebar/Sidebar.vue';
import store from '../../../store';

onMounted(() => {
    store.dispatch('getCurrentUser');
    store.dispatch('getCategories');
});
</script>

<template>
    <div>
        <Sidebar />
        <main class="p-4 sm:ml-64">
            <router-view></router-view>
        </main>
    </div>
</template>