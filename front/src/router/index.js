import {
    createWebHistory,
    createRouter
} from "vue-router";
import Home from "../pages/Home.vue";
import AllComponents from "../pages/AllComponents.vue";
import LoginPage from '../pages/LoginPage.vue';
import AuthLayout from '../layouts/AuthLayout.vue'
import MainLayout from '../layouts/MainLayout.vue'
import { useUserStore } from '../store/user'

const routes = [{
        path: "/",
        component: MainLayout,
        meta:{
            requiresAuth:true
        },
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
        meta:{
            requiresUnauth:true
        },
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

router.beforeEach(function(to, from, next){
    const userStore = useUserStore()
    console.log(userStore.token)
    if(to.meta.requiresAuth && !userStore.isAuth){
        next('/auth');
    } else if(to.meta.requiresUnauth && userStore.isAuth){
        next('/')
    } else{
        next()
    }
})

export default router;