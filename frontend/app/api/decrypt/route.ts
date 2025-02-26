import { createDecipheriv } from "crypto";
import { ENCRYPTION_ALGORITHM, USER_DATA_COOKIE_NAME } from "@/config";
import { NextResponse } from "next/server";

export function decryptData(encryptedData: string) {
  const [ivHex, encryptedHex] = encryptedData.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");
  const decipher = createDecipheriv(
    ENCRYPTION_ALGORITHM,
    Buffer.from(ENCRYPTION_ALGORITHM, "hex"),
    iv
  );
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return JSON.parse(decrypted.toString());
}

export async function GET(request: Request) {
  const cookies = request.headers;

  console.log("Cookies");
  console.log(cookies);

  return NextResponse.json({});
}
