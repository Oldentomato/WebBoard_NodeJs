import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage"
import LoginPage from "./components/views/LoginPage/LoginPage"
import RegisterPage from "./components/views/RegisterPage/RegisterPage"
import StartPage from "./components/views/StartPage/StartPage"
import Auth from "./hoc/auth";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path ="/" component={Auth(LandingPage,true)} />
        <Route exact path ="/Login" component={Auth(LoginPage,false)} />
        <Route exact path ="/Register" component={Auth(RegisterPage,false)} />
        <Route exact path = "/Main" component={Auth(StartPage, false)}/>
      </Switch>
    </Router>
  );
}


export default App;
