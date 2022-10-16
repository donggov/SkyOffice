import { defineStore } from 'pinia'
import { IChatMessage } from '../../../types/IOfficeState'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

export enum MessageType {
  PLAYER_JOINED,
  PLAYER_LEFT,
  REGULAR_MESSAGE,
}

export const useChatRoomStore = defineStore('chat', {
  state: () => ({
    chatMessages: new Array<{ messageType: MessageType; chatMessage: IChatMessage }>(),
    focused: false,
    showChat: true,
  }),
  actions: {
    pushChatMessage(chatMessage: IChatMessage) {
      this.chatMessages.push({
        messageType: MessageType.REGULAR_MESSAGE,
        chatMessage,
      })
    },
    pushPlayerJoinedMessage(author: string) {
      this.chatMessages.push({
        messageType: MessageType.PLAYER_JOINED,
        chatMessage: {
          createdAt: new Date().getTime(),
          author,
          content: 'joined the lobby',
        } as IChatMessage,
      })
    },
    pushPlayerLeftMessage(author: string) {
      this.chatMessages.push({
        messageType: MessageType.PLAYER_LEFT,
        chatMessage: {
          createdAt: new Date().getTime(),
          author,
          content: 'left the lobby',
        } as IChatMessage,
      })
    },
    setFocused(focused: boolean) {
      const game = phaserGame.scene.keys.game as Game
      focused ? game.disableKeys() : game.enableKeys()
      this.focused = focused
    },
    setShowChat(showChat: boolean) {
      this.showChat = showChat
    },
  },
})
