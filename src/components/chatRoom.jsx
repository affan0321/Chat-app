import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './chatMessage';
import { getMessages, sendMessage, deleteMessage } from './firebaseFunction';
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

  const deleteMessageHandler = async (id) => {
    try {
      await deleteMessage(id);
      console.log('Message deleted successfully:', id);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div>
      <main>
        {messages &&
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onDelete={deleteMessageHandler}
            />
          ))}
      </main>
      <form onSubmit={sendMessageHandler}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder={isBlocked ? "You cannot message this user." : "Say something nice"}
          disabled={isBlocked}
        />
        <button type="submit" disabled={!formValue || isBlocked}>
          Send
        </button>
        <button
          className="block"
          type="button"
          onClick={() => setIsBlocked(!isBlocked)}
        >
          {isBlocked ? 'Unblock' : 'Block'}
        </button>
      </form>
    </div>
  );
};

export default Chatroom;

