import "./App.css";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ManageSection from "./ManageSection";
import ManageBooking from "./ManageBooking";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/manage">
            <ManageSection />
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
