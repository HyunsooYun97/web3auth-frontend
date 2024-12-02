<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { AuthUserInfo } from '@web3auth/auth-adapter';

import { useWeb3AuthStore } from '@/stores/web3auth';

const web3authStore = useWeb3AuthStore();

const userInfo = ref<AuthUserInfo | undefined>(undefined);
const walletInfo = ref<string | undefined>(undefined);
const balance = ref<string | undefined>(undefined);
const address = ref<string | undefined>(undefined);
const chainInfo = ref<string | undefined>(undefined);

onMounted(async () => {
  userInfo.value = (await web3authStore.getUserInfo()) as AuthUserInfo;
  walletInfo.value = await web3authStore.getWalletInfo();
  balance.value = await web3authStore.getBalance();
  address.value = await web3authStore.getAddress();
  chainInfo.value = await web3authStore.getChainInfo();
});
</script>

<template>
  <div class="wallet">
    <h1>Wallet</h1>

    <section class="contents">
      <pre>User Info: {{ userInfo }}</pre>
    </section>

    <section class="contents">
      <p>Wallet Info: {{ walletInfo }}</p>
      <p>Balance: {{ balance }}</p>
      <p>Address: {{ address }}</p>
      <p>Chain Info: {{ chainInfo }}</p>
    </section>

    <button type="button" @click="web3authStore.logout">Logout</button>
  </div>
</template>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .wallet {
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    gap: 2rem;
  }

  .contents {
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    pre {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    button {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      line-height: 1.5;
      border: none;
      background-color: #ffffff;
      color: #000000;
      cursor: pointer;
    }
  }
}
</style>
