import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import Counter from "@/components/Counter.vue";
import FetchData from "@/components/FetchData.vue";
import ResultController from "@/components/ResultController.vue";
import Chart from "@/components/Chart.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/Counter",
        name: "Counter",
        component: Counter,
    },
    {
        path: "/FetchData",
        name: "FetchData",
        component: FetchData,
    },
    {
        path: "/ResultController",
        name: "ResultController",
        component: ResultController,
    },
    {
        path: "/Chart",
        name: "Chart",
        component: Chart,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;