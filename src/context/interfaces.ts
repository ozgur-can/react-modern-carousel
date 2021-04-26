export interface IState {
    counter: number;
}

export interface IActionType{
    type: string;
}

export enum NavigDirection {
    Left = "<",
    Right = ">",
}