import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs, DocumentData } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Brand, Product } from '../types';

export const createDocument = async <T extends DocumentData>(
  collectionName: string,
  data: Omit<T, 'id'>
): Promise<string> => {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef.id;
};

export const updateDocument = async <T extends DocumentData>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  await updateDoc(doc(db, collectionName, id), data);
};

export const deleteDocument = async (
  collectionName: string,
  id: string
): Promise<void> => {
  await deleteDoc(doc(db, collectionName, id));
};

export const getUserDocuments = async <T extends DocumentData>(
  collectionName: string,
  userId: string
): Promise<T[]> => {
  const q = query(collection(db, collectionName), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T);
};