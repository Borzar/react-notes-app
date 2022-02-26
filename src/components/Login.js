import React, { useState } from "react";
import { Stack, Container, Form, Button } from 'react-bootstrap';
import  {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../firebase";
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
    //Renderiza texto dinamicamente en el button del Form 
    const [uAreRegister, setUAreRegister] = useState(false);
    
    // captura los datos del email, password 
    const submitHandler = async (e) => {
        e.preventDefault();
        const email =  e.target.formBasicEmail.value;
        const password = e.target.formBasicPassword.value;

        if (uAreRegister) {
            // Si se registra
            const usuario = await createUserWithEmailAndPassword(auth, email, password)
        } else 
            // Si inicia sesion 
            signInWithEmailAndPassword(auth, email, password);
    }
     
     

    return (
        <Container>
            <Stack gap={3}>
                <Form onSubmit={submitHandler}>
                    <h1>{uAreRegister ? "Registrate" : "Inicia Sesion"}</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                   
                    <Button variant="primary" type="submit">
                        {uAreRegister ? "Registrate" : "Inicia Sesion"}
                    </Button>
                </Form>
                <Button variant="primary" type="submit" style={{width: "300px"}} onClick={() => signInWithRedirect(auth, googleProvider)}>
                    Acceder con Google
                </Button>

                <Button variant="primary" style={{width: "300px"}} onClick={ () => setUAreRegister(!uAreRegister)   }>
                    {uAreRegister ? "Ya tienes cuenta, Inicia Sesion" : "No tienes cuenta, registrate"}
                </Button>



            </Stack>


        </Container>

    )
}

export default Login;