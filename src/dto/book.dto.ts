import { AuthorOutputDTO } from "./author.dto";

export interface BookInputDTO {
  title: string;
  publish_year: number;
  author_id: number;
  isbn: string;
}

export interface BookInputPatchDTO {
  title?: string;
  publish_year?: number;
  author_id?: number;
  isbn?: string;
}

export interface BookOutputDTO {
  id: number;
  title: string;
  publish_year: number;
  isbn: string;
  author: AuthorOutputDTO;
}
