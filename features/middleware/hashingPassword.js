import bcrpt from "bcrypt";
export async function hashPassword(password) {
  let hashedPassword = await bcrpt.hash(password, 12);
  return hashedPassword;
}
export function comparehashedPassword(hashedPassword, password) {
  let campare = bcrpt.compare(password, hashedPassword);
  return campare;
}
