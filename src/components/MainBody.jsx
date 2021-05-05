import { Component } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";

class MainBody extends Component {
  state = {
    movieList: ["harry potter"],
    responseArray: [],
  };

  async componentDidMount() {
    try {
      const endpoint = "http://www.omdbapi.com/?apikey=35a13d0b&s=";
      const moviesArr = await Promise.all(
        this.state.movieList.map(async (category) => {
          const res = await fetch(endpoint + category, {
            /* headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMTk0N2IxZjBmYjAwMTVkOTE3ODYiLCJpYXQiOjE2MTkwMDc4MTUsImV4cCI6MTYyMDIxNzQxNX0.5aA8jMjlV02DqZlvnNr3gvugFDUf0vHMnmO5PZaiUi4",
            } */
          });
          return await res.json();
        })
      );
      this.setState({ responseArray: moviesArr[0].Search.slice(0, 6) });
      console.log(this.state.responseArray);
    } catch (error) {}
  }

  render() {
    return (
      <Container className="my-5">
        <Row>
          <Carousel indicators={false}>
            <Carousel.Item class="d-flex flex-row">
              <Row>
                {this.state.responseArray.map((movie) => (
                  <Col md={2}>
                    <img
                      className="d-block w-100"
                      src={movie.Poster}
                      alt="First slide"
                      onClick={() =>
                        this.props.history.push("/ShowDetail/" + movie.imdbID)
                      }
                    />
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          </Carousel>
        </Row>
      </Container>
    );
  }
}

export default MainBody;
