export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const SET_COUNT = "SET_COUNT";

export interface IncrementAction {
  type: typeof INCREMENT;
}

export interface DecrementAction {
  type: typeof DECREMENT;
}

export interface SetCountAction {
  type: typeof SET_COUNT;
  payload: number; // Use payload instead of action
}

export type Action = IncrementAction | DecrementAction | SetCountAction;

export const increment = (): IncrementAction => ({
  type: INCREMENT,
});

export const decrement = (): DecrementAction => ({
  type: DECREMENT,
});

export const setCount = (count: number): SetCountAction => ({
  type: SET_COUNT,
  payload: count,
});
