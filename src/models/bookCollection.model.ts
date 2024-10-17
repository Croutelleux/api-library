import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données
import { Book } from "./book.model";

export interface BookCollectionAttributes {
  id?: number;
  book_id: number;
  available: number;
  state: number;
  book?: Book;
}

export class BookCollection
  extends Model<BookCollectionAttributes>
  implements BookCollectionAttributes
{
  public id!: number;
  public book_id!: number;
  public available!: number;
  public state!: number;
  public book!: Book;
}

BookCollection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    available: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "BookCollection",
  },
);

BookCollection.belongsTo(Book, { foreignKey: "book_id", as: "book" });
Book.hasMany(BookCollection, {
  foreignKey: "book_id",
  as: "collections",
  sourceKey: "id",
});
