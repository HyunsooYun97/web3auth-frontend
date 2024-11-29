<script setup lang="ts">
import { useWeb3Auth } from '@/composables/useWeb3Auth';

const { signInWithGoogle } = useWeb3Auth();
</script>

<template>
  <div class="sign-in">
    <h1>Sign In</h1>

    <section>
      <button type="button" @click="signInWithGoogle('code')">
        Sign In with Google (code)
      </button>
      <button type="button" @click="signInWithGoogle('token')">
        Sign In with Google (token)
      </button>
    </section>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .sign-in {
    min-height: 100vh;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }
}
</style>
