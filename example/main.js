import Vue from "vue";
import App from "./App.vue";
import VueRws from "../src";
Vue.use(
  new VueRws({
    debug: process.env.NODE_ENV == "development",
    connection: "ws://socket link",
  })
);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
