// Usado para criar um link para outra pagina
import { NavLink } from "react-router-dom"

import { useAuthentication } from '../hooks/useAuthentication'; // Importando o hook de autenticação

import { useAuthValue } from "../context/AuthContext";

//Importando o CSS do Navbar.module.css
import styles from './Navbar.module.css';


const Navbar = () => {
  const { user } = useAuthValue(); // Pegando o usuário do AuthContext
  const { logout } = useAuthentication(); // Importando função logout

  // console.log(user, 'user', useAuthValue())

  return (
    <nav className={styles.navbar}>
      {/* Link para a Home/Logo do MiniBlog*/}
      <NavLink to="/" className={styles.brand}>
        Mini <span>BLOG</span>
      </NavLink>
      <ul className={styles.link_list}>
        <li>
          {/* Link para a pagina Home */}
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
            Home
          </NavLink>
        </li>
        {!user && ( // <--- Ta se comportando ao contrario do que deveria (Verificar)
          <>
            <li>
              {/* Link para a pagina Login */}
              <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : '')}>
                Login
              </NavLink>
            </li>
            <li>
              {/* Link para a pagina de register/cadastro */}
              <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : '')}>
                Cadastro
              </NavLink>
            </li>
          </>
        )}
        {user && ( // <--- Ta se comportando ao contrario do que deveria (Verificar)
          <>
            <li>
              {/* Link para a pagina de Criação de Posts */}
              <NavLink to="/posts/create" className={({ isActive }) => (isActive ? styles.active : '')}>
                Postar
              </NavLink>
            </li>
            <li>
              {/* Link para a pagina Dashboard */}
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : '')}>
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          {/* Link para a pagina About/Sobre */}
          <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : '')}>
            Sobre
          </NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout} >
              Sair
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar