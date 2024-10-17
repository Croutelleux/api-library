import { Buffer } from "buffer"; // Pour décoder Base64
import jwt from "jsonwebtoken"; // Pour générer le JWT
import { notFound } from "../error/NotFoundError";
import { User } from "../models/user.model"; // Modèle Sequelize

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"; // Clé secrète pour signer le token

export class AuthenticationService {
  public async authenticate(
    username: string,
    password: string
  ): Promise<string> {
    // Recherche l'utilisateur dans la base de données
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw notFound("User");
    }

    // Décoder le mot de passe stocké en base de données
    const decodedPassword = Buffer.from(user.password, "base64").toString(
      "utf-8"
    );
    if (password === decodedPassword) {
      // Si l'utilisateur est authentifié, on génère un JWT
      const permissions = this.getPermissions(username);
      const token = jwt.sign(
        { username: user.username, permissions },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return token;
    } else {
      let error = new Error("Mot de passe incorrect");
      (error as any).status = 403;
      throw error;
    }
  }

  private getPermissions(username: string): { [key: string]: string[] } {
    const permissions: { [key: string]: string[] } = {
      author: [],
      book: [],
      bookCollection: [],
      user: [],
    };

    switch (username) {
      case "admin":
        permissions.author = ["write", "delete"];
        permissions.book = ["write", "delete"];
        permissions.bookCollection = ["write", "delete"];
        permissions.user = ["write", "delete"];
        break;
      case "gerant":
        permissions.author = ["write"];
        permissions.book = ["write"];
        permissions.bookCollection = ["write", "delete"];
        break;
      case "utilisateur":
        permissions.book = ["write"];
        break;
      default:
        // read dispo par defaut (vu que pas rajouté)
        break;
    }

    return permissions;
  }
}

export const authService = new AuthenticationService();