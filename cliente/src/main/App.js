import '../styles/App.css';
import React, { useEffect } from 'react';
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
  const posts = useSelector(state => state.OriginalPosts);
  const needsUpdate = useSelector(state => state.needsUpdate);

  useEffect(() => {
    if (!sessionStorage.getItem("sessionActive")) {
      sessionStorage.setItem("sessionActive", "true");
    }

    if (needsUpdate || posts.length === 0) {
      dispatch(getPosts());
    }

    const interval = setInterval(() => {
      dispatch(getPosts());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch, needsUpdate, posts.length]);



  return (

    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home posts={posts} />} />
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