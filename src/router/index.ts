import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';

import redirect from './redirect';

// route level code-splitting
// this generates a separate chunk (About.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const SignInView = () => import('../views/SignInView.vue');
const WalletView = () => import('../views/WalletView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignInView,
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: WalletView,
    },
    ...redirect,
  ],
});

export default router;
