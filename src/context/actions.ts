import React from "react";
import { IActionType, IPointerValues, ITouchValues } from "./interfaces";

export const navigateToLeft = (): IActionType => ({
  type: "LEFT",
});

export const navigateToRight = (): IActionType => ({
  type: "RIGHT",
});

export const setItems = (
  items: (React.ReactChild | React.ReactFragment | React.ReactPortal)[],
  infinite: boolean
): IActionType => ({
  type: "SET_ITEMS",
  items,
  infinite,
});

export const getItemAt = (index: number): IActionType => ({
  type: "GET_ITEM_AT",
  itemIndex: index,
});

export const setPointerChanges = (
  pointerValues: IPointerValues
): IActionType => ({
  type: "SET_POINTER_CHANGES",
  pointerValues,
});

export const setTouchChanges = (touchValues: ITouchValues): IActionType => ({
  type: "SET_TOUCH_CHANGES",
  touchValues,
});
