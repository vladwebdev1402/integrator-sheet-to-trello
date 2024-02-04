import { IBoard, IBoardCard, IBoardList, IFormatedBoard } from "../types";

export const formateTrello = (board: IBoard, lists: IBoardList[], cards: IBoardCard[]): IFormatedBoard => {
    const newBoard: IFormatedBoard = {
        id: board.id,
        name: board.name,
        description: board.desc,
        lists: lists.map((list) => ({
            id: list.id,
            name: list.name,
            cards: cards.filter((card) => card.idList === list.id),
        })),
    };
    return newBoard;
}