export interface IUser {
    _id: string;
    userName: string;
	email: string;
    library: string[];
}

export interface UserState {
    user: IUser
}