<script setup>
import Toast from './components/Toast/Toast.vue';

</script>

<template>
    <Toast />
    <div>
        <router-view></router-view>
    </div>
</template>

<style>
html.dark {
    color-scheme: dark;
}

body {
    @apply bg-white transition-colors delay-300 dark:bg-gray-900
}
</style>
