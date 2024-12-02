<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { storeToRefs } from 'pinia';
import { useWeb3AuthStore } from '@/stores/web3auth';

const web3authStore = useWeb3AuthStore();
const { provider, isLoggedIn } = storeToRefs(web3authStore);

const balance = ref<string | undefined>(undefined);

onMounted(async () => {
  console.log('WalletView isLoggedIn:', isLoggedIn.value);
  const idToken = localStorage.getItem('idToken');

  if (idToken && !isLoggedIn.value && provider.value === null) {
    await web3authStore.init();
    await web3authStore.login();
  }
  balance.value = await web3authStore.getBalance();
  console.log('WalletView balance:', balance.value);
});
</script>

<template>
  <div class="wallet">
    <h1>Wallet</h1>

    <section class="wallet-buttons">
      <button @click="web3authStore.getBalance">Get Balance</button>

      <p v-if="balance">Balance: {{ balance }}</p>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .wallet {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  .wallet-buttons {
    gap: 1rem;

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
