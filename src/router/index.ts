import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';

import redirect from './redirect';

import { useWeb3AuthStore } from '@/stores/useWeb3authStore';

// route level code-splitting
// this generates a separate chunk (About.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const SignInView = () => import('@/views/SignInView.vue');
const WalletView = () => import('@/views/WalletView.vue');
const WalletServicesView = () => import('@/views/WalletServicesView.vue');

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
    {
      path: '/wallet-services',
      name: 'wallet-services',
      component: WalletServicesView,
    },
    ...redirect,
  ],
});

router.beforeEach(async (to, from, next) => {
  const web3authStore = useWeb3AuthStore();

  const idToken = web3authStore.getIdToken();

  if (idToken !== null) await web3authStore.init();

  if (
    (to.name === 'sign-in' && idToken !== null) ||
    (to.name === 'wallet' && idToken === null)
  ) {
    next({ name: 'home' });
    return;
  }

  next();
});

export default router;
