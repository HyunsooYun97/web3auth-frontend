import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

import { Web3AuthNoModal } from '@web3auth/no-modal';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import {
  UX_MODE,
  WALLET_ADAPTERS,
  WEB3AUTH_NETWORK,
  type IProvider,
} from '@web3auth/base';
import { AuthAdapter } from '@web3auth/auth-adapter';

import { TRON_SHASTA_TESTNET } from '@/config';
import RPC from '@/utils/evm.ethers';

import { useState } from '@/composables';

const { VITE_AUTH_WEB3AUTH_CLIENT_ID } = import.meta.env;

/**
 * @description Web3Auth 초기화
 */
const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: TRON_SHASTA_TESTNET },
});
/**
 * @description Web3Auth 인스턴스
 */
const web3authInstance = new Web3AuthNoModal({
  clientId: VITE_AUTH_WEB3AUTH_CLIENT_ID,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});
/**
 * @description Web3Auth AuthAdapter
 */
const authAdapter = new AuthAdapter({
  adapterSettings: {
    // POPUP은 버튼 클릭으로만 동작함.
    // REDIRECT는 페이지 리다이렉션 후 동작함.
    uxMode: UX_MODE.REDIRECT,
    loginConfig: {
      jwt: {
        verifier: 'omc-google-custom-test',
        typeOfLogin: 'jwt',
        clientId: VITE_AUTH_WEB3AUTH_CLIENT_ID,
      },
    },
  },
});

export const useWeb3AuthStore = defineStore('web3auth', () => {
  const router = useRouter();

  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  /**
   * @description idToken 가져오기
   */
  const getIdToken = () => localStorage.getItem('idToken');
  /**
   * @description idToken 설정하기
   */
  function setIdToken(idToken: string) {
    localStorage.setItem('idToken', idToken);
  }

  /**
   * @description Web3Auth 초기화
   */
  async function init() {
    console.log('web3auth init');
    if (web3auth.value?.connected && provider.value !== null) {
      console.log('web3auth already initialized');
      return;
    }

    web3authInstance.configureAdapter(authAdapter);
    await web3authInstance.init();

    setWeb3auth(web3authInstance);

    if (web3authInstance.connected) {
      setLoggedIn(true);
      setProvider(web3authInstance.provider);
    }
  }

  /**
   * @description Web3Auth 로그인
   */
  async function login() {
    console.log('web3auth login');
    if (web3auth.value === null) {
      console.log('web3auth not initialized yet');
      return;
    }

    const idToken = getIdToken();

    const web3authProvider = await web3auth.value.connectTo(
      WALLET_ADAPTERS.AUTH,
      {
        loginProvider: 'jwt',
        extraLoginOptions: {
          id_token: idToken,
          verifierIdField: 'email',
          domain: 'https://dev-portal.openmeta.city',
        },
      },
    );

    setProvider(web3authProvider);
  }

  /**
   * @description Web3Auth 로그아웃
   */
  async function logout() {
    if (web3auth.value === null) {
      console.log('web3auth not initialized yet');
      return;
    }

    await web3auth.value.logout();
    localStorage.removeItem('idToken');
    setLoggedIn(false);
    setProvider(null);

    router.push({ name: 'home' });
  }

  /**
   * @description 유저 정보 가져오기
   */
  async function getUserInfo() {
    if (web3auth.value === null) {
      console.log('web3auth not initialized yet');
      return;
    }
    const user = await web3auth.value.getUserInfo();
    return user;
  }

  /**
   * @description 지갑 정보 가져오기
   */
  async function getWalletInfo() {
    if (provider.value === null) {
      console.log('provider not initialized yet');
      return;
    }

    const rpc = new RPC(provider.value);
    const wallet = await rpc.getAccounts();
    return wallet;
  }

  /**
   * @description 잔액 가져오기
   */
  async function getBalance() {
    console.log('web3auth getBalance');
    if (provider.value === null) {
      console.log('provider not initialized yet');
      return;
    }

    const rpc = new RPC(provider.value);
    const balance = await rpc.getBalance();
    return balance;
  }

  /**
   * @description 주소 가져오기
   */
  async function getAddress() {
    console.log('web3auth getAddress');
    if (provider.value === null) {
      console.log('provider not initialized yet');
      return;
    }

    const rpc = new RPC(provider.value);
    const address = await rpc.getAccounts();
    return address;
  }

  /**
   * @description 체인 정보 가져오기
   */
  async function getChainInfo() {
    if (provider.value === null) {
      console.log('provider not initialized yet');
      return;
    }

    const rpc = new RPC(provider.value);
    const chain = await rpc.getChainId();
    return chain;
  }

  return {
    web3auth,
    provider,
    isLoggedIn,
    getIdToken,
    setIdToken,
    init,
    login,
    logout,
    getUserInfo,
    getWalletInfo,
    getBalance,
    getAddress,
    getChainInfo,
  };
});
