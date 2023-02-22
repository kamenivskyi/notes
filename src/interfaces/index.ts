export interface INote {
  note: string;
  docId?: string;
  todos: ITodo[];
  timestamp?: Date;
}

export interface ITodo {
  id: string;
  title: string;
  docId?: string;
}
