import { useState, useEffect, useReducer } from 'react';
import { db } from '../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';

const initialState = {
    loading: null,
    error: null,
}

const deleteReducer = (state, action) => {
    //criar casos switch, para caso de loading, inserção e erro
    switch (action.type) {
        case 'LOADING':
            return { loading: true, error: null };
        case 'DELETED_DOC':
            return { loading: false, error: null };
        case 'ERROR':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const useDeleteDocument = (docCollection) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState); // response = {loading: null, error: null}

    // Deal with memory leak (N tendi n)
    const [cancelled, setCancelled] = useState(false);

    const checkCancelledBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    }

    const deleteDocument = async (id) => {

        checkCancelledBeforeDispatch({
            type: "LOADING",
        });

        try {
            const deletedDocument = await deleteDoc(doc(db, docCollection, id))

            checkCancelledBeforeDispatch({
                type: "DELETED_DOC",
                payload: deletedDocument
            });

        } catch (error) {
            checkCancelledBeforeDispatch({
                type: 'ERROR',
                payload: error.message,
            });
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []); // [] = run only once 

    return { deleteDocument, response, setCancelled };
}