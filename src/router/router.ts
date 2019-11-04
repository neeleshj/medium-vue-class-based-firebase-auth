import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import * as firebase from 'firebase';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      meta: {
        requiresLogout: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/Register.vue')
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        requiresLogout: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/Login.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  let requiresLogout = to.matched.some(record => record.meta.requiresLogout);
  if (requiresAuth && !currentUser) {
    next('login');
  } else if (requiresLogout && currentUser) {
    next('/');
  } else next();
});

export default router;
