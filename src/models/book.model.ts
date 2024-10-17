import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Connection à la base de données
import { Author } from "./author.model";
import { BookCollection } from "./bookCollection.model";

export interface BookAttributes {
  id?: number;
  title: string;
  publish_year: number;
  author_id: number;
  isbn: string;
  author?: Author;
  collections?: BookCollection[];
}

export class Book extends Model<BookAttributes> implements BookAttributes {
  public id!: number;
  public title!: string;
  public publish_year!: number;
  public author_id!: number;
  public isbn!: string;
  public author!: Author;
  public collections!: BookCollection[];
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publish_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "Book",
  },
);

Book.belongsTo(Author, { foreignKey: "author_id", as: "author" });
Author.hasMany(Book, { sourceKey: "id", foreignKey: "author_id", as: "books" });
