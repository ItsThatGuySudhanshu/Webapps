import Landing from "./components/Landing";
import Movies from "./components/Movies";
import Watchlist from "./components/Watchlist";
import Header from "./components/Header";
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute'
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { isLoading, user } = useAuth0();
  
  if (isLoading) {
    return (
      <div className="text-center mt-5 pt-5" >
        <Spinner animation="border" size="lg" role="status" style={{ color: '#CC0000', width: '5rem', height: '5rem' }}/>
      </div>
    )
  }

  
  
  return (
    <div id="app">
      <Header />
      <div>
        <Switch>
          <Route path="/" exact component={Landing} />
          <ProtectedRoute path="/movies" exact component={() => <Movies user={user} />} />
          <ProtectedRoute path="/watchlist" exact component={() => <Watchlist user={user} />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
