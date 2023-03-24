import CryptoJS from "crypto-js";

const secretKey =
  "33d7ad912c792640f93f3ef2b652358cdb7bca7a6f348902c2572e4231bdb03e";

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

export const decryptData = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
