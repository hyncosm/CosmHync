const initialState = {
  user: null,
};
export default function toggleAuthReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'SIGN_IN':
      //
      nextState = {
        ...state,
        user: action.value.user,
      };
      return nextState || state;

    case 'SIGN_OUT':
      //
      nextState = {
        ...state,
        user: null,
      };
      return nextState || state;
    default:
      return state;
  }
}
