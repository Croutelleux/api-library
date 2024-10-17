import {
  BookCollectionOutputDTO,
  getStateFromInteger,
} from "../dto/bookCollection.dto";
import { BookCollection } from "../models/bookCollection.model";
import { bookService } from "../services/book.service";

export class BookCollectionMapper {
  public static async toOutputDto(
    bookCollection: BookCollection,
  ): Promise<BookCollectionOutputDTO> {
    let bookCollectionDto: BookCollectionOutputDTO = {
      id: bookCollection.id,
      book: bookCollection.book,
      available: bookCollection.available,
      state: getStateFromInteger(bookCollection.state),
    };

    if (bookCollectionDto.book === undefined) {
      bookCollectionDto.book = await bookService.getBookById(
        bookCollection.book_id,
      );
    }

    return bookCollectionDto;
  }

  public static async toOutputDtoList(
    bookCollectionList: BookCollection[],
  ): Promise<BookCollectionOutputDTO[]> {
    let bookCollectionDtoList: BookCollectionOutputDTO[] = [];
    for (let bookCollection of bookCollectionList) {
      bookCollectionDtoList.push(
        await BookCollectionMapper.toOutputDto(bookCollection),
      );
    }

    return bookCollectionDtoList;
  }
}
