import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/layout/NavBar";
import Dashboard from "./components/layout/Dashboard";
import { Container } from "reactstrap";
import { Routes, Route } from "react-router-dom";
import BackgoundImage from '../pattern.png';
import Pokemon from './components/pokemon/Pokemon';

function App() {
    return (
        <div className="App" style={{ background: `url(${BackgoundImage})`}}>
            <Navbar />
            <Container fluid>
                <Routes>
                  <Route exact path='/' element={<Dashboard />} />
                  <Route path='/pokemon' >
                    <Route path=':pokemonId' element={<Pokemon />} />
                  </Route>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
