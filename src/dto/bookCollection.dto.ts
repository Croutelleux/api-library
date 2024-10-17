import { BookOutputDTO } from "./book.dto";

export enum State {
  INUTILISABLE = "Inutilisable",
  MAUVAIS = "Mauvais",
  PASSABLE = "Passable",
  BON = "Bon",
  TRES_BON = "Très bon",
  NEUF = "Neuf",
}

export function getStateFromInteger(value: number): State {
  switch (value) {
    case 0:
      return State.INUTILISABLE;
    case 1:
      return State.MAUVAIS;
    case 2:
      return State.PASSABLE;
    case 3:
      return State.BON;
    case 4:
      return State.TRES_BON;
    case 5:
      return State.NEUF;
    default:
      const error = new Error("State out of range");
      (error as any).status = 412;
      throw error;
  }
}

export function getIntegerFromState(value: State): number {
  switch (value) {
    case State.INUTILISABLE:
      return 0;
    case State.MAUVAIS:
      return 1;
    case State.PASSABLE:
      return 2;
    case State.BON:
      return 3;
    case State.TRES_BON:
      return 4;
    case State.NEUF:
      return 5;
  }
}

export interface BookCollectionInputDTO {
  book_id: number;
  available: number;
  state: State;
}

export interface BookCollectionInputPatchDTO {
  book_id?: number;
  available?: number;
  state?: State;
}

export interface BookCollectionOutputDTO {
  id: number;
  book: BookOutputDTO;
  available: number;
  state: State;
}
