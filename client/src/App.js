import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage"
import LoginPage from "./components/views/LoginPage/LoginPage"
import RegisterPage from "./components/views/RegisterPage/RegisterPage"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path ="/" component={LandingPage} />
        <Route exact path ="/Login" component={LoginPage} />
        <Route exact path ="/Register" component={RegisterPage} />
      </Switch>
    </Router>
  );
}


export default App;
