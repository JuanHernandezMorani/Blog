import '../styles/App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from '../routes/home.jsx';
import Nav from '../components/nav.jsx';
import Detail from '../routes/detail.jsx';
import CreateForm from '../components/createForm.jsx';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Nav />
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/:title" element={<Detail />} />
            <Route path="/Canales" element={<Home />} />
            <Route path="/Contenido" element={<Home />} />
            <Route path="/Marketing" element={<Home />} />
            <Route path="/Noticias-e-Investigacion" element={<Home />} />
            <Route path="/createNew" element={<CreateForm />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;