<script setup lang="ts">
import phaserGame from '../PhaserGame'
import Bootstrap from '../scenes/Bootstrap'
import { useRoomStore } from '../stores/RoomStorePinia'

const roomStore = useRoomStore()

const handleConnect = () => {
  if (roomStore.lobbyJoined) {
    const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap
    bootstrap.network
      .joinOrCreatePublic()
      .then(() => bootstrap.launchGame())
      .catch((error) => console.error(error))
  } else {
    alert('Trying to connect to server, please try again!')
  }
}
</script>

<template>
  <div class="backdrop">
    <div class="wrapper">
      <h1 class="title">Welcome to SkyOffice-vue</h1>
      <div class="content">
        <img src="../images/logo.png" alt="logo" style="border-radius: 8px; height: 120px" />
        <button @click="handleConnect">Connect to public lobby</button>
        <button>Create/find custom rooms</button>
      </div>
    </div>
    <div v-show="!roomStore.lobbyJoined" class="progressBarWrapper">
      <h3 style="color: #33ac96">Connecting to server...</h3>
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

.backdrop {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 60px;
  align-items: center;
}

.wrapper {
  background: #222639;
  border-radius: 16px;
  padding: 36px 60px;
  box-shadow: 0px 0px 5px #0000006f;
}

.title {
  font-size: 24px;
  color: #eee;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
  align-items: center;
  justify-content: center;
}

.progressBarWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
