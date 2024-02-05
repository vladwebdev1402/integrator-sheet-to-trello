export interface IFormatedCard {
  id?: string;
  idList: string;
  nameList: string;
  name: string;
  description?: string;
}

export interface IFormatedList {
  id: string;
  name: string;
}

export interface IFormatedBoard {
  id: string;
  name: string;
  description?: string;
  lists: IFormatedList[];
  cards: IFormatedCard[];
}
