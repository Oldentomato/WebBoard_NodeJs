import {
  Switch,
  Route
} from "react-router-dom";
import React,{Suspense} from 'react'


import LandingPage from "./components/views/LandingPage/LandingPage"
import LoginPage from "./components/views/LoginPage/LoginPage"
import RegisterPage from "./components/views/RegisterPage/RegisterPage"
import StartPage from "./components/views/StartPage/StartPage"
import NavBar from "./components/views/NavBar/NavBar"
import CreatePage from "./components/views/CreatePage/CreatePage"
import DetailPage from "./components/views/DetailPage/DetailPage"
import ModifyPage from "./components/views/ModifyPage/ModifyPage"
import Auth from "./hoc/auth";

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar/>
      <Route exact path="/Boards/:BoardId" component={Auth(DetailPage,null)}/>
      <Switch>
        <Route path ="/Boards" component={Auth(LandingPage,true)}  />
        <Route exact path ="/Login" component={Auth(LoginPage,false)} />
        <Route exact path ="/Register" component={Auth(RegisterPage,false)} />
        <Route exact path = "/" component={Auth(StartPage, null)}/>
        <Route exact path = "/Create" component={Auth(CreatePage, true)}/>
        <Route exact path = "/Board/:BoardId/Modify" component={Auth(ModifyPage, null)}/>   
      </Switch>
     
      </Suspense>
  );
}


export default App;
