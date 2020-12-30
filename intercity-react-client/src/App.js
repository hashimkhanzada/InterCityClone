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
          <Route path="/book">
            <h1>Book</h1>
          </Route>

          <Route path="/">
            <HeroSection />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
