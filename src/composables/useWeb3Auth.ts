import { ref, type Ref } from 'vue';

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

const { VITE_AUTH_WEB3AUTH_CLIENT_ID } = import.meta.env;

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: TRON_SHASTA_TESTNET },
});
const web3auth = new Web3AuthNoModal({
  clientId: VITE_AUTH_WEB3AUTH_CLIENT_ID,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});
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
interface Web3Auth {
  web3auth: Web3AuthNoModal;
  provider: Ref<IProvider | null>;
  isSignedIn: Ref<boolean>;
  init: () => Promise<void>;
  login: (idToken: string) => Promise<void>;
  getBalance: () => Promise<string | undefined>;
}

export const useWeb3Auth = (): Web3Auth => {
  const isSignedIn = ref(false);
  const provider = ref<IProvider | null>(null);

  async function init() {
    web3auth.configureAdapter(authAdapter);
    await web3auth.init();
    provider.value = web3auth.provider;
    if (web3auth.connected) isSignedIn.value = true;
  }

  async function login(idToken: string) {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }

    const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.AUTH, {
      loginProvider: 'jwt',
      extraLoginOptions: {
        id_token: idToken,
        verifierIdField: 'email',
        domain: 'https://dev-portal.openmeta.city',
      },
    });
    console.log('web3authProvider:', web3authProvider);
    provider.value = web3authProvider;

    return;
  }

  async function getBalance() {
    if (!provider.value) {
      console.log('provider not initialized yet');
      return;
    }

    const rpc = new RPC(provider.value);
    const balance = await rpc.getBalance();
    console.log(balance);

    return balance;
  }

  return {
    web3auth,
    provider,
    isSignedIn,
    init,
    login,
    getBalance,
  };
};
