import React from "react";
import { IState } from "./interfaces";

export const state: IState = { linkedList: null };

export const Context = React.createContext(state);
