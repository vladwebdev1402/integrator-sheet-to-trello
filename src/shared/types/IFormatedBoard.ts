export interface IFormatedCard {
  id?: string;
  name: string;
  description?: string;
}

export interface IFormatedList {
  id: string;
  name: string;
  cards: IFormatedCard[];
}

export interface IFormatedBoard {
  id: string;
  name: string;
  description?: string;
  lists: IFormatedList[];
}
