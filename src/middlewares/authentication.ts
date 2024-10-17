import * as express from "express";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "jwt") {
    const token =
      request.body.token ||
      request.query.token ||
      request.headers["authorization"]?.split(" ")[1];

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("Pas de token"));
      }
      jwt.verify(token, JWT_SECRET, function (err: any, decoded: any) {
        if (err) {
          reject(new Error("Invalide ou expiree"));
        } else {
          if (scopes && scopes.length) {
            const [resource, action] = scopes[0].split(":");
            if (
              !decoded.permissions[resource] ||
              !decoded.permissions[resource].includes(action)
            ) {
              reject(new Error("pas les droits"));
            }
          }
          resolve(decoded);
        }
      });
    });
  } else {
    throw new Error("authentification JWT");
  }
}