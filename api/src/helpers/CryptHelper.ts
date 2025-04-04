import * as CryptoJS from "crypto-ts";
import * as env from "dotenv";

env.config();

class CryptoHelper {
    private static readonly key: string = process.env.CRYPTO_KEY || "testando";

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
        const encrypted = CryptoJS.AES.encrypt(id.toString(), this.key).toString();
        return this.base64UrlEncode(encrypted);
    }

    static decrypt(encryptedId: string): number {
        const encrypted = this.base64UrlDecode(encryptedId);
        const bytes = CryptoJS.AES.decrypt(encrypted, this.key);
        return parseInt(bytes.toString(CryptoJS.enc.Utf8), 10);
    }
}

export default CryptoHelper;
