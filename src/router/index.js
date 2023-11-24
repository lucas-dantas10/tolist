import { createWebHistory, createRouter } from 'vue-router';
import AppLayout from '../components/Layouts/AppLayout/AppLayout.vue';
import Login from '../views/Login/Login.vue';
import Register from '../views/Register/Register.vue';
import store from '../store';
import Home from '../views/Home/Home.vue';
import RegisterTask from '../views/RegisterTask/RegisterTask.vue';

const routes = [
    {
        path: '/',
        name: 'app',
        component: AppLayout,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '/home',
                name: 'app.home',
                component: Home
            },

            {
                path: '/cadastro-tarefa',
                name: 'app.cadastro.tarefa',
                component: RegisterTask
            }
        ]
    },

    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requiresGuest: true
        },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            requiresGuest: true
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// router.beforeEach((to, from, next) => {
//     if (to.meta.requiresAuth && !store.state.user.token) {
//         next({name: 'login'});
//     } else if (to.meta.requiresGuest && store.state.user.token) {
//         next({name: 'app.home'});
//     } else {
//         next();
//     }
// });

export default router;
