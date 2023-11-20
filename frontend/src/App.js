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


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/quiz' component={Quiz} />
        <Route path='/assignment' component={Assignment} />
        <Route path='/result' component={Result} />
        <Route path='/exam' component={Exam} />
        <Route path='/reports' component={Reports} />
        <Route path='/attendance' component={Attendance} />
        <Route path='/profile' component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
