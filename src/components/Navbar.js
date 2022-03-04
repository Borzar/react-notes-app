import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Content from './Content';
import NewNote from './NewNote';
import NewReminder from './NewReminder';
import NewTask from './NewTask';
import ListNotes from './ListNotes';
import Home from './Home';

const Navbar = () => {
  return (
    <>
      <section>
        <div>
          <header>
            <h3>
              <nav>
                <ul>
                  <li>
                    <Link to="/Home">Home</Link>
                  </li>
                  <li>
                    <Link to="/Content">Contenido</Link>
                  </li>
                  <li>
                    <Link to="/NewNote">NewNote</Link>
                  </li>
                  <li>
                    <Link to="/ListNotes">ListNotes</Link>
                  </li>
                  <li>
                    <Link to="/NewReminder">NewReminder</Link>
                  </li>
                  <li>
                    <Link to="/NewTask">NewTask</Link>
                  </li>
                </ul>
              </nav>
            </h3>
          </header>

          <Routes>
            <Route path="/Home" element={<Home />}>
              {' '}
            </Route>
            <Route path="/Content" element={<Content />}>
              {' '}
            </Route>
            <Route path="/NewNote" element={<NewNote />}>
              {' '}
            </Route>
            <Route path="/ListNotes" element={<ListNotes />}>
              {' '}
            </Route>
            <Route path="/NewReminder" element={<NewReminder />}>
              {' '}
            </Route>
            <Route path="/NewTask" element={<NewTask />}>
              {' '}
            </Route>
          </Routes>
        </div>
      </section>
    </>
  );
};

export default Navbar;
