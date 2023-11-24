import {
    createWebHistory,
    createRouter
} from "vue-router";

import Home from "@/views/client/Home.vue";
import LayoutAdmin from "@/views/admin/Layout.vue";
import LayoutClient from "@/views/client/Layout.vue";

const ClientRoutes = [{
    path: "/",
    name: "layout-client",
    component: LayoutClient,
    children: [
        {
            path: '',
            name: "home",
            component: Home,
        },
        {
            path: "/:pathMatch(.*)*",
            name: "notfound",
            component: () => import("@/views/NotFound.vue"),
        },
        {
            path: "",
            name: "about-us",
            component: () => import("@/components/client/AboutUs.vue"),
        },
        {
            path: "/home/about-us",
            name: "about-us",
            component: () => import("@/components/client/AboutUs.vue"),
        },
        {
            path: "/home/product",
            name: "product-client",
            component: () => import("@/views/client/Product.vue"),
        },
        {
            path: "/register",
            name: "register-authen",
            component: () => import("@/views/client/Register.vue"),
        },

        {
            path: "/login",
            name: "login-authen",
            component: () => import("@/views/client/Login.vue"),
        },
        {
            path: "/logout",
            name: "logout-authen",
            component: () => import("@/views/client/Logout.vue"),
        },
        {
            path: "/home/cart",
            name: "cart",
            component: () => import("@/components/client/Cart.vue"),
        },
        {
            path: "/home/product/detail/:id",
            name: "detail-product",
            component: () => import("@/views/client/DetailProduct.vue"),
        },
        {
            path: "/home/cart/bill-detail",
            name: "bill-detail",
            component: () => import("@/components/client/BillDetail.vue"),
        },
        {
            path: "/detail-account",
            name: "detail-account",
            component: () => import("@/components/client/DetailAccount.vue"),
        },
        
    ]
}, ]

export {
    ClientRoutes
};

const AdminRoutes = [
    // admin
   
    {
        path: "/register-account",
        name: "register",
        component: () => import("@/views/admin/Register.vue"),
    },
    {
        path: "/login-account",
        name: "login-admin",
        component: () => import("@/views/admin/Login.vue"),
    },
    
    {  path: "/admin",
        name: "layout-admin",
        component: LayoutAdmin,
        children: [
            
            {
                path: "/:pathMatch(.*)*",
                name: "notfound",
                component: () => import("@/views/NotFound.vue"),
            },

            {
                path: "/admin/product",
                name: "product",
                component: () => import("@/views/admin/Admins.vue"),
            },
            {
                path: "/admin/create",
                name: "create",
                component: () => import("@/views/admin/AdminCreate.vue"),
            },
            {
                path: "/category",
                name: "category",
                component: () => import("@/views/admin/Category.vue"),
            },
            {
                path: "/admin/edit/:id",
                name: "edit",
                component: () => import("@/views/admin/AdminEdit.vue"),
            },
            {
                path: "/detail/:id",
                name: "detail",
                component: () => import("@/views/admin/DetailProduct.vue"),
            },
            
            {
                path: "/account-management",
                name: "management",
                component: () => import("@/views/admin/AccountManage.vue"),
            },
            
        ]
    },



];

export {
    AdminRoutes
};

const routes = [
    ...ClientRoutes,
    ...AdminRoutes
]

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes,
});
export default router;