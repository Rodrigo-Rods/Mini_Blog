import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {

    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // Memorie Leak <- Ainda não entendi muito bem o que é isso e como funciona 
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        async function loadDocument() {
            if (cancelled) return;

            setLoading(true);

            try {

                const docRef = await doc(db, docCollection, id);
                const docSnap = await getDoc(docRef); // metodo getDoc e passar o docRef como referencia
                setDocument(docSnap.data());
                setLoading(false);
            } catch (error) {
                console.log(error)
                setError(error.message);
                setLoading(true);
            }
        }
        loadDocument();
    }, [docCollection, id, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, [])
    return { document, loading, error };
}

