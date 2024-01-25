const root = "";

export const routerPaths = {
    main: root,
    profile: root + "/profile",
    trello: root + "/trello",
    google: root + "/google",
    sheetDetail: root + "/google/:id",
    navigateSheetDetail: (id: string) => root + "/google/" + id,
    trelloDetail: root + "/trello/:id",
    navigateTrelloDetail: (id: string) => root + "/trello/" + id,
    trelloCardDetail: ":cardId",
    navigatetrelloCardDetail: (cardId: string) => `${cardId}`,
}