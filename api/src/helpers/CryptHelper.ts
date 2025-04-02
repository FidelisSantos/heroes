import * as CryptoJS from "crypto-ts";
import * as env from "dotenv";

env.config();

class CryptoHelper {
    private static readonly key: string = process.env.CRYPTO_KEY || "testando";

    static encrypt(id: number): string {
        return CryptoJS.AES.encrypt(id.toString(), this.key).toString();
    }

    static decrypt(encryptedId: string): number {
        const bytes = CryptoJS.AES.decrypt(encryptedId, this.key);
        return parseInt(bytes.toString(CryptoJS.enc.Utf8), 10);
    }
}

export default CryptoHelper;
