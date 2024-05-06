import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import axios from "axios";
// Components
import { HalfCircleSpinner } from "epic-spinners";
import PullRefresh from "pull-refresh-vue3";
import LogIn from "./views/Signup/LogIn.vue";
//Plugin
import VueDaumPostcode from "vue-daum-postcode";
import { Sheet } from "bottom-sheet-vue3";
import VueSignaturePad from "vue-signature-pad";
import StarRating from 'vue-star-rating';
import VueCookies from 'vue3-cookies';
import Vue3Toasity from 'vue3-toastify';
import VueAwesomePaginate from "vue-awesome-paginate";
import Vue3Lottie from 'vue3-lottie';
import 'vue3-lottie/dist/style.css';
import 'vue3-toastify/dist/index.css';
import "bottom-sheet-vue3/css/style.css";
import "vue-awesome-paginate/dist/style.css";
import "./config/axios-interceptor.js";
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
// Use plugin with optional defaults
const app = createApp(App);
app.use(router);
app.use(VueDaumPostcode);
app.use(VueSignaturePad);
app.use(VueAwesomePaginate);
app.use(StarRating);
app.use(VueCookies);
app.use(Vue3Toasity);
app.use(Vue3Lottie);
app.use(VCalendar, {});
app.component("HalfCircleSpinner", HalfCircleSpinner);
app.component("PullRefresh", PullRefresh);
app.component("Sheet", Sheet);
app.component("LogIn", LogIn);
app.component('QuillEditor', QuillEditor)
app.mount("#app");
