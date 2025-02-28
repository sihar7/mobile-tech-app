import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

import Prism from "prismjs";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-dart.js";
import "prismjs/components/prism-diff.js";
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-jsx.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

const app = createApp(App);
app.use(router);
app.mount("#app");
