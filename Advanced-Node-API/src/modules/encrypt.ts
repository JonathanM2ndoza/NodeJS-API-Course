import bcrypt from 'bcrypt';

export const generateHash = async (
  password: string,
  sizeSalt: number
): Promise<string> =>
  bcrypt
    .genSalt(sizeSalt)
    .then((salt: string) => {
      return bcrypt.hash(password, salt);
    })
    .then((hash: string) => {
      return hash;
    })
    .catch((error: Error) => {
      throw error;
    });

export const comparePassword = async (
  passwordReq: string,
  passwordDB: string
): Promise<boolean> =>
  bcrypt
    .compare(passwordReq, passwordDB)
    .then((data: boolean) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
