<script setup>
import { computed, ref } from 'vue';
import BaseInput from '../../components/BaseInput/BaseInput.vue';
import store from '../../store';
import Spinner from '../../components/Spinner/Spinner.vue';

const form = ref({});
const spinner = computed(() => store.state.spinner);

function registerCategory() {
    store.dispatch('storeCategory', form.value);
}
</script>

<template>
    <section>
        <h1 class="text-4xl text-gray-900 font-bold dark:text-gray-50">Cadastro Categoria</h1>

        <form @submit.prevent="registerCategory" class="mt-8">
            <BaseInput 
                v-model="form.name"
                label="Nome da Categoria"
                :required="true"
            />


            <div>
                <button type="submit" class="mt-6 flex items-center gap-2 border border-blue-600 bg-blue-600 text-white px-4 py-1 rounded-md">
                    {{ spinner.loading ? "Cadastrando..." : "Cadastrar" }}
                    <Spinner />
                </button>
            </div>
        </form>
    </section>
</template>