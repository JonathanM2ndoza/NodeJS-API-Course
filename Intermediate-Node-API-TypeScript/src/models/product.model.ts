import { Document } from 'mongoose';
import { User } from './user.model';

export interface Product extends Document {
  title: string;
  desc: string;
  price: number;
  images: Array<string>;
  user: User | string;
}
