import {
  getFirestore,
  updateDoc,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { firebaseApp } from '../firebase';
import ListReminders from './ListReminders';

const firestore = getFirestore(firebaseApp);

export default function NewReminder({ userEmail }) {
  const [arrayReminder, setArrayReminder] = useState(null);

  const fakeDataReminders = [
    { id: 4, reminderDesc: 'recordatorio de prueba 1' },
    { id: 5, reminderDesc: 'recordatorio de prueba 2' },
    { id: 6, reminderDesc: 'recordatorio de prueba 3' },
  ];

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
    async function fetchReminders() {
      const reminderFetch = await searchDocumentOrCreateDocumentReminder(
        userEmail
      );
      setArrayReminder(reminderFetch);
    }
    fetchReminders();
  }, []);

  const addReminder = async (e) => {
    // e = es el objeto que representa el evento
    // target = es el elemento que recibe el objeto
    e.preventDefault();
    const reminderDesc = e.target.idReminder.value;
    const date = e.target.idDate.value;
    //crear nuevo array de recordatorios
    const newArrayReminder = [
      ...arrayReminder,
      {
        id: +new Date(),
        reminderDesc: reminderDesc,
        date: date,
      },
    ];
    //actualizar base de datos
    const docuRef = doc(firestore, `users/${userEmail}`);
    updateDoc(docuRef, { reminder: [...newArrayReminder] });
    //actualizar el estado
    setArrayReminder(newArrayReminder);
    //limpiar buscador
    e.target.idReminder.value = '';
    e.target.idDate.value = '';
  };

  return (
    <Container>
      <h5 className="my-4">Mis Recordatorios</h5>
      <Form onSubmit={addReminder}>
        <Row className="mb-5">
          <Col>
            <Form.Control
              type="text"
              placeholder="Escribe tu recordatorio"
              id="idReminder"
            />
          </Col>
          <Col>
            <Form.Control type="date" id="idDate" />
          </Col>

          <Col>
            <Button type="submit" size="sm">
              Agregar recordatorio
            </Button>
          </Col>
        </Row>
      </Form>
      <hr />
      <Row>
        {arrayReminder ? (
          <ListReminders
            arrayReminder={arrayReminder}
            setArrayReminder={setArrayReminder}
            userEmail={userEmail}
          />
        ) : null}
      </Row>
    </Container>
  );
}
