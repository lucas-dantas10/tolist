import { createWebHistory, createRouter } from 'vue-router';
import AppLayout from '../components/Layouts/AppLayout/AppLayout.vue';
import Login from '../views/Login/Login.vue';
import Register from '../views/Register/Register.vue';

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/',
        component: AppLayout,
        // children: [
        //     {
        //         path: '/login',
        //         component: Login
        //     }
        // ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
