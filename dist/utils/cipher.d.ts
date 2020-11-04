/// <reference types="node" />
export declare function encrypt(text: any): {
    content: string;
    tag: string;
};
export declare function decrypt(encrypted: {
    tag: string;
    content: NodeJS.ArrayBufferView;
}): string;
export declare function encryptCrypto(str: string): any;
export declare function decryptCrypto(ciphertext: string): any;
