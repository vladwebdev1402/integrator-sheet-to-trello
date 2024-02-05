import { IFormatedBoard, IFormatedCard, IFormatedList } from "../types";

export const searchMissingLists = (
  from: IFormatedBoard,
  to: IFormatedBoard
): IFormatedList[] => {
  return from.lists.filter(
    (list) => !to.lists.find((tList) => tList.name === list.name)
  );
};

export const searchMissingCards = (
  from: IFormatedBoard,
  to: IFormatedBoard
): IFormatedCard[] => {
  return from.cards.filter(
    (card) => !to.cards.find((tCard) => tCard.name === card.name && tCard.nameList === card.nameList)
  );
};
