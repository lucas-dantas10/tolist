<script setup>
import { ref } from 'vue';
import BaseInput from '../../components/BaseInput/BaseInput.vue';
import store from '../../store';

const form = ref({});

function registerCategory() {
    store.dispatch('storeCategory', form.value);
}
</script>

<template>
    <section>
        <h1 class="text-4xl text-gray-900 font-bold">Cadastro Categoria</h1>

        <form @submit.prevent="registerCategory" class="mt-8">
            <BaseInput 
                v-model="form.name"
                label="Nome da Categoria"
            />


            <div>
                <button type="submit" class="mt-6 border border-blue-600 bg-blue-600 text-white px-4 py-1 rounded-md">
                    Cadastrar
                </button>
            </div>
        </form>
    </section>
</template>