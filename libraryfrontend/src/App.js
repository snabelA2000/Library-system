import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';

import { Navbar } from './components/Navbar'

import { Home } from './pages/Home'
import { ManageEmployees } from "./pages/ManageEmployees";
import { EmployeeDetails} from "./pages/EmployeeDetails"
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
            <Route exact path="/manage-employees" element={<ManageEmployees />} />
            <Route exact path="/manage-employees/employee-details/:id" element={<EmployeeDetails/>} />
            <Route exact path="/create-library-item" element={<CreateLibraryItem />} />
            <Route exact path="/manage-employees/create-employee" element={<CreateEmployee />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </Router>
    </div>

  );
}

export default App;
