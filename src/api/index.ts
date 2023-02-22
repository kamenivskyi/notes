import { NOTES_COLLECTION_NAME } from "@/constants";
import { db } from "@/firebase/firebaseConfig";
import type { INote } from "@/interfaces";
import { transformQuerySnapshotToItems } from "@/utils";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";

export async function getAllNotes() {
  try {
    const q = query(
      collection(db, NOTES_COLLECTION_NAME),
      orderBy("timestamp")
    );
    const querySnapshot = await getDocs(q);

    return transformQuerySnapshotToItems(querySnapshot);
  } catch (error) {
    console.log("Error: ", error);
    return [];
  }
}

export async function removeFirebaseNoteDocument(noteId: string) {
  return await deleteDoc(doc(db, NOTES_COLLECTION_NAME, noteId));
}

export async function getNoteData(noteId: string) {
  try {
    const noteRef = doc(db, NOTES_COLLECTION_NAME, noteId);
    const data = (await getDoc(noteRef)).data();

    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function saveChanges(noteId: string, dataToSave: INote) {
  const docRef = doc(db, NOTES_COLLECTION_NAME, noteId);
  return await setDoc(docRef, dataToSave, { merge: true });
}
