import * as forge from "node-forge";

export const decryptFawryCredentials = (
  cipherText: string,
  privateKeyPem: string
): string | null => {
  try {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    // Decrypt data using RSA-OAEP
    const decrypted = privateKey.decrypt(
      forge.util.decode64(cipherText),
      "RSA-OAEP"
    );
    // Return the decrypted text as a string
    return forge.util.decodeUtf8(decrypted);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};
