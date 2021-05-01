import { IActionType, IPointerValues } from "./interfaces";

export const navigateToLeft = (): IActionType => ({
  type: "LEFT",
});

export const navigateToRight = (): IActionType => ({
  type: "RIGHT",
});

export const moveWithAnimation = (direction: string): IActionType => ({
  type: "MOVE_WITH_ANIMATION",
  direction
});

export const setItems = (items: (React.ReactChild | React.ReactFragment | React.ReactPortal)[], infinite: boolean): IActionType => ({
  type: "SET_ITEMS",
  items,
  infinite
})

export const setPointerChanges = (pointerValues: IPointerValues): IActionType => ({
  type: "SET_POINTER_CHANGES",
  pointerValues
});