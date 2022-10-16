<script setup lang="ts">
import { ref, reactive, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'

import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

import { getColorByString } from '../util'
import { useChatRoomStore, MessageType } from '../stores/ChatStorePinia'

const chatStore = useChatRoomStore()
const { focused, chatMessages, showChat } = storeToRefs(chatStore)

const inputValue = ref('')

const inputRef = ref<HTMLInputElement | null>(null)
const messagesEndRef = ref<HTMLInputElement | null>(null)

const game = phaserGame.scene.keys.game as Game

const handleKeyDown = (event: KeyboardEvent) => {
  console.log('handleKeyDown', event.key)
  if (event.key === 'Escape') {
    // move focus back to the game
    // inputRef.current?.blur()
    // dispatch(setShowChat(false))
    inputRef.value?.blur()
    chatStore.setShowChat(false)
  }
}

const handleSubmit = (event: KeyboardEvent) => {
  event.preventDefault()

  // this is added because without this, 2 things happen at the same
  // time when Enter is pressed, (1) the inputRef gets focus (from
  // useEffect) and (2) the form gets submitted (right after the input
  // gets focused)
  // if (!readyToSubmit) {
  //   setReadyToSubmit(true)
  //   return
  // }
  // move focus back to the game
  inputRef.value?.blur()

  const val = inputValue.value.trim()
  inputValue.value = ''
  if (val) {
    game.network.addChatMessage(val)
    game.myPlayer.updateDialogBubble(val)
  }
}

const focus = () => {
  console.log('>>> focus', chatStore.focused)
  if (!chatStore.focused) {
    chatStore.setFocused(true)
    // setReadyToSubmit(true)
  }
}

const blur = () => {
  chatStore.setFocused(false)
  // setReadyToSubmit(false)
}

const scrollToBottom = () => {
  nextTick(() => messagesEndRef.value?.scrollIntoView({ behavior: 'smooth' }))
}

// https://medium.com/@itsmnthn/watch-pinia-store-getters-or-state-in-nuxt3-vue3-inside-setup-method-576b57941210
watch(focused, (v) => {
  // console.log('watch v', v)
  if (v) {
    nextTick(() => inputRef.value?.focus())
  }
})
watch(chatMessages, () => scrollToBottom(), { deep: true })
watch(showChat, () => scrollToBottom())
</script>

<template>
  <div class="backdrop">
    <div class="wrapper">
      <div v-show="chatStore.showChat">
        <div class="chatHeader">
          <h3>Chat : {{ chatStore.focused }}</h3>
        </div>
        <div class="chatBox">
          <div v-for="(item, index) in chatStore.chatMessages" :key="index" class="messageWrapper">
            <p
              v-if="item.messageType === MessageType.REGULAR_MESSAGE"
              :style="{ color: getColorByString(item.chatMessage.author) }"
            >
              {{ item.chatMessage.author }}: <span>{{ item.chatMessage.content }}</span>
            </p>
            <p v-else class="notification">
              {{ item.chatMessage.author }} {{ item.chatMessage.content }}
            </p>
          </div>
          <div ref="messagesEndRef"></div>
        </div>
        <div class="inputWrapper">
          <div class="inputTextField">
            <input
              ref="inputRef"
              v-model="inputValue"
              placeholder="Press Enter to chat"
              @blur="blur"
              @keyup="handleKeyDown"
              @keyup.enter="handleSubmit"
              @focus="focus"
            />
          </div>
        </div>
      </div>
      <div v-show="!chatStore.showChat">
        <div class="fabWrapper">
          <div class="fab"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scss scoped>
.backdrop {
  position: fixed;
  bottom: 00;
  left: 0;
  height: 400px;
  width: 500px;
  max-height: 50%;
  max-width: 50%;
}

.wrapper {
  position: relative;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.fabWrapper {
  margin-top: auto;
}

.chatHeader {
  position: relative;
  height: 35px;
  background: #000000a7;
  border-radius: 10px 10px 0px 0px;

  /* h3 {
    color: #fff;
    margin: 7px;
    font-size: 17px;
    text-align: center;
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
  } */
}

.chatHeader h3 {
  color: #fff;
  margin: 7px;
  font-size: 17px;
  text-align: center;
}

.chatBox {
  /* height: 100%; */
  height: 300px;
  width: 100%;
  overflow: auto;
  background: #2c2c2c;
  border: 1px solid #00000029;
}

.messageWrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 0px 2px;
}

.messageWrapper p {
  margin: 3px;
  text-shadow: 0.3px 0.3px black;
  font-size: 15px;
  font-weight: bold;
  line-height: 1.4;
  overflow-wrap: anywhere;
}

.messageWrapper .notification {
  color: grey;
  font-weight: normal;
}

.inputWrapper {
  box-shadow: 10px 10px 10px #00000018;
  border: 1px solid #42eacb;
  border-radius: 0px 0px 10px 10px;
  display: flex;
  flex-direction: row;
  background: linear-gradient(180deg, #000000c1, #242424c0);
}

.inputTextField {
  border-radius: 0px 0px 10px 10px;
  /* input {
    padding: 5px;
  } */
}

.emojiPickerWrapper {
  position: absolute;
  bottom: 54px;
  right: 16px;
}
</style>
