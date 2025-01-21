import { collection, query, orderBy, limit, addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';
import { firestore } from './firebase';

export const getMessages = () => {
  const messageRef = collection(firestore, 'messages');
  return query(messageRef, orderBy('createdAt'), limit(25));
};

export const sendMessage = async (text, uid, photoURL) => {
  const messageRef = collection(firestore, 'messages');
  await addDoc(messageRef, {
    text,
    createdAt: serverTimestamp(),
    uid,
    photoURL,
  });
};

export const deleteMessage = async (id) => {
  const messageRef = doc(firestore, 'messages', id);
  await deleteDoc(messageRef);
};






