export interface ICard {
  id: string;
  title: string;
  description: string;
}

export interface IList {
  id: string;
  title: string;
  cards: ICard[];
}

export interface IBoard {
  [id: string]: IList;
}
