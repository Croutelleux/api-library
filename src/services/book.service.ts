import { Author } from "../models/author.model";
import { Book } from "../models/book.model";

export class BookService {
  public async getAllBooks(): Promise<Book[]> {
    return Book.findAll({
        include: [{
            model: Author,
            as: 'author'
        }]
    });
  }

  public async getBookById(id: number): Promise<Book | null> {
    return Book.findByPk(id);
  }


  public async createBook(
    title: string,
    publish_year: number,
    isbn: string,
    author_id: number
  ): Promise<Book> {
    if (!await Author.findByPk(author_id)) {
      throw new Error("L'auteur n'existe pas.");
    }
    return Book.create({title, publish_year, isbn, author_id});
  }


}

export const bookService = new BookService();
