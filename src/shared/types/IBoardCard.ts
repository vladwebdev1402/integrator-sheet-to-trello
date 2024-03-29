import { ILabel } from "./ILabel";

export interface IBoardCard {
    id: string;
    idList: string;
    idBoard: string;
    name: string;
    desc: string;
    pos: number;
    dateLastActivity: string;
    labels: ILabel[];
}
