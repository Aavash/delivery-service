"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptCrypto = exports.encryptCrypto = exports.decrypt = exports.encrypt = void 0;
const crypto = __importStar(require("crypto"));
const CryptoJS = __importStar(require("crypto-js"));
const enc_key = 'AEON5c56!9E4e#MR';
const password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY', iv = '60iP0h6vJoEa';
function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-gcm', password, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag();
    return {
        content: encrypted,
        tag: tag.toString('hex'),
    };
}
exports.encrypt = encrypt;
function decrypt(encrypted) {
    const decipher = crypto.createDecipheriv('aes-256-gcm', password, iv);
    decipher.setAuthTag(Buffer.from(encrypted.tag, 'hex'));
    let dec = decipher.update(encrypted.content, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}
exports.decrypt = decrypt;
function encryptCrypto(str) {
    return CryptoJS.AES.encrypt(str, enc_key).toString();
}
exports.encryptCrypto = encryptCrypto;
function decryptCrypto(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, enc_key);
    return bytes.toString(CryptoJS.enc.Utf8);
}
exports.decryptCrypto = decryptCrypto;
//# sourceMappingURL=cipher.js.map