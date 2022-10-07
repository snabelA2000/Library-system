import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';

import { Navbar } from './components/Navbar'

import { Home } from './pages/Home'
import { ManageEmployees } from "./pages/ManageEmployees";
import { CreateEmployee } from "./pages/CreateEmployee"
import {CreateLibraryItem} from "./pages/CreateLibraryItem"
import { NotFound404 } from "./pages/NotFound404";

function App() {
  return (
    <div className="app-container">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/manageEmployees" element={<ManageEmployees />} />
            <Route exact path="/createLibraryItem" element={<CreateLibraryItem />} />
            <Route exact path="/manageEmployees/createEmployee" element={<CreateEmployee />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </Router>
    </div>

  );
}

export default App;
