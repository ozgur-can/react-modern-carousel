import { IActionType, IState } from "./interfaces";
import { LinkedList } from "../helper/LinkedList";

export const reducer = (state: IState, action: IActionType): IState => {
  switch (action.type) {
    case "LEFT":
      if (state.itemToShow.prev != null)
        return { ...state, itemToShow: state.itemToShow.prev };
      else return { ...state };

    case "RIGHT":
      if (state.itemToShow.next != null)
        return { ...state, itemToShow: state.itemToShow.next };
      else return { ...state };

    case "MOVE_WITH_ANIMATION":
      return { ...state, itemDirection: action.direction };

    case "SET_ITEMS": {
      const linkedList = new LinkedList(action.infinite);
      linkedList.setItems(action.items);
      return {
        ...state,
        linkedList: linkedList,
        itemToShow: linkedList.head,
        items: action.items,
      };
    }

    case "SET_POINTER_CHANGES": {
      if (action.pointerValues.pointerDownPosX)
        return { ...state, pointerValues: action.pointerValues };
      if (!action.pointerValues.pointerDownPosX)
        return {
          ...state,
          pointerValues: {
            ...state.pointerValues,
            pointerDown: action.pointerValues.pointerDown,
          },
        };
    }

    case "SET_TOUCH_CHANGES": {
      if (action.touchValues.touchDownPosX)
        return { ...state, touchValues: action.touchValues };
      if (!action.touchValues.touchDownPosX)
        return {
          ...state,
          touchValues: {
            ...state.touchValues,
            touchDown: action.touchValues.touchDown,
          },
        };
    }

    default:
      return state;
  }
};
