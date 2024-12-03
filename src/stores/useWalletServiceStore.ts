import { defineStore, storeToRefs } from 'pinia';
import { useWeb3AuthStore } from '@/stores/useWeb3authStore';

import { WalletServicesPlugin } from '@web3auth/wallet-services-plugin';

/** WalletServicesPlugin 인스턴스 */
const walletServicesPlugin = new WalletServicesPlugin();

export const useWalletServiceStore = defineStore('walletService', () => {
  /** Web3Auth 인스턴스 */
  const { web3auth } = storeToRefs(useWeb3AuthStore());
  /** WalletServicesPlugin 인스턴스 추가 */
  web3auth.value?.addPlugin(walletServicesPlugin);

  /**
   * @description @param {boolean} show - UI 표시 여부
   * show: false로 설정 후 사용하면, 자체적인 UI로 사용할 수 있습니다.
   */

  /**
   * @description Fiat on Ramp
   * 사용자가 자신의 현지 통화를 선택하고 지갑을 충전할 토큰을 지정할 수 있는 TopUp 모달을 표시합니다.
   * @param {string} receiveWalletAddress? - 수신자의 주소를 지정합니다. 기본값은 현재 연결된 주소입니다.
   * @param {string[]} tokenList? - 목록에 표시할 토큰을 지정합니다. 기본적으로 모든 토큰이 표시됩니다. [USDC, USDT, ETH]와 같이 티커 이름을 사용하여 표시할 토큰을 지정할 수 있습니다.
   * 지원되는 네트워크와 토큰의 전체 목록은 [coverage details](https://web3auth.io/docs/features/topup#network-coverage)를 확인해 주세요.
   * @param {string[]} fiatList? - 구매 가능한 법정화폐를 지정합니다. [USD, SGD, INR, JPY]와 같이 통화 약자를 사용하여 표시할 법정화폐를 정의할 수 있습니다.
   * 지원되는 통화의 전체 목록은 [coverage details](https://web3auth.io/docs/features/topup#country-and-payment-method-coverage)를 확인해 주세요.
   * @param {boolean} show - 체크아웃 UI의 표시 여부를 결정합니다.
   */
  async function handleFiatOnRamp(
    receiveWalletAddress?: string,
    tokenList?: string[],
    fiatList?: string[],
    show: boolean = true,
  ) {
    await walletServicesPlugin.showCheckout({
      receiveWalletAddress,
      tokenList,
      fiatList,
      show,
    });
  }

  /**
   * @description Swap
   * 사용자가 토큰 간 교환을 할 수 있는 스왑 모달을 표시합니다.
   * @param {string} fromToken? - 교환하고자 하는 토큰을 지정합니다.
   * @param {string} toToken? - 교환받을 토큰을 지정합니다.
   * @param {string} fromValue? - 교환하고자 하는 토큰의 수량을 지정합니다.
   * @param {string} toAddress? - toToken을 받을 수신자의 주소를 지정합니다.
   * @param {boolean} show - 스왑 UI의 표시 여부를 제어합니다.
   */
  async function handleSwap(
    fromToken?: string,
    toToken?: string,
    fromValue?: string,
    toAddress?: string,
    show: boolean = true,
  ) {
    await walletServicesPlugin.showSwap({
      fromToken,
      toToken,
      fromValue,
      toAddress,
      show,
    });
  }

  /**
   * @description Connect dApps with Wallet Connect
   * WalletConnect 로그인 옵션이 있는 dApps와 연결하기 위한 WalletConnect 스캐너를 표시합니다.
   * WalletConnect 로그인 옵션이 있는 dApps와의 상호 운용성을 위해 유용합니다.
   * @param {boolean} show - 월렛 커넥트 UI의 표시 여부를 제어합니다.
   */
  async function handleWalletConnect(show: boolean = true) {
    await walletServicesPlugin.showWalletConnectScanner({ show });
  }

  /**
   * @description Show Wallet Embedded UI
   * 모달을 표시하고 템플릿화된 월렛 UI 서비스를 사용할 수 있게 합니다.
   * @param {string} path? - 월렛 서비스의 경로를 지정합니다.
   * @param {boolean} show - 월렛 UI의 표시 여부를 제어합니다.
   */
  async function handleWalletEmbeddedUI(path?: string, show: boolean = true) {
    await walletServicesPlugin.showWalletUi({ path, show });
  }

  return {
    handleFiatOnRamp,
    handleSwap,
    handleWalletConnect,
    handleWalletEmbeddedUI,
  };
});
