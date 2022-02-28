import React, { useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

export default function NewReminder () {
    const [reminder, setReminder] = useState(null);

    const addReminder = (e) => {
        // e = es el objeto que representa el evento
        // target = es el elemento que recibe el objeto
        e.preventDefault();
        const description = e.target.idReminder.value;
        console.log(description)
    } 


    return (
        <Container>
            <Form onSubmit={addReminder}>
                <Row className='mb-5' >
                    <Col>
                        <Form.Control type='text' placeholder='Escribe tu recordatorio' id='idReminder' />
                    </Col>  
                    <Col>
                        <Form.Control type='date' placeholder='Fecha recordatorio' />
                    </Col>
                    <Col>
                        <Button type='submit'>Agregar recordatorio</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
            
       
    );
}