import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import NewNote from './NewNote';
import NewReminder from './NewReminder';
import NewTask from './NewTask';
import NotFoundPage from './NotFoundPage';

const NavBar = ({ userEmail }) => {
  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/NewNote">Mis Notas</Link>
            </li>

            <li>
              <Link to="/NewReminder">Mis Recordatorios</Link>
            </li>
            <li>
              <Link to="/NewTask">Mis Tareas</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/NewNote"
            element={<NewNote userEmail={userEmail} />}
          ></Route>

          <Route
            path="/NewReminder"
            element={<NewReminder userEmail={userEmail} />}
          ></Route>
          <Route path="/NewTask" element={<NewTask />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default NavBar;
