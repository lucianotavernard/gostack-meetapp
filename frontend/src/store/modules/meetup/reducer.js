const initialState = {
  selected: null,
};

export default function meetup(state = initialState, action) {
  switch (action.type) {
    case '@meetup/SELECT':
      return { ...state, selected: action.payload.meetup };

    case '@meetup/UPDATE_SUCCESS':
      return {
        ...state,
        selected: {
          ...state.selected,
          ...action.payload.meetup,
        },
      };

    default:
      return state;
  }
}
