import { initializeApp } from "firebase/app"; // Importa a função que você precisa do SDK que você precisa
import { getFirestore } from "firebase/firestore";

// Configurações do aplicativo da Web do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCj9H7H9M7-iA_uIMDH-Tn6XYF3K3uUG2c",
  authDomain: "mini--blog.firebaseapp.com",
  projectId: "mini--blog",
  storageBucket: "mini--blog.appspot.com",
  messagingSenderId: "48190654530",
  appId: "1:48190654530:web:3d2a03a6891068ab3045db"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app); // Instância do banco de dados

export { db } // Exportando o banco de dados