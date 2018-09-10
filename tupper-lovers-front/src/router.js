import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import { isAuth } from '@/utils/authStatus'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        private: true
      }
    },
    {
      path: '/about',
      name: 'about',
      private: true,
      meta: {
        private: true
      },
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
});

router.beforeEach(async (to, from, next) => {
  const user = await isAuth();
  if (to.meta.private && !user){
    next('login');
  } else {
    next();
  }
});

export default router;
