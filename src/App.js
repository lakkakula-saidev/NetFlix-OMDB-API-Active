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

const App = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <Route
          render={(routerProps) => <MainBody {...routerProps} />}
          path="/"
          exact
        />
        <Route component={ShowDetail} path="/ShowDetail/:Id" />
      </Router>
    </div>
  );
};

export default App;
