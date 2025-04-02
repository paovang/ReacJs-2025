import {
  INCREMENT,
  DECREMENT,
  SET_COUNT,
  Action,
} from "../actions/countAction";
const initialState = {
  count: 0,
};

const counterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case SET_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};

export default counterReducer;
