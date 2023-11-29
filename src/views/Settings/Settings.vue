<script setup>
import BaseInput from "../../components/BaseInput/BaseInput.vue";
</script>

<template>
    <section class="w-full h-full">
        <h1 class="text-4xl text-gray-900 font-bold">Configurações</h1>

        <form class="flex flex-col gap-4 w-full h-full mt-10">
            <BaseInput label="Mudar Nome" />
            <BaseInput label="Mudar Senha" />

            
            <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span class="ms-3 text-sm font-medium text-gray-900">
                    <v-icon name="bi-sun-fill" class="w-6 h-6" />
                    <v-icon name="bi-moon-fill" class="w-6 h-6" />
                </span>
            </label>


            <button
                type="submit"
                class="w-[20%] border border-blue-600 bg-blue-600 text-white rounded-md py-1 px-2"
            >
                Aplicar Mudaças
            </button>
        </form>
    </section>
</template>
