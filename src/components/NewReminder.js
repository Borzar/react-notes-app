import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import React, {} from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { firebaseApp } from '../firebase';

const firestore = getFirestore(firebaseApp);



export default function NewReminder ({userEmail, arrayReminder, setArrayReminder}) {
   

    const addReminder = async (e) => {
        // e = es el objeto que representa el evento
        // target = es el elemento que recibe el objeto
        e.preventDefault();
        const reminderDesc = e.target.idReminder.value;
        const date = e.target.idDate.value;
        //crear nuevo array de recordatorios
        const newArrayReminder = [...arrayReminder, {
            id: +new Date(),
            reminderDesc: reminderDesc,
            date: date,

        },
    ];  
        //actualizar base de datos
        const docuRef = doc(firestore, `users/${userEmail}`);
        updateDoc(docuRef, { reminder: [...newArrayReminder]});
        //actualizar el estado
        setArrayReminder(newArrayReminder);
        //limpiar buscador
        e.target.idReminder.value = "";
        e.target.idDate.value = "";
        
    }   


    return (
        <Container>
            <Form onSubmit={addReminder}>
                <Row className='mb-5' >
                    <Col>
                        <Form.Control type='text' placeholder='Escribe tu recordatorio' id='idReminder' />
                    </Col>
                    <Col>
                        <Form.Control type='date' id='idDate' />
                    </Col>  
                    
                    <Col>
                        <Button type='submit'>Agregar recordatorio</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
            
       
    );
}