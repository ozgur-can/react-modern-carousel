import { IActionType, IState } from "./interfaces";
import { LinkedList } from "../helper/LinkedList";

export const reducer = (state: IState, action: IActionType): IState => {

  switch (action.type) {
    case "LEFT":
      return { ...state, itemToShow: state.itemToShow.prev, itemIndex: state.itemToShow.prev.length };

    case "RIGHT":
      return { ...state, itemToShow: state.itemToShow.next, itemIndex: state.itemToShow.next.length };

    case "SET_ITEMS": {
      const linkedList = new LinkedList(action.infinite);
      linkedList.setItems(action.items);
      return {
        ...state,
        linkedList: linkedList,
        itemToShow: linkedList.head,
        items: action.items,
        itemIndex: linkedList.head.length
      };
    }

    case "GET_ITEM_AT":
      return {
        ...state,
        itemToShow: state.linkedList.getItemAt(action.itemIndex),
        itemIndex: action.itemIndex + 1
      };

    case "SET_POINTER_CHANGES": {
      return {
        ...state,
        pointerValues: {
          pointerDown: action.pointerValues.pointerDown,
          pointerDownPosX: action.pointerValues.pointerDownPosX,
        },
      };
    }

    case "SET_TOUCH_CHANGES": {
      return {
        ...state,
        touchValues: {
          touchDown: action.touchValues.touchDown,
          touchDownPosX: action.touchValues.touchDownPosX
        },
      };
    }

    default:
      return state;
  }
};
