export class Production {
  nodeEnv: string = process.env.NODE_ENV || 'production';
  mongoURI: string =
    process.env.MONGO_URI ||
    'mongodb+srv://jmendoza:zuZYkSpMIpSGqgLD@cluster0-7rxkw.mongodb.net/store?retryWrites=true&w=majority';
  port: number = Number(process.env.PORT) || 80;
  sizeSalt: number = Number(process.env.SIZE_SALT) || 15;
  jwtSecret: string =
    process.env.JWT_SECRET || '021568tjkfgSLKJNH54563DLFDSFJL';
  jwtExpireSeconds: number = Number(process.env.JWT_EXPIRE_SECONDS) || 360;
  validHosts: string = process.env.VALID_HOSTS || 'prod.com';
  morganFormat: string = process.env.MORGAN_FORMAT || 'common';
  loggingPath: string = process.env.LOGGING_PATH || 'logs/';
}
