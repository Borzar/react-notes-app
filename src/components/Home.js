import React, { useState, useEffect } from "react";
import { firebaseApp } from "../firebase";
import { getAuth, signOut } from "firebase/auth"
import { Container, Button } from "react-bootstrap";
import NewNote from './NewNote';
import ListNotes from "./ListNotes";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = (userEmail) => {

    const [arrayNotes, setArrayNotes] = useState(null);


    const fakedata = [
        { id: "01", description: "nota falsa1", url: "https://picsum.photos/420" },
        { id: "02", description: "nota falsa2", url: "https://picsum.photos/420" },
        { id: "03", description: "nota falsa3", url: "https://picsum.photos/420" },
    ];

    const searchDocumentOrCreateDocument = async (idDocument) => {
        //crear una referencia al docmento
        const documentRef = doc(firestore, `users/${idDocument}`);
        //revisar si existe
        const consulting = await getDoc(documentRef);
        // revisar si existe
        if (consulting.exists()) {
            // si si existe
            const infoDocu = consulting.data();
            return infoDocu.notes;
        } else {
            // si no existe
            await setDoc(documentRef, { notes: [...fakedata] })
            const consulting = await getDoc(documentRef);
            const infoDocu = consulting.data();
            return infoDocu.notes;
        }
    }

    useEffect(() => {
        async function fetchNotes() {
            const notesFechadas = await searchDocumentOrCreateDocument(
                userEmail
            );
            setArrayNotes(notesFechadas);
        }

        fetchNotes();
    }, [])


    return (
        <Container>
            <h4>Hola, Sesion inciada</h4>
            <Button onClick={() => signOut(auth)} >Cerrar sesion </Button>
            <hr />
            <NewNote
                arrayNotes={arrayNotes}
                setArrayNotes={setArrayNotes}
                userEmail={userEmail}
            />
            {
                arrayNotes ? (
                    <ListNotes
                        arrayNotes={arrayNotes}
                        setArrayNotes={setArrayNotes}
                        userEmail={userEmail}

                    />
                ) : null
            }
        </Container>
    )

}

export default Home;