import type { RouteRecordRaw } from 'vue-router';

import { useWeb3AuthStore } from '@/stores/web3auth';

/**
 * @description Handle Google OAuth redirect.
 * @param authCode
 */
function handleGoogleRedirect(authCode: string) {
  console.log('authCode:', authCode);
}

/**
 * @description Handle Google OAuth id token.
 * @param idToken
 */
async function handleGoogleIdToken(idToken: string) {
  const web3authStore = useWeb3AuthStore();
  console.log('idToken:', idToken);

  web3authStore.setIdToken(idToken);

  await web3authStore.init();
  await web3authStore.login();

  return;
}

const redirect: RouteRecordRaw[] = [
  {
    path: '/redirect/google',
    component: () => null,
    beforeEnter: async (to, from, next) => {
      console.log('redirect-google params:', to.query);

      // url 파라미터에서 auth_code 추출
      const { code: authCode, id_token: idToken } = to.query;
      if (authCode !== undefined) handleGoogleRedirect(authCode as string);
      if (idToken !== undefined) await handleGoogleIdToken(idToken as string);

      next({ name: 'home' });
    },
  },
];

export default redirect;
