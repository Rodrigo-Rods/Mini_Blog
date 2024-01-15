import styles from './Register.module.css'; // Importando o CSS do Register.module.css

import { useState, useEffect } from 'react';

import { useAuthentication } from '../../hooks/useAuthentication'; // Importando o hook de autenticação

const Register = () => {
	// Criando os estados para os campos do formulário
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');

	const { createUser, error: authError, loading } = useAuthentication();


	// Submetendo os dados do formulário
	const handleSubmit = async (e) => {
		e.preventDefault(); // Evitando o comportamento padrão do formulário

		setError(''); // Limpando a mensagem de erro

		const user = { // Criando o objeto com os dados do formulário
			displayName,
			email,
			password,
		}
		//Validando os campos do formulário
		if (password !== confirmPassword) { // Verificando se as senhas são iguais
			setError('As senhas não são iguais');
			return;
		}
		const res = await createUser(user);

		// Console.log para verificar se os dados estão sendo enviados
		//console.log(user);
		//console.log(res);
	};
	// Serve para mapear se o setError mudou
	useEffect(() => {
		if (authError) {
			setError(authError);
		}
	}, [authError]);

	return (
		<div className={styles.register}>
			<h2>Cadastre-se para postar</h2>
			<p>Crie sua conta e compartilhe suas histórias</p>
			{/* Estrutura do formulário de cadastro */}
			<form onSubmit={handleSubmit}>
				<label>
					<span>Nome: </span>
					<input type="text"
						name="displayName"
						required
						placeholder='Nome de Usuário'
						value={displayName}
						onChange={(e) => setDisplayName(e.target.value)} />

				</label>
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
				<label>
					<span>Confirmação sua senha: </span>
					<input type="password"
						name="confirmPassword"
						required
						placeholder='Confirme sua senha'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)} />
				</label>
				{!loading && <button className='btn'>Cadastrar</button>}
				{loading && <button className='btn' disabled>Cadastrando...</button>}
				{/* Exibindo a mensagem de erro abaixo do formulário */}
				{error && <p className='error'>{error}</p>}
			</form>
		</div>
	)
}

export default Register