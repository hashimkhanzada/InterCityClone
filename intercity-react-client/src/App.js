import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./pages/HeroSection";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ManageSection from "./pages/ManageSection";

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
