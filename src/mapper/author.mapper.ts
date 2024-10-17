import { AuthorOutputDTO } from "../dto/author.dto";
import { Author } from "../models/author.model";

export class AuthorMapper {
  public static toOutputDto(author: Author): AuthorOutputDTO {
    return {
      id: author.id,
      first_name: author.first_name,
      last_name: author.last_name,
    };
  }

  public static toOutputDtoList(authorList: Author[]): AuthorOutputDTO[] {
    return authorList.map((author) => AuthorMapper.toOutputDto(author));
  }
}
