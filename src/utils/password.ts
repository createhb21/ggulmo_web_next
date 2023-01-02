import CryptoJS from "crypto-js";

export const encryptionPassword = (password: string): string => {
  const cryptoedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  return cryptoedPassword;
};
