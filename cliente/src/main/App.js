import '../styles/App.css';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from '../routes/home.jsx';
import Nav from '../components/nav.jsx';
import Detail from '../routes/detail.jsx';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/:title" component={Detail} />
          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;