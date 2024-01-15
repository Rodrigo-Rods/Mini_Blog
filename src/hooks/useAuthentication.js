// Chora menos Firebase
import { db } from "../firebase/config"

import {
    getAuth, // Obter a instância do serviço de autenticação
    createUserWithEmailAndPassword, // Criar usuário com e-mail e senha
    signInWithEmailAndPassword, // Entrar com e-mail e senha
    updateProfile, // Atualizar o perfil do usuário
    signOut, // Sair da aplicação
} from "firebase/auth";

import { useState, useEffect } from 'react';


export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //Cleanups functions, para evitar memory leaks e otimizar a performance da aplicação
    const [cancelled, setCancelled] = useState(false); // Estado para verificar se o componente foi desmontado

    const auth = getAuth(); // Serve para obter a instância do serviço de autenticação

    function checkIfCancelled() { // Função para verificar se o componente foi desmontado/cancelado
        if (cancelled) {
            return
        }
    }

    // Função para fazer login
    const createUser = async (data) => { // Função para criar um novo usuário
        checkIfCancelled()
        setLoading(true) // Se Cancelled, Inicia o estado de loading 
        setError(null)

        try { // Criando um novo usuário com e-mail e senha
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            await updateProfile(user, { // Atualizando o perfil do usuário
                displayName: data.displayName
            });

            setLoading(false);

            return user;
        } catch (error) { // Console.log dos erros (Verificando mensagens e tipos de erros)
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage = '' // Variável para armazenar a mensagem de erro e ser usada no setError (Texto em vermelho em baixo do formulário de cadastro)

            if (error.message.includes('password')) {
                systemErrorMessage = 'A senha deve ter pelo menos 6 caracteres, tente novamente'
            } else if (error.message.includes('email.already')) {
                systemErrorMessage = 'O email deve ser válido, tente novamente'
            } else if (error.message.includes('already')) {
                systemErrorMessage = 'O email já está em uso, tente novamente ou faça login'
            } else {
                systemErrorMessage = 'Algo deu errado, tente novamente'
            }
            setLoading(false);
            setError(systemErrorMessage) // Setando a mensagem de erro

        };

    };
    // Logout do usuário
    const logout = () => {
        checkIfCancelled()
        signOut(auth)
    }

    // Login do usuário
    const login = async (data) => {

        checkIfCancelled()

        setLoading(true)
        setError(false)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)

        } catch (error) {

            let systemErrorMessage;

            if (error.message.includes('user-not-found')) {
                systemErrorMessage = 'O usuário inválido, tente novamente'
            } else if (error.message.includes('wrong-password')) {
                systemErrorMessage = 'A senha está incorreta, tente novamente'
            } else {
                systemErrorMessage = 'Algo deu errado, tente novamente mais tarde'
            }
            setError(systemErrorMessage)
            setLoading(false)
        }
    }


    // Colocar o cancelled como true quando sair da pagina
    useEffect(() => {
        return () =>
            setCancelled(true);
    }, []
    );
    return { // Retornando os estados e funções para serem usados em outros componentes 
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    }
}
