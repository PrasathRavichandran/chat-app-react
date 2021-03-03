import { auth, db } from "../../service/firebase";
import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
} from "../reducers/auth.constants";

// login
const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const receiveLogin = (user) => {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};

const loginError = () => {
  return {
    type: LOGIN_FAILURE,
  };
};

// Signup
const requestSignup = () => {
  return {
    type: SIGNUP_REQUEST,
  };
};

const receiveSignup = (user) => {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
};

const signupError = () => {
  return {
    type: SIGNUP_FAILURE,
  };
};

// logout
const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE,
  };
};

// verify
const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST,
  };
};

const verifySuccess = (user) => {
  return {
    type: VERIFY_SUCCESS,
    user,
  };
};

export const loginUser = (user) => {
  return async (dispatch) => {
    dispatch(requestLogin());
    auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((user) => {
        db.collection("users")
          .doc(user.user.uid)
          .update({
            isOnline: true,
            createdAt: new Date(),
          })
          .then(() => {
            dispatch(receiveLogin(user));
          })
          .catch((error) => {
            console.log("on update error", error);
            dispatch(loginError());
          });
      })
      .catch((error) => {
        console.log("login error", error);
        dispatch(loginError());
      });
  };
};

export const signupUser = (user) => {
  return async (dispatch) => {
    dispatch(requestSignup());
    auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        const currentUsr = auth.currentUser;

        if (currentUsr != null) {
          // updating display name using currentUsr
          currentUsr
            .updateProfile({
              displayName: user.username,
            })
            .then(() => {
              // add one new entry to the users collection
              db.collection("users")
                .doc(data.user.uid)
                .set({
                  username: user.username,
                  uid: data.user.uid,
                  createdAt: new Date(),
                  isOnline: true,
                })
                .then(() => {
                  dispatch(receiveSignup(data));
                })
                .catch((error) => {
                  console.log("db error", error);
                  dispatch(signupError());
                });
            })
            .catch((error) => {
              console.log("current usr Error", error);
              dispatch(signupError());
            });
        }
      })
      .catch((error) => {
        dispatch(signupError());
      });
  };
};

export const logout = (uid) => {
  return async (dispatch) => {
    dispatch(requestLogout());
    db.collection("users")
      .doc(uid)
      .update({
        isOnline: false,
        createdAt: new Date(),
      })
      .then(() => {
        auth
          .signOut()
          .then(() => {
            dispatch(receiveLogout());
          })
          .catch((error) => {
            console.log("logout error", error);
            dispatch(logoutError());
          });
      })
      .catch((error) => {
        console.log("on update error", error);
        dispatch(logoutError());
      });
  };
};

export const verifyAuth = () => {
  return async (dispatch) => {
    dispatch(verifyRequest());
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        dispatch(receiveLogin(user));
      }
      dispatch(verifySuccess(user));
    });
  };
};
