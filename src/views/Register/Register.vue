<script setup>
import { ref } from 'vue';
import store from '../../store';
import Spinner from '../../components/Spinner/Spinner.vue';
import router from '../../router';

const form = ref({});

function registerUser() {
    store.dispatch('storeUser', form.value)
        .then((data) => {
            if (data.status == 200) {
                form.value = {};
                router.push({ name: login });
            }             
        })
        .catch(() => console.log('erro'));
}
</script>

<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
                class="w-full bg-gray-300 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-700"
            >
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-50"
                    >
                        Criar uma Conta
                    </h1>
                    <form @submit.prevent="registerUser" class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
                                >Seu Nome</label
                            >
                            <input
                                type="text"
                                name="name"
                                id="name"
                                v-model.trim="form.name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="name"
                            />
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
                                >Seu Email</label
                            >
                            <input
                                type="email"
                                name="email"
                                id="email"
                                v-model.trim="form.email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="name@company.com"
                            />
                        </div>
                        <div>
                            <label
                                for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
                                >Senha</label
                            >
                            <input
                                type="password"
                                name="password"
                                id="password"
                                v-model.trim="form.password"
                                placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            />
                        </div>
                        <div>
                            <label
                                for="confirm-password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
                                >Confirmar Senha</label
                            >
                            <input
                                type="password"
                                name="confirm-password"
                                id="confirm-password"
                                v-model.trim="form.confirmPassword"
                                placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            />
                        </div>
                        <!-- <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input
                                    id="terms"
                                    aria-describedby="terms"
                                    type="checkbox"
                                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                />
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="terms" class="font-light text-gray-500"
                                    >Eu aceito os
                                    <a
                                        class="font-medium text-primary-600 hover:underline"
                                        href="#"
                                        >Termos e Condições</a
                                    ></label
                                >
                            </div>
                        </div> -->
                        <button
                            type="submit"
                            class="w-full flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600"
                        >
                            Criar uma conta
                            <Spinner />
                        </button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-50">
                            Já possui uma conta?
                            <router-link to="/login" class="font-medium text-primary-600 hover:underline dark:text-blue-400"
                                >Entrar aqui</router-link
                            >
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
