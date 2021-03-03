import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS } from "./user.constants";

const initialState = {
    users: []
}

const UserReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case GET_USER_REQUEST:
            return state;
        case GET_USER_SUCCESS:
            return {
                ...state,
                users: action.payload.users
            }
        case GET_USER_FAILURE:
            return state;
        default:
            return state;
    }
}

export default UserReducer;