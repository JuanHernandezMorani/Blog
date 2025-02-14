import '../styles/App.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from '../routes/home.jsx';
import Nav from '../components/nav.jsx';
import Detail from '../routes/detail.jsx';
import CreateForm from '../components/createForm.jsx';
import EditeForm from '../components/editForm.jsx';
import ErrorPage from '../routes/errorPage.jsx';
import Unsubscribe from '../routes/unsubscribe.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import UnderConstruction from '../routes/underConstruction.jsx';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {   
    dispatch(getPosts());
} , [ dispatch ]);

  const posts = useSelector(state => state.OriginalPosts);

  return (
    
    <BrowserRouter>
        <div className="App">
          <Nav />
              <Routes>
                <Route exact path="/" element={<Home posts={posts}/>}/>
                <Route path="/read/:title" element={<Detail />} />
                <Route path="/Canales" element={<UnderConstruction />} />
                <Route path="/Contenido" element={<UnderConstruction />} />
                <Route path="/Marketing" element={<UnderConstruction />} />
                <Route path="/Noticias-e-Investigacion" element={<UnderConstruction />} />
                <Route path="/unsubscribe/:uuid" element={<Unsubscribe />} />
                <Route path="*" element={<ErrorPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/read/:title/edit" element={<EditeForm />} />
                  <Route path="/createNew" element={<CreateForm />} />
                </Route>

              </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;