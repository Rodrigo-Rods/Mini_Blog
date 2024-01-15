import { useState, useEffect, useReducer } from 'react';
import { db } from '../firebase/config';
import { updateDoc, doc } from 'firebase/firestore';

const initialState = {
    loading: null,
    error: null,
}

const updateReducer = (state, action) => {
    //criar casos switch, para caso de loading, inserção e erro
    switch (action.type) {
        case 'LOADING':
            return { loading: true, error: null };
        case 'UPDATED_DOC':
            return { loading: false, error: null };
        case 'ERROR':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const useUpdateDocument = (docCollection) => {
    const [response, dispatch] = useReducer(updateReducer, initialState); // response = {loading: null, error: null}

    // Deal with memory leak (N tendi n)
    const [cancelled, setCancelled] = useState(false);

    const checkCancelledBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    }

    const updateDocument = async (id, data) => {

        checkCancelledBeforeDispatch({
            type: "LOADING",
        });

        try {
            const docRef = await doc(db, docCollection, id);

            const updatedDocument = await updateDoc(docRef, data)

            checkCancelledBeforeDispatch({
                type: "UPDATED_DOC",
                payload: updatedDocument,
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

    return { updateDocument, response, setCancelled };
}