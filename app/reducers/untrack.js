// @flow

const initialState = {
  progress: null,
  updateTime: null,
  isRunning: false
};

export default function untrack(state = initialState, action) {
  switch (action.type) {
    case 'DOWNLOAD_PROGRESS':
      return { ...state, progress: action.progress };
    case 'DOWNLOAD_COMPLETE':
      return { ...state, updateTime: action.updateTime };
    case 'TOGGLE_UNTRACK':
      return { ...state, isRunning: action.isRunning };
    default:
      return state;
  }
}
