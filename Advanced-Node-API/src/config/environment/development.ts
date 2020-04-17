export class Development {
  nodeEnv: string = process.env.NODE_ENV || 'development';
  mongoURI: string =
    process.env.MONGO_URI ||
    'mongodb+srv://jmendoza:zuZYkSpMIpSGqgLD@cluster0-7rxkw.mongodb.net/store?retryWrites=true&w=majority';
  port: number = Number(process.env.PORT) || 3000;
  sizeSalt: string = process.env.SIZE_SALT || '15';
  jwtSecret: string = process.env.JWT_SECRET || '904568tjkfgSDLFDSFJL';
  jwtExpireSeconds: number = Number(process.env.JWT_EXPIRE_SECONDS) || 360;
  validHosts: string = process.env.VALID_HOSTS || 'test.com,localhost';
  morganFormat: string = process.env.MORGAN_FORMAT || 'dev';
}
