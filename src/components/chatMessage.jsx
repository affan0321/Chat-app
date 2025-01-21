import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import './ChatMessage.css';

const ChatMessage = (props) => {
  const { text, uid, id } = props.message;
  const auth = getAuth();
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  const [showContextMenu, setShowContextMenu] = useState(false);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setShowContextMenu(!showContextMenu);
  };

  const handleDelete = () => {
    props.onDelete(id); 
    setShowContextMenu(false);
  };

  return (
    <div className={`message ${messageClass}`} onContextMenu={handleContextMenu}>
      <p>{text}</p>
      {showContextMenu && (
        <div className="context-menu">
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
