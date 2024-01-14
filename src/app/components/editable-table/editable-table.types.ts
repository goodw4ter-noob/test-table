export interface IUser {
  _id: string;
  isActive: boolean;
  balance: string;
  picture: string;
  age: string;
  name: {
    first: string;
    last: string;
  };
  company: string;
  email: string;
  address: string;
  tags: string[];
  favoriteFruit: string;
}
