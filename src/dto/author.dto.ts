export interface AuthorInputDTO {
  first_name: string;
  last_name: string;
}

export interface AuthorInputPatchDTO {
  first_name?: string;
  last_name?: string;
}

export interface AuthorOutputDTO {
  id: number;
  first_name: string;
  last_name: string;
}
