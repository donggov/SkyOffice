import { defineStore } from 'pinia'
import { IRoomData } from '../../../types/Rooms'

interface State {
  // userList: UserInfo[]
  room: IRoomData | null
  lobbyJoined: boolean | false
  roomJoined: boolean | false
}

export const useRoomStore = defineStore('room', {
  state: (): State => {
    return {
      room: null,
      lobbyJoined: true,
      roomJoined: false,
    }
  },
  // state: () => ({
  //   // roomName: undefined as String | undefined,
  //   // previousPieceSelected: undefined as Room | undefined,
  //   lobbyJoined: false,
  //   roomJoined: false,
  //   // for data that is not yet loaded
  //   room: null as IRoomData | null,
  // }),
  actions: {
    setLobbyJoined(state: boolean) {
      this.lobbyJoined = state
    },
    setRoomJoined(state: boolean) {
      this.roomJoined = state
    },
  },
})
