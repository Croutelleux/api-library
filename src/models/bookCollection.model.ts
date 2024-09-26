import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données
import { Book } from "./book.model";

export interface BookCollectionAttributes {
    id?: number;
    book_id: number;
    available: boolean;
    state: string;
}

export class BookCollection
    extends Model<BookCollectionAttributes>
    implements BookCollectionAttributes
{
    public id?: number;
    public book_id!: number;
    public available!: boolean;
    public state!: string;
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
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "BookCollection",
    }
);

BookCollection.belongsTo(Book, { foreignKey: "book_id", as: "book" });