import './App.css';
import RecipeModule from './components/RecipeModule'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import RecipeDetail from './components/RecipeDetail';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={RecipeModule} />
          <Route path="/:id" component={RecipeDetail}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
