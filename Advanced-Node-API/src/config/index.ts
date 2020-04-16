import { Development } from './development';
import { Production } from './production';

let environment: Development | Production;

if (process.env.NODE_ENV === 'development') {
  environment = new Development();
} else if (process.env.NODE_ENV === 'production') {
  environment = new Production();
} else {
  environment = new Development();
}

export { environment };
