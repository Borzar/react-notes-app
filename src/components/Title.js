import React from 'react';

import { Container, Row, Button, Col } from 'react-bootstrap';

import { firebaseApp } from '../firebase';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(firebaseApp);

const Title = ({ userEmail }) => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <h3>Organiza tus notas, recordatorios y mas ! </h3>
        </Col>
        <Col>
          <b>Bienvenido,</b>
          <p>{userEmail}</p>
          <Button
            onClick={() => signOut(auth)}
            variant="warning"
            size="sm"
            type="submit"
            // style={{ width: '300px' }}
          >
            Cerrar sesion
          </Button>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
};

export default Title;
