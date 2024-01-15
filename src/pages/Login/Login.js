// Importando o CSS do Login.module.css
import styles from './Login.module.css';
import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const Login = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const { login, error: authError, loading } = useAuthentication();

      const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            const user = {
                  email,
                  password,
            }
            const res = await login(user);
      };

      useEffect(() => {
            if (authError) {
                  setError(authError);
            }
      }, [authError]);

      return (
            <div className={styles.login}>
                  <h2>Acesse sua conta:</h2>
                  <p>Faça login para acessar o sistema</p>
                  <form onSubmit={handleSubmit}>
                        <label>
                              <span>Email: </span>
                              <input type="email"
                                    name="email"
                                    required
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label>
                              <span>Senha: </span>
                              <input type="password"
                                    name="password"
                                    required
                                    placeholder='Insira sua senha'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        {!loading && <button className='btn'>Entrar</button>}
                        {loading && <button className='btn' disabled>Acessando...</button>}
                        {error && <p className='error'>{error}</p>}
                  </form>
            </div>)
}

export default Login