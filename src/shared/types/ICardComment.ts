export interface ICardComment {
  id: string;
  idMemberCreator: string;
  data: {
    text: string;
  };
  date: string;
  memberCreator: {
    id: string;
    avatarHash: string;
    fullName: string;
    username: string;
  };
}
