import jwt from "jsonwebtoken";
export default function GenerateJwt({ data, secret, expiresIn } = {}) {
  if (data === undefined) {
    throw new Error("data is required to generate jwt token");
  }
  if (secret === undefined) {
    throw new Error("secret is required to generate jwt token");
  }
  return jwt.sign(data, secret, expiresIn !== undefined ? { expiresIn } : {});
}
