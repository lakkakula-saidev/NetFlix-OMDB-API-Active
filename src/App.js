import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";
import "./styles/styles.css";
import "./styles/cardstyle.css";
import NavBar from "./components/NavBar";
import MainBody from "./components/MainBody";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ShowDetail from "./components/ShowDetail";
import Registration from "./components/Registration";

const App = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <Route
          render={(routerProps) => (
            <Registration {...routerProps} title="Registration" />
          )}
          path="/Registration"
          exact
        />
        <Route
          render={(routerProps) => (
            <MainBody {...routerProps} title="Main Section" />
          )}
          path="/"
          exact
        />
        <Route
          path="/ShowDetail/:Id"
          render={(routerProps) => (
            <ShowDetail {...routerProps} title="Show Details" />
          )}
        />
      </Router>
    </div>
  );
};

export default App;
