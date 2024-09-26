import {Controller, Get, Route, Tags, Post, Body, Path, Delete} from "tsoa";
import { BookCollectionDTO } from "../dto/bookCollection.dto";
import { BookCollectionService } from "../services/bookCollection.service";

@Route("bookCollections")
@Tags("BookCollections")
export class BookCollectionController extends Controller {
    @Get("/")
    public async getAllBookCollections(): Promise<BookCollectionDTO[]> {
        return BookCollectionService.getAllBookCollections();
    }

    @Get("{id}")
    public async getBookCollectionById(@Path() id: number): Promise<BookCollectionDTO | null> {
        const bookCollection = await BookCollectionService.getBookCollectionById(id);
        if (!bookCollection) {
            this.setStatus(404);
            return null;
        }
        return bookCollection;
    }

    @Post("/")
    public async createBookCollection(@Body() requestBody: BookCollectionDTO): Promise<BookCollectionDTO> {
        return new Promise(async (resolve, reject) => {
            const { book_id, available, state } = requestBody;

            try {
                const createdBookCollection = await BookCollectionService.createBookCollection(book_id, available, state);
                resolve(createdBookCollection);
            } catch (error) {
                reject(error);
            }
        });
    }
    @Delete("{id}")
    public async deleteBookCollection(id: number): Promise<void> {
        if (!id) {
            const error = new Error("ID not found");
            (error as any).status = 400;
            throw error;
        }
        await BookCollectionService.deleteBookCollection(id);
    }
}