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
  login: (idToken: string) => Promise<void>;
  getBalance: () => Promise<void>;
}

export const useWeb3Auth = (): Web3Auth => {
  const provider = ref<IProvider | null>(null);

  web3auth.configureAdapter(authAdapter);
  provider.value = web3auth.provider;

  async function login(idToken: string) {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }

    const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.AUTH, {
      loginProvider: 'jwt',
      extraLoginOptions: {
        id_token: idToken,
        verifierIdField: 'sub',
        domain: 'http://localhost:3000',
      },
    });
    provider.value = web3authProvider;
  }

  async function getBalance() {
    if (!provider.value) {
      console.log('provider not initialized yet');
      return;
    }

    const rpc = new RPC(provider.value);
    const balance = await rpc.getBalance();
    console.log(balance);
  }

  return {
    web3auth,
    provider,
    login,
    getBalance,
  };
};
