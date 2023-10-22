import {
    createWebHistory,
    createRouter
} from "vue-router";
import Home from "../pages/Home.vue";
import AllComponents from "../pages/AllComponents.vue";
import LoginPage from '../pages/LoginPage.vue';
import AuthLayout from '../layouts/AuthLayout.vue'
import MainLayout from '../layouts/MainLayout.vue'

const routes = [{
        path: "/",
        component: MainLayout,
        children: [{
                path: '',
                name: 'home',
                component: Home,
            },
            {
                path: "/all-components",
                name: 'all-components',
                component: AllComponents,
            },
        ]

    },
    {
        path: "/auth",
        component: AuthLayout,
        children: [{
            path: '',
            name: 'auth',
            component: LoginPage
        }]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;