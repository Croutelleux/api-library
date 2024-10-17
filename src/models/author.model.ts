import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données
import { Book } from "./book.model";
export interface AuthorAttributes {
  id?: number;
  first_name: string;
  last_name: string;
  books?: Book[];
}

export class Author
  extends Model<AuthorAttributes>
  implements AuthorAttributes
{
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public books!: Book[];
}

Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Author",
  },
);
