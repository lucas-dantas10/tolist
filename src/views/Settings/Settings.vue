<script setup>
import BaseInput from "../../components/BaseInput/BaseInput.vue";
import { useDark, useToggle } from "@vueuse/core";
import { computed, ref } from "vue";
import store from '../../store';
import Spinner from "../../components/Spinner/Spinner.vue";

const form = ref({});
const isDark = useDark();
const toggleDark = useToggle(isDark);
const user = computed(() => store.state.user);
const spinner = computed(() => store.state.spinner);

function updateUser() {
    store.dispatch('updateUser', form.value)
}
</script>
<template>
    <section class="w-full h-full">
        <h1 class="text-4xl text-gray-900 font-bold dark:text-gray-50">Configurações</h1>

        <div class="mt-8 flex flex-col gap-2">
            <label for="">
                <span class="border border-emerald-500 text-white shadow-sm px-5 rounded-sm bg-emerald-500">Meu Nome</span> <span>{{user.data.name}}</span>
            </label>

            <label for="">
                <span class="border border-emerald-500 text-white shadow-sm px-6 rounded-sm bg-emerald-500">Meu Email</span> <span>{{user.data.email}}</span>
            </label>
            
        </div>

        <form @submit.prevent="updateUser" class="flex flex-col gap-4 w-full h-full mt-10">
            <BaseInput label="Mudar Nome" v-model="form.name" />
            <BaseInput label="Mudar Senha" type="password" v-model="form.password" />

            
            <label class="relative inline-flex items-center cursor-pointer">
                <input @click="toggleDark()" type="checkbox" value="" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span class="ms-3 text-sm font-medium text-gray-900">
                    <v-icon v-if="isDark" name="bi-sun-fill" class="w-6 h-6" fill="white" />
                    <v-icon v-else name="bi-moon-fill" class="w-6 h-6" />
                </span>
            </label>


            <button
                type="submit"
                class="w-full flex items-center justify-center gap-2 border border-blue-600 bg-blue-600 text-white rounded-md py-1 px-2 lg:w-[20%]"
            >
                {{ spinner.loading ? "Alterando..." : "Aplicar Mudaças"}}
                <Spinner />
            </button>
        </form>
    </section>
</template>
