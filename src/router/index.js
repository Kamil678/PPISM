import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";
import AllComponents from "../pages/AllComponents.vue";
import LoginPage from "../pages/LoginPage.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import MainLayout from "../layouts/MainLayout.vue";
import ProjectsPage from "../pages/ProjectsPage.vue";
import AddProject from "../pages/AddProject.vue";
import User from "../pages/UserPage.vue";
import { useUserStore } from "../store/user";

const routes = [
  {
    path: "/",
    component: MainLayout,
    redirect: "/home",
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/home",
        name: "home",
        component: Home,
      },
      {
        path: "/all-components",
        name: "all-components",
        component: AllComponents,
      },
      {
        path: "/projects",
        name: "projects",
        component: ProjectsPage,
      },
      {
        path: "/add-project",
        name: "add-project",
        component: AddProject,
      },
      {
        path: "/user",
        name: "user",
        component: User,
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    meta: {
      requiresUnauth: true,
    },
    children: [
      {
        path: "",
        name: "auth",
        component: LoginPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(function (to, from, next) {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.isAuth) {
    next("/auth");
  } else if (to.meta.requiresUnauth && userStore.isAuth) {
    next("/home");
  } else {
    next();
  }
});

export default router;
