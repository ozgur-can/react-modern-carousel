import React from "react";
import { IState } from "./interfaces";

export const state: IState = {
  counter: 0,
};

export const Context = React.createContext(state);
