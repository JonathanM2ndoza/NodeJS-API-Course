import bcrypt from 'bcrypt';

export const generateHash = async (
  password: string,
  sizeSalt: number
): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(sizeSalt);

    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (err) {
    throw err;
  }
};

export const comparePassword = async (
  passwordReq: string,
  passwordDB: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(passwordReq, passwordDB);
  } catch (err) {
    throw err;
  }
};
