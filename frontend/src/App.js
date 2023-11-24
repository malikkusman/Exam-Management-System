import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import Register from './components/register';
import Login from './components/login';
import Quiz from './components/quiz';
import Assignment from './components/assignment';
import Result from './components/result';
import Exam from './components/exam';
import Reports from './components/reports';
import Attendance from './components/attendance';
import Profile from './components/profile';
import { useState } from 'react';
import PrivateRoute from './components/privateroute';
import Error from './components/404';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Login {...props} />
          )}
        />
        <PrivateRoute path='/about' component={About} />
        <Route 
        path='/register' 
        render={(props) => (
          <Register {...props} />
        )}
        />
        <PrivateRoute path='/home' component={Home} />
        <PrivateRoute path='/quiz' component={Quiz} />
        <PrivateRoute path='/assignment' component={Assignment} />
        <PrivateRoute path='/result' component={Result} />
        <PrivateRoute path='/exam' component={Exam} />
        <PrivateRoute path='/reports' component={Reports} />
        <PrivateRoute path='/attendance' component={Attendance} />
        <PrivateRoute path='/profile' component={Profile} />
        <Route path='/*' component={Error} />
      </Switch>
    </div>
  );
}

export default App;
