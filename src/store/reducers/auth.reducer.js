import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
} from "./auth.constants";

const initialState = {
  isLoggingIn: false,
  isLoggingOut: false,
  isVerifying: false,
  loginError: false,
  signupError: false,
  logoutError: false,
  isAuthenticated: false,
  user: {},
};

const AuthReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    //   login
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: true,
      };

    //   signup
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        signupError: false,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.user,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        signupError: true,
      };

    //   logout
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: {},
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true,
      };

    //   verify
    case VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false,
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
