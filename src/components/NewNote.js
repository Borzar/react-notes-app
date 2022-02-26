import React, { } from 'react';
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { firebaseApp } from '../firebase';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);



export default function NewNote({userEmail, setArrayNotes, arrayNotes}) {

    let urlDownload;

    const addNote = async (e) => {
        e.preventDefault()
        const description = e.target.formDescription.value;
        //crear nuevo arrray de notas
        const newArrayNotes = [
            ...arrayNotes,
            {
                id: +new Date(),
                description: description,
                url: urlDownload,
            },
        
        ];
        //actualizar base de datos
        const docuRef = doc(firestore, `users/${userEmail}`);
        updateDoc(docuRef, { notes: [...newArrayNotes]});
        //actualizar estado
        setArrayNotes(newArrayNotes);
        // limpiar buscador  
        e.target.formDescription.value = "";
    }

   const fileHandler = async (e) => {
       //detectar archivo
       const archiveLocal = e.target.files[0];
       //cargarlo a firebase storage
       const archiveRef = ref(storage, `document/${archiveLocal.name}`);
       await uploadBytes(archiveRef, archiveLocal);
       //obtener url de descarga
       urlDownload = await getDownloadURL(archiveRef);
   } 

    return (
        <Container>
            <Form onSubmit={addNote} >
                <Row className="mb-5">
                    <Col>
                        <Form.Control type='text' placeholder='Describe tu nota' id="formDescription" />
                    </Col>
                    <Col>
                        <Form.Control type='file' placeholder='añade archivo' ondChange={fileHandler}/>
                    </Col>
                    <Col>
                        <Button type="submit">Agregar Nota</Button>
                    </Col>
                </Row>
            </Form>
            <hr />
        </Container>

    );
}

