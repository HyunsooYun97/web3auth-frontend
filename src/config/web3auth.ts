import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  IProvider,
  UX_MODE,
  WEB3AUTH_NETWORK,
} from '@web3auth/base';

export const TRON_SHASTA_TESTNET = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: '0x94a9059e', // Tron Shasta Testnet Chain ID
  rpcTarget: 'https://api.shasta.trongrid.io/jsonrpc',
  displayName: 'TRON Shasta Testnet',
  blockExplorerUrl: 'https://shasta.tronscan.org',
  ticker: 'TRX',
  tickerName: 'TRON',
  logo: 'https://cryptologos.cc/logos/tron-trx-logo.png',
};
