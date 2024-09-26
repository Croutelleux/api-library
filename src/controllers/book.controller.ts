import { Controller, Get, Route, Tags, Post, Body, Patch, Path } from "tsoa";
import { BookDTO } from "../dto/book.dto";
import { bookService } from "../services/book.service";

@Route("books")
@Tags("Books")
export class BookController extends Controller {
  @Get("/")
  public async getAllBooks(): Promise<BookDTO[]> {
    return bookService.getAllBooks();
  }

  @Get("{id}")
  public async getAuthorById(@Get() id: number): Promise<BookDTO | null> {
    const book = await bookService.getBookById(id);

    if(!book){
      const error = new Error('Book not found');
      (error as any).status = 404;
      throw error;
    }
    return book;
  }

  @Post("/")
  public async createBook(
    @Body() requestBody: BookDTO
  ): Promise<BookDTO | null> {
    const { title, publish_year, isbn, author} = requestBody;
if (!author || !author.id){
  throw new Error("ID auteur requis");
}

    return bookService.createBook(title, publish_year, isbn, author.id!);
  }


  @Patch("{id}")
  public async updateBook(
    @Path() id: number,
    @Body() requestBody: BookDTO
  ): Promise<BookDTO | null> {
    const { title, publish_year, isbn, author } = requestBody;
    if (!author || !author.id){
      throw new Error("ID auteur requis");
    }
    return bookService.updateBook(id, title,publish_year,isbn, author.id);
  }
}