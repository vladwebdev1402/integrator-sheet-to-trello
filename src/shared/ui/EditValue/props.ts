export interface IEditFuatureProps {
    currentValue: string;
    isEdit: boolean;
    setIsEdit: (value: boolean) => void;
}

export interface IEditFuatureObjectProps<T> {
    currentValue: T,
    isEdit: boolean;
    setIsEdit: (value: boolean) => void;
}