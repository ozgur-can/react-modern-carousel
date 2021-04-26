import { IActionType, IState } from "./interfaces";

export const reducer = (state: IState, action: IActionType): IState => {
  switch (action.type) {
    case "LEFT":
      return { ...state, counter: state.counter - 1 };

    case "RIGHT":
      return { ...state, counter: state.counter + 1 };

    default:
      return state;
  }
};
