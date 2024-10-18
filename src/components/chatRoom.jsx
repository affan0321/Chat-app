import { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './chatMessage';
import { getMessages,sendMessage } from './firebaseFunction';
import { auth } from './firebase';
const Chatroom = () => {
  const [formValue, setFormValue] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const messagesQuery = getMessages();
  const [messages] = useCollectionData(messagesQuery, { idField: 'id' });

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (isBlocked) {
      console.error("You cannot message this user.");
      return;
    }

    if (!auth.currentUser) {
      console.error("No authenticated user.");
      return;
    }

    const { uid, photoURL } = auth.currentUser;
    await sendMessage(formValue, uid, photoURL);

    setFormValue('');
  };

  return (
    <div>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </main>
      <form onSubmit={sendMessageHandler}>
        <input 
          value={formValue} 
          onChange={(e) => setFormValue(e.target.value)} 
          placeholder={isBlocked ? "You cannot message this user." : "Say something nice"} 
          disabled={isBlocked}
        />
        <button type="submit">Send</button>
        <button className='block' type="button" onClick={() => setIsBlocked(!isBlocked)}>
          {isBlocked ? 'Unblock' : 'Block'}
        </button>
      </form>
    </div>
  );
};

export default Chatroom;


