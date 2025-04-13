import * as CryptoJS from "crypto-ts";
import * as env from "dotenv";

env.config();

class CryptoHelper {
    private static readonly key = CryptoJS.enc.Utf8.parse(process.env.CRYPTO_KEY || "testando");
    private static readonly iv = CryptoJS.enc.Utf8.parse(process.env.CRYPTO_IV || "1234567890123456");

    private static base64UrlEncode(input: string): string {
        return input.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }

    private static base64UrlDecode(input: string): string {
        let base64 = input.replace(/-/g, "+").replace(/_/g, "/");
        while (base64.length % 4) {
        base64 += "=";
        }
        return base64;
    }

    static encrypt(id: number): string {
        const encrypted = CryptoJS.AES.encrypt(
        id.toString(),
        this.key,
        { iv: this.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.PKCS7 }
        );
        return this.base64UrlEncode(encrypted.toString());
    }

    static decrypt(encryptedId: string): number {
        const encrypted = this.base64UrlDecode(encryptedId);
        const decrypted = CryptoJS.AES.decrypt(
        encrypted,
        this.key,
        { iv: this.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.PKCS7 }
        );
        return parseInt(decrypted.toString(CryptoJS.enc.Utf8), 10);
    }
}

export default CryptoHelper;
