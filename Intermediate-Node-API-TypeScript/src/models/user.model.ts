import { Document } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  email: string;
  data: {
    age: number;
    isMale: boolean;
  };
  role: string;
}
