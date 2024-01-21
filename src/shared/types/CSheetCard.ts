class CSheetCard {
    idx: number;
    title: string;
    description: string;
    sheetId: number;
  
    constructor(arrayCard: string[], idx: number, sheetId: number) {
      this.idx = idx;
      this.sheetId = sheetId;
      this.title = arrayCard[0] || "Card name is empty";
      this.description = arrayCard[1] || "";
    }
  }
  
  export { CSheetCard };