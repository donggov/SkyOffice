<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <div
    id="Backdrop"
    style="
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      gap: 60px;
      align-items: center;
    "
  >
    <div
      Wrapper
      style="
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
        justify-content: center;

        .tip {
          font-size: 18px;
        }
      "
    >
      <div style="font-size: 24px; color: #eee; text-align: center">Welcome to SkyOffice</div>
      <div
        style="
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin: 20px 0;
          align-items: center;
          justify-content: center;

          img {
            border-radius: 8px;
            /* height: 120px; */
          }
        "
      >
        <img src="../images/logo.png" alt="logo" />
        <button>Connect to public lobby</button>
        <button>Create/find custom rooms</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  color: rgba(255, 255, 255, 0.87);
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
</style>
