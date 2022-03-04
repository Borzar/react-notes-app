import React, { useState, useEffect } from 'react';
import { firebaseApp } from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { Container, Button } from 'react-bootstrap';
import NewNote from './NewNote';
import ListNotes from './ListNotes';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import NewReminder from './NewReminder';
import ListReminders from './ListReminders';
import '../App.css';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({ userEmail }) => {
  const [arrayNotes, setArrayNotes] = useState(null);
  const [arrayReminder, setArrayReminder] = useState(null);

  const fakedata = [
    {
      id: 1,
      description: 'nota de prueba 1',
      url: 'https://picsum.photos/420',
    },
    {
      id: 2,
      description: 'nota de prueba 2',
      url: 'https://picsum.photos/420',
    },
    {
      id: 3,
      description: 'nota de prueba 3',
      url: 'https://picsum.photos/420',
    },
  ];

  const fakeDataReminders = [
    { id: 4, reminderDesc: 'recordatorio de prueba 1' },
    { id: 5, reminderDesc: 'recordatorio de prueba 2' },
    { id: 6, reminderDesc: 'recordatorio de prueba 3' },
  ];

  async function searchDocumentOrCreateDocument(idDocument) {
    //crear una referencia al docmento
    const docuRef = doc(firestore, `users/${idDocument}`);
    //buscar documento
    const consulting = await getDoc(docuRef);
    // revisar si existe
    if (consulting.exists()) {
      // si si existe
      const infoDocu = consulting.data();
      return infoDocu.notes;
    } else {
      // si no existe
      await setDoc(docuRef, { notes: [...fakedata] });
      const consulting = await getDoc(docuRef);
      const infoDocu = consulting.data();
      return infoDocu.notes;
    }
  }

  async function searchDocumentOrCreateDocumentReminder(idDocument) {
    //crear una referencia al docmento
    const documentRef = doc(firestore, `users/${idDocument}`);
    //buscar documento
    const consulting = await getDoc(documentRef);
    // revisar si existe
    if (consulting.exists()) {
      // si si existe
      const infoDocument = consulting.data();
      return infoDocument.reminder;
    } else {
      // si no existe
      await setDoc(documentRef, { reminder: [...fakeDataReminders] });
      const consulting = await getDoc(documentRef);
      const infoDocument = consulting.data();
      return infoDocument.reminder;
    }
  }

  useEffect(() => {
    async function fetchNotes() {
      const notesFechadas = await searchDocumentOrCreateDocument(userEmail);
      setArrayNotes(notesFechadas);
    }
    fetchNotes();
  }, []);

  useEffect(() => {
    async function fetchReminders() {
      const reminderFetch = await searchDocumentOrCreateDocumentReminder(
        userEmail
      );
      setArrayReminder(reminderFetch);
    }
    fetchReminders();
  }, []);

  return (
    <Container>
      <h4>Hola, {userEmail}</h4>
      <Button onClick={() => signOut(auth)}>Cerrar sesion </Button>
      <hr />

      <NewNote
        arrayNotes={arrayNotes}
        setArrayNotes={setArrayNotes}
        userEmail={userEmail}
      />

      {arrayNotes ? (
        <ListNotes
          arrayNotes={arrayNotes}
          setArrayNotes={setArrayNotes}
          userEmail={userEmail}
        />
      ) : null}

      <NewReminder
        arrayReminder={arrayReminder}
        setArrayReminder={setArrayReminder}
        userEmail={userEmail}
      />
      {arrayReminder ? (
        <ListReminders
          arrayReminder={arrayReminder}
          setArrayReminder={setArrayReminder}
          userEmail={userEmail}
        />
      ) : null}
    </Container>
  );
};

export default Home;
