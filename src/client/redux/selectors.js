const selectSocket = (state) => state.socket;
const selectUsername = (state) => state.username;
const selectRoomName = (state) => state.roomName;
const selectPlayer = (state) => state.me;
const selectDropTime = (state) => state.dropTime;
const selectGrid = (state) => state.grid;
const selectLinesCleared = (state) => state.linesCleared;
const selectLines = (state) => state.lines;
const selectScore = (state) => state.score;
const selectLevel = (state) => state.level;
const selectError = (state) => state.error;
const selectGameStatus = (state) => state.gameStatus;
const selectReady = (state) => state.ready;
const selectUsers = (state) => state.users;
const selectChecked = (state) => state.checked;

export {
  selectSocket,
  selectUsername,
  selectRoomName,
  selectPlayer,
  selectDropTime,
  selectGrid,
  selectLinesCleared,
  selectLines,
  selectScore,
  selectLevel,
  selectError,
  selectGameStatus,
  selectReady,
  selectChecked,
  selectUsers,
};
