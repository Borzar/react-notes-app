import { updateDoc, doc, getFirestore } from 'firebase/firestore';
import React from 'react';
import { firebaseApp } from '../firebase';
import { Col, Container, Stack, Row, Button } from 'react-bootstrap';

const firestore = getFirestore(firebaseApp);

const ListReminders = ({ userEmail, arrayReminder, setArrayReminder }) => {
  const deleteReminder = async (idDeleteReminder) => {
    // crear un nuevo array de recordatorios
    const newArrayReminders = arrayReminder.filter(
      (objReminder) => objReminder.id !== idDeleteReminder
    );

    //actualizar la base de datos
    const docuRef = doc(firestore, `users/${userEmail}`);
    updateDoc(docuRef, { reminder: [...newArrayReminders] });

    //actualizar state
    setArrayReminder(newArrayReminders);
  };

  return (
    <Container>
      <Stack>
        {arrayReminder.map((objReminder) => {
          return (
            <>
              <Row>
                <Col>My Reminder</Col>
                <Col>Date</Col>
                <Col></Col>
                <Row>
                  <Col>{objReminder.reminderDesc}</Col>
                  <Col>{objReminder.date}</Col>
                  <Col>
                    <Button
                      variant="danger"
                      onClick={() => deleteReminder(objReminder.id)}
                    >
                      Eliminar recordatorio
                    </Button>
                  </Col>
                </Row>
                <hr />
              </Row>
            </>
          );
        })}
      </Stack>
    </Container>
  );
};

export default ListReminders;
