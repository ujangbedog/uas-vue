import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import "@/assets/main.css";
import { setupToast } from "@/lib/toast";

const app = createApp(App);

app.use(createPinia());
app.use(router);
setupToast(app);

app.mount("#app");
