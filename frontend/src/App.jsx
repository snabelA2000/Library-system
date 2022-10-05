import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

//contexts

//components
import Navbar from "./components/Navbar";

//pages
import { Home } from "./pages/Home";
import { NotFound404 } from "./pages/NotFound404";


function App() {


    return (
        <div className="mt-14">

            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="*" component={NotFound404} />
                </Switch>
            </Router>

        </div>
    );
}

export default App;