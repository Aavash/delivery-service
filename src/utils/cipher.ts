import * as crypto from 'crypto';
import * as CryptoJS from 'crypto-js';

const enc_key = 'AEON5c56!9E4e#MR';

const password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY',
	iv = '60iP0h6vJoEa';

export function encrypt(text: any) {
	const cipher = crypto.createCipheriv('aes-256-gcm', password, iv);
	let encrypted = cipher.update(text, 'utf8', 'hex');

	encrypted += cipher.final('hex');
	const tag = cipher.getAuthTag();

	
return {
		content: encrypted,
		tag: tag.toString('hex'),
	};
}

export function decrypt(encrypted: {
	tag: string;
	content: NodeJS.ArrayBufferView;
}) {
	const decipher = crypto.createDecipheriv('aes-256-gcm', password, iv);

	decipher.setAuthTag(Buffer.from(encrypted.tag, 'hex'));
	let dec = decipher.update(encrypted.content, 'hex', 'utf8');

	dec += decipher.final('utf8');
	
return dec;
}

export function encryptCrypto(str: string) {
	return CryptoJS.AES.encrypt(str, enc_key).toString();
}

export function decryptCrypto(ciphertext: string) {
	const bytes = CryptoJS.AES.decrypt(ciphertext, enc_key);

	
return bytes.toString(CryptoJS.enc.Utf8);
}
