import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './components/firebase';
import SignIn from './components/signIn';
import SignOut from './components/signOut';
// import Chatroom from './components/chatRoom';
import Chatroom from './components/chatRoom';


// Main App Component
function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>Chat App</h1>
        <SignOut />
      </header>
      <section>
        {user ? <Chatroom /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
