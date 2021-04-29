import { IActionType } from "./interfaces";

export const navigateToLeft = (): IActionType => ({
  type: "LEFT",
});

export const navigateToRight = (): IActionType => ({
  type: "RIGHT",
});

export const setItems = (items: (React.ReactChild | React.ReactFragment | React.ReactPortal)[], infinite: boolean): IActionType => ({
  type: "SET_ITEMS",
  items,
  infinite
})