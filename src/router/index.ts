import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Home from "@/views/landing/Home.vue";
import About from "@/views/landing/About.vue";
import Products from "@/views/landing/Products.vue";
import ProductDetail from "@/views/landing/ProductDetail.vue";
import Cart from "@/views/landing/Cart.vue";
import OrderSuccess from "@/views/landing/OrderSuccess.vue";
import Contact from "@/views/landing/Contact.vue";
import Dashboard from "@/views/dashboard/Dashboard.vue";
import UserList from "@/views/dashboard/users/List.vue";
import NotFound from "@/views/NotFound.vue";
import DetailUser from "@/views/dashboard/users/Detail.vue";
import AddUser from "@/views/dashboard/users/Add.vue";
import EditUser from "@/views/dashboard/users/Edit.vue";
import ProductList from "@/views/dashboard/products/List.vue";
import DetailProduct from "@/views/dashboard/products/Detail.vue";
import AddProduct from "@/views/dashboard/products/Add.vue";
import EditProduct from "@/views/dashboard/products/Edit.vue";

const landingRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/products/:id",
    name: "ProductDetail",
    component: ProductDetail,
    props: true,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/order-success",
    name: "OrderSuccess",
    component: OrderSuccess,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
];

// Define dashboard routes
const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  // User routes
  {
    path: "/dashboard/users",
    name: "UserList",
    component: UserList,
  },
  {
    path: "/dashboard/users/add",
    name: "AddUser",
    component: AddUser,
  },
  {
    path: "/dashboard/users/edit/:id",
    name: "EditUser",
    component: EditUser,
    props: true,
  },
  {
    path: "/dashboard/users/detail/:id",
    name: "DetailUser",
    component: DetailUser,
    props: true,
  },
  // Product routes
  {
    path: "/dashboard/products",
    name: "ProductList",
    component: ProductList,
  },
  {
    path: "/dashboard/products/add",
    name: "AddProduct",
    component: AddProduct,
  },
  {
    path: "/dashboard/products/edit/:id",
    name: "EditProduct",
    component: EditProduct,
    props: true,
  },
  {
    path: "/dashboard/products/detail/:id",
    name: "DetailProduct",
    component: DetailProduct,
    props: true,
  },
];

// Combine all routes
const routes: RouteRecordRaw[] = [
  ...landingRoutes,
  ...dashboardRoutes,
  // Global 404 route - must be last
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
