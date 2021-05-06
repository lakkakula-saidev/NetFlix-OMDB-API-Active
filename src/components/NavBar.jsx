import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../src/assets/netflix_logo.png";
import "../styles/styles.css";
import { Component } from "react";
import SearchMovie from "./search";
import { Container, Row, Button } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";

class NavBar extends Component {
  state = {
    search: [],
    query: "",
  };

  Movie = async (event) => {
    this.setState({ query: event.target.value });
    try {
      const request = await fetch(
        `http://www.omdbapi.com/?apikey=c992ec7c&s=${this.state.query}`
      );

      const response = await request.json();
      this.setState({
        search: response.Search,
      });
      console.log(this.state.search);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                <Link to="/">
                  <img src={logo} id="logo" />
                </Link>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <Link to="/TV Shows">Tv Shows</Link>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Movies
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Recently Added
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      My List
                    </a>
                  </li>
                </ul>

                <ul className="navbar-nav  align-items-center">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      <input
                        value={this.state.query}
                        id="search"
                        type="text"
                        placeholder="search movie..."
                        onChange={(event) => this.Movie(event)}
                      />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      KIDS
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-bell-fill icon"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"></path>
                      </svg>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <Link to="/Registration">
                        <Button variant="danger">Register</Button>
                      </Link>
                    </a>
                  </li>

                  <li className="nav-item">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src="./assets/avatar.png" id="avatar" />
                      </button>
                      <ul className="dropdown-menu dropdown-menu-dark">
                        <li>
                          <a className="dropdown-item" href="#">
                            <div className="d-flex align-items-center">
                              <img
                                src="./assets/avatar.png"
                                id="avatar-small"
                              />
                              User
                            </div>
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Manage Profiles
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Account
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Help Center
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Signout Netflix
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <Container fluid>
          <Row>
            {this.state.search ? (
              <SearchMovie content={this.state.search} />
            ) : (
              <></>
            )}
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(NavBar);
