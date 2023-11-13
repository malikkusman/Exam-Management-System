import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import Register from './components/register';
import Login from './components/login';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />

      </Switch>
    </div>
  );
}

export default App;
