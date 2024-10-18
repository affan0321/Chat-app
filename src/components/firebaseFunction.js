import { collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
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
