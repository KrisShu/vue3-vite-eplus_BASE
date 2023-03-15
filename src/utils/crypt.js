import CryptoJS from "crypto-js";
const KEY = CryptoJS.enc.Utf8.parse("cmsABC123jinding");
const IV = CryptoJS.enc.Utf8.parse("cmsABC123jinding");
/**
 * Crypt AES 加密方法
 * @param {*} word 需要加密的字符串
 * @param {*} keyStr
 * @param {*} ivStr
 */
export const aesEncrypt = (word, keyStr, ivStr) => {
  let key = KEY;
  let iv = IV;
  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }
  let srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
};
/**
 * Crypt AES 解密方法
 * @param {*} word 需要解密的字符串
 * @param {*} keyStr
 * @param {*} ivStr
 */
export const aesDecrypt = (word, keyStr, ivStr) => {
  let key = KEY;
  let iv = IV;
  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }
  let base64 = CryptoJS.enc.Base64.parse(word);
  let src = CryptoJS.enc.Base64.stringify(base64);
  var decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};
export default {
  aesEncrypt,
  aesDecrypt
};
