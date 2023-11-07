import {
    createWebHistory,
    createRouter
} from "vue-router";

import Home from "@/views/client/Home.vue";

const routes = [
    {
        path: "/client",
        name: "home",
        component: Home,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    }, 
    {
        path: "/client/products",
        name: "product",
        component: () => import("@/views/client/Product.vue"),
    }, 
    {
        path: "/admin",
        name: "admin",
        component: () => import("@/views/admin/Admins.vue"),
    },
    {
        path: "/admin/create",
        name: "create",
        component: () => import("@/views/admin/AdminCreate.vue"),
    },
    {
        path: "/admin/category",
        name: "category",
        component: () => import("@/views/admin/Category.vue"),
    },
    {
        path: "/admin/edit/:id",
        name: "edit",
        component: () => import("@/views/admin/AdminEdit.vue"),
    },

];


const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes,
});
export default router;