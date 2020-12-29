import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
    routes: [{
            path: "/",
            redirect: "/login",
        },
        {
            path: "/login",
            component: () => import("../views/login"),
        },
        {
            path: "/userinfo",
            component: () => import("../views/userinfo"),
        },
        {
            path: "/userlist",
            component: () => import("../views/userlist"),
        },
        {
            path: "/change/:id",
            component: () => import("../views/change"),
        },
    ],
    // linkActiveClass: "active",
});

export default router;