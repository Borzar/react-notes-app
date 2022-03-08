import React from 'react';
import { Col, Container, Stack, Row, Button } from 'react-bootstrap';
import { firebaseApp } from '../firebase';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
const firestore = getFirestore(firebaseApp);

const ListNotes = ({ arrayNotes, userEmail, setArrayNotes }) => {
  const deleteNote = async (idNoteDelete) => {
    // crear nuevo array de notas
    const newArrayNotes = arrayNotes.filter(
      (objNote) => objNote.id !== idNoteDelete
    );
    // actualizar base de datos
    const documentRef = doc(firestore, `users/${userEmail}`);
    updateDoc(documentRef, { notes: [...newArrayNotes] });
    //actualizar state
    setArrayNotes(newArrayNotes);
  };

  return (
    <Container>
      <Stack>
        {arrayNotes.map((objNote) => {
          return (
            <>
              <Row>
                <Col>{objNote.description}</Col>

                <Col>
                  <Button
                    variant="danger"
                    onClick={() => deleteNote(objNote.id)}
                    size="sm"
                  >
                    Eliminar Nota
                  </Button>
                </Col>
              </Row>
              <hr />
            </>
          );
        })}
      </Stack>
    </Container>
  );
};

export default ListNotes;
