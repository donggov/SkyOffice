<script setup lang="ts">
import { ref, reactive } from 'vue'

import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'
import { useUserStore } from '../stores/UserStorePinia'

const userStore = useUserStore()

// todo : to store
const name = ref('')
const avatarIndex = ref(0)
const roomJoined = ref(true)
const room = reactive({
  roomName: 'Public Lobby',
  roomDescription: 'For making friends and familiarizing yourself with the controls',
})

const avatars = [
  { name: 'adam', img: '../images/login/Adam_login.png' },
  { name: 'ash', img: '../images/login/Ash_login.png' },
  { name: 'lucy', img: '../images/login/Lucy_login.png' },
  { name: 'nancy', img: '../images/login/Nancy_login.png' },
]

const handleSubmit = () => {
  // todo
  // event.preventDefault()
  if (name.value === '') {
    // setNameFieldEmpty(true)
    alert('Name is required')
  } else if (roomJoined) {
    const game = phaserGame.scene.keys.game as Game

    game.registerKeys()
    game.myPlayer.setPlayerName(name.value)
    game.myPlayer.setPlayerTexture(avatars[avatarIndex.value].name)
    game.network.readyToConnect()
    userStore.setLoggedIn(true)
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="title">Joining</div>
    <div class="roomName">
      <!-- <div class="avatar">avatar</div> -->
      <h3 style="font-size: 24px; color: #eee">{{ room.roomName }}</h3>
    </div>
    <div class="roomDescription">{{ room.roomDescription }}</div>
    <div class="content">
      <div class="left">
        <div class="subTitle">Select an avatar</div>
        <div class="swiper">
          <div class="swiper-slide">
            <img src="../images/login/Adam_login.png" />
            <!--todo -->
            <!-- <img :src="avatars[avatarIndex].img" /> -->
          </div>
        </div>
      </div>
      <div class="right">
        <input v-model="name" placeholder="name" />
      </div>
    </div>
    <div class="bottom">
      <button class="button" @click="handleSubmit">Join</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #222639;
  border-radius: 16px;
  padding: 36px 60px;
  box-shadow: 0px 0px 5px #0000006f;
}

.title {
  margin: 5px;
  font-size: 20px;
  color: #c2c2c2;
  text-align: center;
}

.roomName {
  max-width: 500px;
  max-height: 120px;
  overflow-wrap: anywhere;
  overflow-y: auto;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.avatar {
}

.roomDescription {
  max-width: 500px;
  max-height: 150px;
  overflow-wrap: anywhere;
  overflow-y: auto;
  font-size: 16px;
  color: #c2c2c2;
  display: flex;
  justify-content: center;
}

.content {
  display: flex;
  margin: 36px 0;
}

.roomDescription {
  max-width: 500px;
  max-height: 150px;
  overflow-wrap: anywhere;
  overflow-y: auto;
  font-size: 16px;
  color: #c2c2c2;
  display: flex;
  justify-content: center;
}
.subTitle {
  width: 160px;
  font-size: 16px;
  color: #eee;
  text-align: center;
}

.left {
  margin-right: 48px;
}

.swiper {
  width: 160px;
  height: 220px;
  border-radius: 8px;
  overflow: hidden;
}

.swiper-slide {
  width: 160px;
  height: 220px;
  background: #dbdbe0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 95px;
  height: 136px;
  object-fit: contain;
}

.right {
  width: 300px;
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
