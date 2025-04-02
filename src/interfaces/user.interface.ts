export interface IUser {
  id?: number;
  name: string;
  email: string;
  phone_number: string;
}

export interface IUserState {
  users: IUser[];
  currentUser: IUser | null;
  error: string | null;
  loading: boolean;
  pagination: {
    currentPage: number;
    pageSize: number;
    total: number;
    showSizeChanger: boolean;
    pageSizeOptions: number[];
  };
}
