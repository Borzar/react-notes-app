import React, { useState, useEffect } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import { firebaseApp } from '../firebase';
import ListNotes from './ListNotes';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

const firestore = getFirestore(firebaseApp);

export default function NewNote({ userEmail }) {
  const [arrayNotes, setArrayNotes] = useState(null);

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

  useEffect(() => {
    async function fetchNotes() {
      const notesFechadas = await searchDocumentOrCreateDocument(userEmail);
      setArrayNotes(notesFechadas);
    }
    fetchNotes();
  }, []);

  async function addNote(e) {
    e.preventDefault();
    const description = e.target.formDescription.value;
    //crear nuevo arrray de notas
    const newArrayNotes = [
      ...arrayNotes,
      {
        id: +new Date(),
        description: description,
      },
    ];
    //actualizar base de datos
    const docuRef = doc(firestore, `users/${userEmail}`);
    updateDoc(docuRef, { notes: [...newArrayNotes] });
    //actualizar estado
    setArrayNotes(newArrayNotes);
    // limpiar buscador
    e.target.formDescription.value = '';
  }

  return (
    <Container>
      <h5 className="my-4">Mis Notas</h5>
      <Form onSubmit={addNote}>
        <Row className="mb-5">
          <Col>
            <Form.Control
              as="textarea"
              type="text"
              rows={6}
              placeholder="Describe tu nota"
              id="formDescription"
            />
          </Col>

          <Col>
            <Button type="submit" size="sm">
              Agregar Nota
            </Button>
          </Col>
        </Row>
      </Form>
      <hr />
      <Row>
        {arrayNotes ? (
          <ListNotes
            arrayNotes={arrayNotes}
            setArrayNotes={setArrayNotes}
            userEmail={userEmail}
          />
        ) : null}
      </Row>
    </Container>
  );
}
