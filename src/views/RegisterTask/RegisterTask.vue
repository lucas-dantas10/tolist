<script setup>
import { computed, ref } from 'vue';
import store from '../../store';
import BaseInput from '../../components/BaseInput/BaseInput.vue';
import Spinner from '../../components/Spinner/Spinner.vue';

const form = ref({});
const categories = computed(() => store.state.category);
const spinner = computed(() => store.state.spinner);

function registerTask() {
    store.dispatch('storeTask', form.value);
}
</script>

<template>
    <section>
        <h1 class="text-4xl text-gray-900 font-bold dark:text-gray-50">Cadastro Tarefa</h1>

        <form class="mt-8" @submit.prevent="registerTask">
            <div class="flex flex-col gap-2">
                <BaseInput 
                    v-model="form.title"
                    label="Título"
                    :required="true"
                />

                <BaseInput 
                    v-model="form.description"
                    label="Descrição"
                    :required="true"
                />

                <div class="flex flex-col gap-2 justify-center">
                    <label class="text-xl font-semibold">Categoria</label>
                    <select requried v-model="form.category" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-dotted block w-3/6 py-2 px-2 dark:bg-gray-200">
                        <option selected>Escolha uma Categoria</option>
                        <option v-for="category in categories.data" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>
                <div class="flex flex-col gap-2 justify-center">
                    <label class="text-xl font-semibold">Status</label>
                    <select required v-model.number="form.status" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-dotted block w-3/6 py-2 px-2 dark:bg-gray-200">
                        <option selected>Escolha um Status</option>
                        <option value="1">Fazer</option>
                        <option value="3">Feito</option>
                        <option value="2">Em progresso</option>
                        <option value="4">Cancelado</option>
                    </select>
                </div>
                <div class="flex flex-col gap-2 justify-center">
                    <label class="text-xl font-semibold">Prioridade</label>
                    <select required v-model.number="form.priority" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-dotted block w-3/6 py-2 px-2 dark:bg-gray-200">
                        <option selected>Escolha uma Prioridade</option>
                        <option value="1">Alta</option>
                        <option value="3">Média</option>
                        <option value="2">Baixa</option>
                    </select>
                </div>
                <div class="flex flex-col gap-2 justify-center">
                    <label class="text-xl font-semibold">Esquema</label>
                    <select required v-model.number="form.schedule" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-dotted block w-3/6 py-2 px-2 dark:bg-gray-200">
                        <option selected>Escolha um Esquema</option>
                        <option value="1">Segunda a Sexta</option>
                        <option value="2">Todos os dias</option>
                    </select>
                </div>
            </div>

            <button type="submit" class="mt-6 flex items-center gap-2 border border-blue-600 bg-blue-600 text-white px-4 py-1 rounded-md">
                {{ spinner.loading ? "Cadastrando..." : "Cadastrar" }}
                <Spinner />
            </button>
        </form>
    </section>
</template>
