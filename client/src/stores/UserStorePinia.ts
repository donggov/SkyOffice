import { defineStore } from 'pinia'
import { BackgroundMode } from '../../../types/BackgroundMode'

export const useUserStore = defineStore('user', {
  state: () => ({
    backgroundMode: BackgroundMode.DAY,
    sessionId: '' as string | '',
    videoConnected: false as boolean | false,
    loggedIn: false as boolean | false,
  }),
  actions: {
    setSessionId(state: string) {
      this.sessionId = state
    },
    setVideoConnected(state: boolean) {
      this.videoConnected = state
    },
    setLoggedIn(state: boolean) {
      this.loggedIn = state
    },
  },
})
