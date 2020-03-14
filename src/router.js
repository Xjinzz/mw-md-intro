import Vue from 'vue';
import Router from 'vue-router';
import menus from "./pages/data.js";

const Layout = r=>require.ensure([],()=>r(require("./pages/layout/layout.vue")),"Layout");
const Base = r=>require.ensure([],()=>r(require("./pages/comps/base.vue")),"Base");

Vue.use(Router);

const _router = new Router({
    routes: [
        {
            path:'/',
            component:Layout,
            children:[
                {path:':group/:item',component:Base}
            ]
        }
    ]
});

export default _router;
