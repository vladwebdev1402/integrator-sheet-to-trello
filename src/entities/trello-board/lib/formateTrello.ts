import { IBoard, IBoardCard, IBoardList, IFormatedBoard } from "@/shared/types";

export const formateTrello = (board: IBoard, lists: IBoardList[], cards: IBoardCard[]): IFormatedBoard => {
    const newBoard: IFormatedBoard = {
        id: board.id,
        name: board.name,
        description: board.desc,
        lists: lists.map((list) => ({
            id: list.id,
            name: list.name,
        })),
        cards: cards.map((card) => ({
            name: card.name,
            description: card.desc,
            idList: card.idList,
            nameList: lists.find((list) => list.id === card.idList)?.name || "None",
        }))
    };
    return newBoard;
}