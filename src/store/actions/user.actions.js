import { db } from "../../service/firebase";
import {
  GET_REAL_TIME_CONVERSATION_FAILURE,
  GET_REAL_TIME_CONVERSATION_REQUEST,
  GET_REAL_TIME_CONVERSATION_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
} from "../reducers/user.constants";

export const getRealTimeUsers = (uid) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    const unsubscribe = db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];

      querySnapshot.forEach((doc) => {
        if (doc.data().uid !== uid) {
          users.push(doc.data());
        }
      });

      dispatch({ type: GET_USER_SUCCESS, payload: { users } });
    });
    return unsubscribe;
  };
};

export const updateMessage = (msgObj) => {
  return async (dispatch) => {
    db.collection("conversations")
      .add({
        ...msgObj,
        isView: false,
        createdAt: new Date(),
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getRealTimeConversations = (user) => {
  return async (dispatch) => {
    dispatch({ type: GET_REAL_TIME_CONVERSATION_REQUEST });
    db.collection("conversations")
      .where("uid_1", "in", [user.uid_1, user.uid_2])
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const conversations = [];
        querySnapshot.forEach((doc) => {
          if (
            (doc.data().uid_1 === user.uid_1 &&
              doc.data().uid_2 === user.uid_2) ||
            (doc.data().uid_1 === user.uid_2 && doc.data().uid_2 === user.uid_1)
          ) {
            conversations.push(doc.data());
          }
          if (conversations.length > 0) {
            dispatch({
              type: GET_REAL_TIME_CONVERSATION_SUCCESS,
              payload: { conversations },
            });
          } else {
            dispatch({
              type: GET_REAL_TIME_CONVERSATION_FAILURE,
              payload: { conversations },
            });
          }
        });
      });
  };
};
