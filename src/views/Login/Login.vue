<script setup>
import { computed, ref } from 'vue';
import store from '../../store';
import router from '../../router/index.js';
import Spinner from '../../components/Spinner/Spinner.vue';
import { useDark } from "@vueuse/core";

const isDark = useDark();

const forms = ref({
    email: '',
    password: '',
    remember: false,
});

const spinner = computed(() => store.state.spinner);

function submit() {
    store.dispatch('login', forms.value)
        .then(() => {
            router.push({name: 'app.home'});
        });
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
                        Entrar com a sua conta
                    </h1>

                    <div class="bg-gray-400 rounded-md p-6">
                        <span class="font-bold text-lg dark:text-gray-900">Demo User</span>
                        <div class="font-semibold dark:text-gray-900">
                            <p>email: user1@example.com</p>
                            <p>senha: user123</p>
                        </div>
                    </div>
                    <form @submit.prevent="submit" class="space-y-4 md:space-y-6">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
                                >Seu Email</label
                            >
                            <input
                                type="email"
                                name="email"
                                id="email"
                                v-model.trim="forms.email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                placeholder="name@company.com"
                                required=""
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
                                v-model.trim="forms.password"
                                placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required=""
                            />
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input
                                        id="remember"
                                        aria-describedby="remember"
                                        type="checkbox"
                                        v-model="forms.remember"
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-900"
                                    />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500 dark:text-gray-50"
                                        >Lembre de mim</label
                                    >
                                </div>
                            </div>
                            <!-- <a
                                href="#"
                                class="text-sm font-medium text-primary-600 hover:underline"
                                >Esqueceu a senha?</a
                            > -->
                        </div>
                        <button
                            type="submit"
                            class="w-full flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            {{ spinner.loading == false ? 'Entrar' : 'Verificando...' }}
                            <Spinner />
                        </button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-50">
                            Você não tem conta ainda?
                            <router-link to="register" class="font-medium text-primary-600 hover:underline dark:text-blue-400"
                                >Registrar</router-link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
