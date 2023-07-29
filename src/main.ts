import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import tmui from "./tmui";
import App from "./App.vue";

export function createApp() {
  const app = createSSRApp(App);
  const store = createPinia();
  app.use(tmui, { shareDisable: false } as Tmui.tmuiConfig);
  app.use(store);
  return {
    app,
  };
}
