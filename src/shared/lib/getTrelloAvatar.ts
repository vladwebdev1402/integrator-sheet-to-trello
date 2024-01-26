export const getTrelloAvatar = (id: string, avatarHash: string): string => {
    return `https://trello-members.s3.amazonaws.com/${id}/${avatarHash}/170.png`
}