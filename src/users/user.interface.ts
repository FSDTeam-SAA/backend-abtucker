export interface IUser {
  _id: any; // Change from string to any
  name: string;
  email: string;
  password: string;
  role: string;
  resetOtp?: string;
  resetOtpExpiry?: Date;
}
