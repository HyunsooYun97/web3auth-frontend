<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useWeb3Auth } from '@/composables/useWeb3Auth';

const { isLoggedIn, init, login, getBalance } = useWeb3Auth();

const idToken = localStorage.getItem('idToken');

const balance = ref<string | undefined>(undefined);

onMounted(async () => {
  await init();
  if (idToken && !isLoggedIn.value) await login(idToken as string);
  balance.value = await getBalance();
});
</script>

<template>
  <div class="wallet">
    <h1>Wallet</h1>

    <section class="wallet-buttons">
      <button @click="getBalance">Get Balance</button>

      <p v-if="balance">Balance: {{ balance }}</p>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .wallet {
    min-height: 100vh;
  }

  .wallet-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
