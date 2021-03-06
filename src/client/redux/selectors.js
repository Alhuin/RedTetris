const selectUsername = (state) => state.username;
const selectRoomName = (state) => state.roomName;
const selectError = (state) => state.error;
const selectDarkmode = (state) => state.darkmode;
const selectGameStatus = (state) => state.gameStatus;
const selectReady = (state) => state.ready;
const selectUsers = (state) => state.users;
const selectSocket = (state) => state.socket;
const selectShadow = (state) => state.shadow;

export {
  selectUsername,
  selectRoomName,
  selectError,
  selectDarkmode,
  selectGameStatus,
  selectReady,
  selectSocket,
  selectUsers,
  selectShadow,
};
