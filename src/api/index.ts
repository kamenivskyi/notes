import { NOTES_COLLECTION_NAME } from "@/constants";
import { db } from "@/firebase/firebaseConfig";
import { transformQuerySnapshotToItems } from "@/utils";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
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
