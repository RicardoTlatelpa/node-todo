import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TodoApp from './TodoApp';
import Landing from './Landing';
import Header from './Header';
const App = () =>{
  
    return(
      <div>
        
       <BrowserRouter>
       <Header/>
        <Switch>
          <Route exact path = "/" render = {() => <Landing/>}/>
          <Route exact path = "/app" render = {() => <TodoApp/>}/>
          <Route render = {() => <h1>Not Found</h1>}/>
        </Switch>
       </BrowserRouter>
    </div>
    )
  }


export default App;
