import type { DocumentData, QuerySnapshot } from "firebase/firestore";

export const transformQuerySnapshotToItems = (
  snapshot: QuerySnapshot<DocumentData>
): any[] => {
  let items: any[] = [];

  snapshot.forEach((doc: DocumentData) => {
    items.push({ ...doc.data(), docId: doc.id });
  });

  return items;
};
