import {
    createWebHistory,
    createRouter
} from "vue-router";
import Home from "../pages/Home.vue";
import AllComponents from "../pages/AllComponents.vue";

const routes = [{
        path: "/",
        name: 'home',
        component: Home,
    },
    {
        path: "/all-components",
        name: 'all-components',
        component: AllComponents,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;