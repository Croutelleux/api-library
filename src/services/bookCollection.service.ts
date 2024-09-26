import { Author } from "../models/author.model";
import { Book } from "../models/book.model";
import { BookCollection } from "../models/bookCollection.model";

export class BookCollectionService {
    public static async getAllBookCollections(): Promise<BookCollection[]> {
        return BookCollection.findAll({
            include: [{ model: Book, as: 'book' }]
        });
    }

    public static async getBookCollectionById(id: number): Promise<BookCollection | null> {
        return BookCollection.findByPk(id, {
            include: [{ model: Book, as: 'book' }]
        });
    }

    public static async createBookCollection(book_id: number, available: boolean, state: string): Promise<BookCollection> {
        return BookCollection.create({ book_id, available, state });
    }

    public static async deleteBookCollection(id: number): Promise<void> {
        const bookCollection = await BookCollection.findByPk(id);
        if (!bookCollection) {
            throw new Error("BookCollection not found");
        }
        await bookCollection.destroy();
    }
}