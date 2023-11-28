import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";
import AllComponents from "../pages/AllComponents.vue";
import LoginPage from "../pages/LoginPage.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import MainLayout from "../layouts/MainLayout.vue";
import ProjectsPage from "../pages/ProjectsPage.vue";
import AddProject from "../pages/AddProject.vue";
import AddProduct from "../pages/AddProduct.vue";
import User from "../pages/UserPage.vue";
import AddAssemblyStructure from "../pages/AddAssemblyStructure.vue";
import PriviewAssemblyStructure from "../pages/PreviewAssemblyStructure.vue";
import AddGraphicAssemblyPlan from "../pages/AddGraphicAssemblyPlan.vue";
import AddTechnologicalDocumentations from "../pages/AddTechnologicalDocumentations.vue";
import AddInstructionCards from "../pages/AddInstructionCards.vue";
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
        path: "/:projectId/add-product",
        name: "add-product",
        component: AddProduct,
      },
      {
        path: "/:projectId/add-assembly-structure",
        name: "add-assembly-structure",
        component: AddAssemblyStructure,
      },
      {
        path: "/:projectId/add-graphic-assembly-plan",
        name: "add-graphic-assembly-plan",
        component: AddGraphicAssemblyPlan,
      },
      {
        path: "/:projectId/add-technological-documentations",
        name: "add-technological-documentations",
        component: AddTechnologicalDocumentations,
      },
      {
        path: "/:projectId/add-instruction-cards",
        name: "add-instruction-cards",
        component: AddInstructionCards,
      },
      {
        path: "/preview-assembly-structure",
        name: "preview-assembly-structure",
        component: PriviewAssemblyStructure,
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
