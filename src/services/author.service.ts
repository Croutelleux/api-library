import { AuthorOutputDTO } from "../dto/author.dto";
import { BookOutputDTO } from "../dto/book.dto";
import { notFound } from "../error/NotFoundError";
import { AuthorMapper } from "../mapper/author.mapper";
import { BookMapper } from "../mapper/book.mapper";
import { Author } from "../models/author.model";
import { Book } from "../models/book.model";
import { BookCollection } from "../models/bookCollection.model";

export class AuthorService {
  readonly includeBooksBookColections = {
    include: [
      {
        model: Book,
        as: "books",
        include: [
          {
            model: BookCollection,
            as: "collections",
          },
        ],
      },
    ],
  };

  // Récupère tous les auteurs
  public async getAllAuthors(): Promise<AuthorOutputDTO[]> {
    let authorList = await Author.findAll();
    return AuthorMapper.toOutputDtoList(authorList);
  }

  // Récupère un auteur par ID
  public async getAuthorById(id: number): Promise<AuthorOutputDTO> {
    let author = await Author.findByPk(id);
    if (author) {
      return AuthorMapper.toOutputDto(author);
    } else {
      notFound("Author");
    }
  }

  // Crée un nouvel auteur
  public async createAuthor(
    firstName: string,
    lastName: string,
  ): Promise<AuthorOutputDTO> {
    return AuthorMapper.toOutputDto(
      await Author.create({ first_name: firstName, last_name: lastName }),
    );
  }

  // Supprime un auteur par ID
  public async deleteAuthor(id: number): Promise<void> {
    const author = await Author.findByPk(id, this.includeBooksBookColections);
    if (author) {
      if (author.books.length > 0) {
        let booksId: number[] = [];
        for (let book of author.books) {
          if (book.collections.length > 0) {
            const error = new Error(
              "Deletion of author " +
                id +
                " isn't possible due to presence of his.er books in library",
            );
            (error as any).status = 412;
            throw error;
          } else {
            booksId.push(book.id);
          }
        }
        Book.destroy({ where: { id: booksId } });
      }
      author.destroy();
    } else {
      notFound("Author");
    }
  }

  // Met à jour un auteur
  public async updateAuthor(
    id: number,
    firstName?: string,
    lastName?: string,
  ): Promise<AuthorOutputDTO> {
    const author = await Author.findByPk(id);
    if (author) {
      if (firstName) author.first_name = firstName;
      if (lastName) author.last_name = lastName;
      await author.save();
      return AuthorMapper.toOutputDto(author);
    } else {
      notFound("Author");
    }
  }

  public async getBooksByAuthorId(id: number): Promise<BookOutputDTO[]> {
    return BookMapper.toOutputDtoList(
      await Book.findAll({
        where: {
          author_id: id,
        },
      }),
    );
  }
}

export const authorService = new AuthorService();
