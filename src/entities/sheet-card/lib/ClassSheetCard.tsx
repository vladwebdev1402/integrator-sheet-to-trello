class CSheetCard {
  id: number;
  title: string;
  description: string;

  constructor(arrayCard: string[], idx: number) {
    this.id = idx;
    this.title = arrayCard[0] || "Card name is empty";
    this.description = arrayCard[1] || "";
  }
}

export { CSheetCard };
