import { AnyAction } from "redux";

/**
 * template AC any action creator
 */
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>['type'];
  match(action: AnyAction): action is ReturnType<AC>;
}

/**
 * Creates a new matchablel type out of a given action creator
 * also allows actionCreator functions to match actions inside redux reducer
 * 
 * @param actionCreator the action creator given to the matchable type
 */
export function withMatcher<AC extends () => AnyAction & {type: string }>(actionCreator: AC): Matchable<AC>;
export function withMatcher<AC extends (...args: any[]) => AnyAction & {type: string }>(actionCreator: AC): Matchable<AC>;
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    }
  })
};

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

//export const createAction = (type, payload) => ({ type, payload });
