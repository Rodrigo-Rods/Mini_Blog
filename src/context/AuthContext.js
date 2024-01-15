import { useContext, createContext } from "react";

const AuthContext = createContext(); // Criando o contexto 


export const AuthProvider = ({ children, value }) => { // Criando o provider
    // console.log('AuthProvider value:', value);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>

    )
};

export function useAuthValue() { // Criando o hook para usar o contexto
    return useContext(AuthContext);
};
