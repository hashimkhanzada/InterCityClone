import "./App.css";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/book"></Route>

          <Route path="/">
            <HeroSection />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
