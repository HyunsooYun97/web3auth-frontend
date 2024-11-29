import type { RouteRecordRaw } from 'vue-router';

const redirect: RouteRecordRaw[] = [
  {
    path: '/redirect/google',
    name: 'redirect-google',
    component: () => null,
    beforeEnter: (to, from, next) => {
      console.log('redirect-google params:', to.query);
      // url 파라미터에서 auth_code 추출
      const authCode = to.query.code;
      console.log('authCode:', authCode);

      next({ name: 'home' });
    },
  },
];

export default redirect;
