import { USER_ACTION_TYPES } from "./user.types";
import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";
import {
  AdditionalInformation,
  UserData,
} from "../../utils/firebase/firebase.utils";
import { User } from "firebase/auth";

//===============
//  Types
//===============

//export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>;

//export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

//export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

//export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email: string, password: string}>

//===============
//  Background
//===============

//with type : const setCurrentUser: Matchable<(user: UserData) => SetCurrentUser>
//no type :   const setCurrentUser: Matchable<(user: UserData) => ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>>
//w/ sub. :   const setCurrentUser: Matchable<(user: UserData) => ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>>
// Conclusion: they are identical, what is the point of all these types that we never see again?

export const setCurrentUser = withMatcher((user: UserData) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
);

export const checkUserSession = withMatcher(() =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

//===============
//  Sign In
//===============

export const googleSignInStart = withMatcher(() =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
);

export const emailSignInStart = withMatcher((email: string, password: string) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
);

export const signInSuccess = withMatcher((user: UserData & {id: string}) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);

export const signInFailed = withMatcher((error: Error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
);

//===============
//  Sign Up
//===============

export const signUpStart = withMatcher(
  (email: string, password: string, displayName: string) =>
    createAction(USER_ACTION_TYPES.SIGN_UP_START, {
      email,
      password,
      displayName,
    })
);

//not the user from the firestore data, it's the user that comes from a user credential
export const signUpSuccess = withMatcher(
  (user: User, additionalDetails: AdditionalInformation) =>
    createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails })
);

export const signUpFailed = withMatcher((error: Error) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)
);

//===============
//  Sign Out
//===============

export const signOutStart = withMatcher(() =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);

export const signOutSuccess = withMatcher(() =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
);

export const signOutFailed = withMatcher((error: Error) =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
);
