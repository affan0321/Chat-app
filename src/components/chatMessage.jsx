import React from 'react';
import { getAuth } from 'firebase/auth';

const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message;
  const auth = getAuth();
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      {/* <img src={photoURL} alt="" /> */}
      <p>{text}</p>
    </div>
  );
};

export default ChatMessage;
