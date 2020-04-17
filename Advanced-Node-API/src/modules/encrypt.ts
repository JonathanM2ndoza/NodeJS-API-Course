import bcrypt from 'bcrypt';

export const generateHash = async (
  password: string,
  sizeSalt: number
): Promise<string> =>
  await bcrypt
    .genSalt(sizeSalt)
    .then(async (salt: string) => {
      return await bcrypt
        .hash(password, salt)
        .then((hash: string) => {
          return hash;
        })
        .catch((error: Error) => {
          throw error;
        });
    })
    .catch((error: Error) => {
      throw error;
    });

export const comparePassword = async (
  passwordReq: string,
  passwordDB: string
): Promise<boolean> =>
  await bcrypt
    .compare(passwordReq, passwordDB)
    .then((data: boolean) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
