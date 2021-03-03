import { db } from "../../service/firebase";
import { GET_USER_REQUEST, GET_USER_SUCCESS } from "../reducers/user.constants";

export const getRealTimeUsers = (uid) => {
    return async dispatch => {
        dispatch({ type: GET_USER_REQUEST });
        db.collection('users')
            .onSnapshot((querySnapshot) => {
                const users = [];

                querySnapshot.forEach((doc) => {
                    if (doc.data().uid !== uid) {
                        users.push(doc.data());
                    }
                });

                dispatch({ type: GET_USER_SUCCESS, payload: { users } })

            })
    }
}