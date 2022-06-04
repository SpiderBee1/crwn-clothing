import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";
import { signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed } from "./user.action";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (typeof signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload as UserData };
  }

  if (typeof signOutSuccess.match(action)) {
    return { ...state, currentUser: null as null};
  }

  if (typeof signUpFailed.match(action) || typeof signInFailed.match(action) || typeof signOutFailed.match(action)) {
    return { ...state, error: action.payload as Error };
  }

  //no action match
  return state;
};
