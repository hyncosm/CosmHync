const initialState = {
  categories: [],
};
export default function toggleAuthReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "FETCH_CATEGORIES":
      //
      nextState = {
        ...state,
        categories: action.value.categories,
      };
      return nextState || state;

    default:
      return state;
  }
}
