<script setup lang="ts"></script>

<template>
  <div class="sign-in">
    <h1>Sign In</h1>

    <section class="sign-in-buttons">
      <!-- 백엔드 서버에서 토큰 발급 -->
      <a href="https://dev-api.openmeta.city/oauth/google/swap">
        Sign In with Google (server)
      </a>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .sign-in {
    min-height: 100vh;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .sign-in-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  a,
  button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    border: none;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }
}
</style>
