import { firebaseApp } from '../firebase';
import { getAuth } from 'firebase/auth';
import { Container } from 'react-bootstrap';
import NavBar from './NavBar';
import Title from './Title';

const auth = getAuth(firebaseApp);

const Home = ({ userEmail }) => {
  return (
    <Container>
      <Title userEmail={userEmail} auth={auth} />
      <NavBar userEmail={userEmail} />
    </Container>
  );
};

export default Home;
