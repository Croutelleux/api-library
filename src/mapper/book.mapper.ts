import { BookOutputDTO } from "../dto/book.dto";
import { Book } from "../models/book.model";
import { authorService } from "../services/author.service";

export class BookMapper {
  public static async toOutputDto(book: Book): Promise<BookOutputDTO> {
    let bookDto: BookOutputDTO = {
      id: book.id,
      title: book.title,
      publish_year: book.publish_year,
      isbn: book.isbn,
      author: book.author,
    };

    if (bookDto.author === undefined) {
      bookDto.author = await authorService.getAuthorById(book.author_id);
    }

    return bookDto;
  }

  public static async toOutputDtoList(
    bookList: Book[],
  ): Promise<BookOutputDTO[]> {
    let bookListDto: BookOutputDTO[] = [];

    for (let book of bookList) {
      let bookDto = await BookMapper.toOutputDto(book);
      bookListDto.push(bookDto);
    }

    return bookListDto;
  }
}
