export interface ICreateBoard {
    name: string;
    desc?: string;
    prefs_background: string;
    defaultLists?: boolean;
}

export interface ICreateList {
    name: string;
    idBoard: string;
}

export interface ICreateCard {
    name: string;
    idList: string;
    desc?: string;
}
