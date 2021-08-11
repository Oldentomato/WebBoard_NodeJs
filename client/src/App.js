import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import LandingPage from "./components/views/LandingPage/LandingPage"
import LoginPage from "./components/views/LoginPage/LoginPage"
import RegisterPage from "./components/views/RegisterPage/RegisterPage"
import StartPage from "./components/views/StartPage/StartPage"
import NavBar from "./components/views/NavBar/NavBar"
import Auth from "./hoc/auth";

function App() {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route exact path ="/Board" component={Auth(LandingPage,true)}  />
        <Route exact path ="/Login" component={Auth(LoginPage,false)} />
        <Route exact path ="/Register" component={Auth(RegisterPage,false)} />
        <Route exact path = "/" component={Auth(StartPage, null)}/>
      </Switch>
    </Router>
  );
}


export default App;
