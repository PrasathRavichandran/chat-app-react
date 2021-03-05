import {
  GET_REAL_TIME_CONVERSATION_FAILURE,
  GET_REAL_TIME_CONVERSATION_REQUEST,
  GET_REAL_TIME_CONVERSATION_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
} from "./user.constants";

const initialState = {
  users: [],
  conversations: [],
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return state;
    case GET_USER_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
      };
    case GET_USER_FAILURE:
      return state;
    case GET_REAL_TIME_CONVERSATION_REQUEST:
      return state;
    case GET_REAL_TIME_CONVERSATION_SUCCESS:
      return {
        ...state,
        conversations: action.payload.conversations,
      };
    case GET_REAL_TIME_CONVERSATION_FAILURE:
      return { ...state, conversations: [] };
    default:
      return state;
  }
};

export default UserReducer;
