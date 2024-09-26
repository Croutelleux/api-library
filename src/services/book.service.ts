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

  public async updateBook(
    id: number,
    title?: string,
    publish_year?: number,
    isbn?: string,
    author_id?: number
  ): Promise<Book | null> {
    const book = await Book.findByPk(id);
    if (!await Author.findByPk(author_id)) {
      throw new Error("L'auteur n'existe pas.");
    }
    if (!await Author.findByPk(id)) {
      throw new Error("Le livre n'existe pas.");
    }
    if (book) {
      if (title) book.title = title;
      if (publish_year) book.publish_year = publish_year;
      if (isbn) book.isbn = isbn;
      if (author_id) book.author_id = author_id;
      await book.save();
      return book;
    }
    return null;
  }

}

export const bookService = new BookService();
