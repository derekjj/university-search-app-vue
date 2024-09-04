import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Import Bootstrap CSS and JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

createApp(App).use(store).use(router).mount("#app");
