import { BookDTO } from "./book.dto";

export interface BookCollectionDTO {
    id?: number;
    book_id: number;
    avaible:boolean;
    state:number;
}