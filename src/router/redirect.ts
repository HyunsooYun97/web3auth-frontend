import type { RouteRecordRaw } from 'vue-router';

import { useWeb3Auth } from '@/composables/useWeb3Auth';

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
function handleGoogleIdToken(idToken: string) {
  const { login, getBalance } = useWeb3Auth();
  console.log('idToken:', idToken);
  login(idToken);
  getBalance();
}

const redirect: RouteRecordRaw[] = [
  {
    path: '/redirect/google',
    component: () => null,
    beforeEnter: (to, from, next) => {
      console.log('redirect-google params:', to.query);

      // url 파라미터에서 auth_code 추출
      const { code: authCode, id_token: idToken } = to.query;
      if (authCode !== undefined) handleGoogleRedirect(authCode as string);
      if (idToken !== undefined) handleGoogleIdToken(idToken as string);

      next({ name: 'home' });
    },
  },
];

export default redirect;
