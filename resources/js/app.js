/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

window.Vue = require("vue");

// import my custom class "permission" and add a prototype to use it evry where
import Permission from "./permission";
Vue.prototype.$permission = new Permission(window.user);

// import momentjs to format date
import moment from "moment";
// add vform
import { Form, HasError, AlertError } from "vform";
window.Form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
// vue router
import VueRouter from "vue-router";
Vue.use(VueRouter);
let routes = [
    {
        path: "/dashboard",
        component: require("./components/dashboard.vue").default
    },
    {
        path: "/users",
        component: require("./components/users.vue").default
    },
    {
        path: "/profile",
        component: require("./components/profile.vue").default
    },
    {
        path: "*",
        component: require("./components/Not-Found.vue").default
    }
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    mode: "history",
    routes // short for `routes: routes`
});
// custom events global declaration
window.Fun = new Vue();
// sweet alert tools
import Swal from "sweetalert2";
window.Swal = Swal;

// --
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: toast => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
});
window.Toast = Toast;

// vue progressbar
import VueProgressBar from "vue-progressbar";

Vue.use(VueProgressBar, {
    color: "rgb(143, 255, 199)",
    failedColor: "red",
    height: "2px"
});

// global filters
Vue.filter("capitalize", function(value) {
    if (!value) return "";
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});
Vue.filter("format", function(value) {
    return moment(value).format("MMMM Do YYYY");
});

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component(
    "example-component",
    require("./components/ExampleComponent.vue").default
);
Vue.component("not-found", require("./components/Not-Found.vue").default);
// add pagination
Vue.component("pagination", require("laravel-vue-pagination"));

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: "#app",
    router,
    data: {
        search: ""
    },
    methods: {
        searchIt: _.debounce(() => {
            Fun.$emit("searching");
        }, 1000)
    }
});
