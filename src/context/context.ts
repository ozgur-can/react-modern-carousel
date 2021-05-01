import React from "react";
import { IState } from "./interfaces";

export const state: IState = { linkedList: null, itemDirection: null, pointerValues: null };

export const Context = React.createContext(state);
