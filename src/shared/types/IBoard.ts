export interface IBoard {
    id: string;
    name: string;
    desc: string;
    idMemberCreator: string;
    url: string;
    shortUrl: string;
    prefs: {
        background: string;
        backgroundImage: string | null;
        backgroundImageScaled: [{
            width: number;
            height: number;
            url: string;
        }];
        backgroundColor: string;
    }
}