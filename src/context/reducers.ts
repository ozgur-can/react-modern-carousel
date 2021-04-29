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

    case "SET_ITEMS": {
      const linkedList = new LinkedList(action.infinite);
      linkedList.setItems(action.items);
      return {
        ...state,
        linkedList: linkedList,
        itemToShow: (linkedList.head),
        items: action.items
      }
    }

    default:
      return state;
  }
};
