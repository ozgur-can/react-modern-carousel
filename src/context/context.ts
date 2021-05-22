import React from "react";
import { IState } from "./interfaces";

export const state: IState = {};

export const Context = React.createContext(state);
