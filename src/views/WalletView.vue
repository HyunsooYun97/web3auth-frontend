<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useWeb3Auth } from '@/composables/useWeb3Auth';

const { init, login, getBalance } = useWeb3Auth();

const idToken = localStorage.getItem('idToken');

const balance = ref<string | undefined>(undefined);

onMounted(async () => {
  await init();
  await login(idToken as string);
  balance.value = await getBalance();
});
</script>

<template>
  <div class="wallet">
    <h1>Wallet</h1>

    <section class="wallet-buttons">
      <button>Get Balance</button>

      <p>{{ balance }}</p>
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
    gap: 1rem;
  }
}
</style>
