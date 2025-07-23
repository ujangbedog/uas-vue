import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import UserList from "@/views/users/List.vue";
import NotFound from "@/views/404.vue";
import DetailUser from "@/views/users/Detail.vue";
import AddUser from "@/views/users/Add.vue";
import EditUser from "@/views/users/Edit.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/users",
    name: "UserList",
    component: UserList,
  },
  {
    path: "/users/add",
    name: "AddUser",
    component: AddUser,
  },
  {
    path: "/users/edit/:id",
    name: "EditUser",
    component: EditUser,
    props: true,
  },
  {
    path: "/users/detail/:id",
    name: "DetailUser",
    component: DetailUser,
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
