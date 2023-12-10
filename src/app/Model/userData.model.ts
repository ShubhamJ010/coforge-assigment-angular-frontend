export interface UserData {
  id:number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  comments: string;
  address: {
    city: string;
    streetNumber: string;
    country: string;
  };
}
