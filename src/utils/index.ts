import type { INote } from "@/interfaces";
import { v4 as uuidv4 } from "uuid";
import {
  serverTimestamp,
  type DocumentData,
  type QuerySnapshot,
} from "firebase/firestore";

export const transformQuerySnapshotToItems = (
  snapshot: QuerySnapshot<DocumentData>
): any[] => {
  let items: INote[] = [];

  snapshot.forEach((doc: DocumentData) => {
    items.push({ ...doc.data(), docId: doc.id });
  });

  return items;
};

export function createTodo(title: string) {
  return {
    title,
    id: uuidv4(),
  };
}

export function createNote(title: string, docId: string) {
  return {
    note: title,
    docId,
    todos: [],
    timestamp: serverTimestamp(),
  };
}

export function getLimitedList(array: any[], limitTo: number = 2) {
  return array.slice(0, limitTo);
}
