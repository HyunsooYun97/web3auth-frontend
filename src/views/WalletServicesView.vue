<script setup lang="ts">
import { useWalletServiceStore } from '@/stores/useWalletServiceStore';

const walletServiceStore = useWalletServiceStore();
</script>

<template>
  <div class="wallet">
    <h1>Wallet Service</h1>

    <section class="contents">
      <button
        type="button"
        @click="() => walletServiceStore.handleFiatOnRamp()"
      >
        Fiat On Ramp
      </button>
      <button type="button" @click="() => walletServiceStore.handleSwap()">
        Swap
      </button>
      <button
        type="button"
        @click="() => walletServiceStore.handleWalletConnect()"
      >
        Wallet Connect
      </button>
      <button
        type="button"
        @click="() => walletServiceStore.handleWalletEmbeddedUI()"
      >
        Wallet Embedded UI
      </button>
    </section>
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
