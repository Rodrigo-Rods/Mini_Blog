import './App.css';

// Importar coisas do React Router Dom
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth'; // Mapeia se a autenticação foi feita com sucesso ou não

//Hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

// Context de autenticação
import { AuthProvider } from './context/AuthContext';

//Pages (Dentro do Routes)
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import EditPost from './pages/EditPost/EditPost';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';


function App() {
  // Logicar para verificar se o usuário está logado ou não
  const [user, setUser] = useState(undefined); // Estado do usuário
  const { auth } = useAuthentication();

  const loadingUser = user === undefined; // Estado para verificar se o usuário está carregando

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user); // Se o usuário estiver logado, setUser recebe o usuário, se não setUser recebe undefined 
      console.log(`O Usuário está: ${auth.currentUser ? 'ON 😄' : 'OFF 😞'}`);
    });

  }, [auth]);

  if (loadingUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className='App'>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to='/' />} />
              <Route path="/posts/edit/:id" element={user ? <EditPost /> : <Navigate to='/login' />} />
              <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to='/login' />} />
              <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/login' />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;