<script setup lang="ts">
import RoomSelectionDialog from './components/RoomSelectionDialog.vue'
import LoginDialog from './components/LoginDialog.vue'
import Chat from './components/Chat.vue'

import { useRoomStore } from './stores/RoomStorePinia'
import { useUserStore } from './stores/UserStorePinia'

const roomStore = useRoomStore()
const userStore = useUserStore()
</script>

<template>
  <div>
    <div v-if="userStore.loggedIn">
      <chat />
    </div>
    <login-dialog v-else-if="roomStore.roomJoined" />
    <room-selection-dialog v-else />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
