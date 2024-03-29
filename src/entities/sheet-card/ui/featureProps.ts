import { CSheetCard } from "@/shared/types";

export interface ICardDeleteProps {
    closeDialog: () => void;
    card: CSheetCard;
}

export interface ICardShiftProps {
    card: CSheetCard;
    closeDialog: () => void;
}

export interface ICardShiftInsideProps {
    card: CSheetCard;
}
