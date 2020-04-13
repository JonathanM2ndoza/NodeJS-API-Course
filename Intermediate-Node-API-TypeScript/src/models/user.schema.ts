import mongoose, { Schema } from 'mongoose';
import { User } from './user.model';

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  data: {
    type: {
      age: Number,
      isMale: Boolean,
    },
  },
  role: {
    type: String,
    enum: ['admin', 'seller'],
    default: 'seller',
  },
});

export default mongoose.model<User>('User', UserSchema);
