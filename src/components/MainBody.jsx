import { Component } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";

class MainBody extends Component {
  state = {
    movieList: ["Harry Potter", "The Lord of the Rings"],
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
      this.setState({ responseArray: moviesArr });
      console.log(this.state.responseArray);
    } catch (error) {}
  }

  render() {
    return (
      <Container className="my-5 mainBodyContianer">
        {this.state.responseArray.map((gallery, id) => (
          <>
            <h3 className="carouselHeading">
              <b>{this.state.movieList[id]}</b>
            </h3>
            <Row>
              <Carousel indicators={false}>
                <Carousel.Item class="d-flex flex-row">
                  <Row className="my-4">
                    {gallery.Search.slice(0, 6).map((movie) => (
                      <Col md={2}>
                        <img
                          className="d-block w-100"
                          src={movie.Poster}
                          alt="First slide"
                          onClick={() =>
                            this.props.history.push(
                              "/ShowDetail/" + movie.imdbID
                            )
                          }
                        />
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              </Carousel>
            </Row>
          </>
        ))}
      </Container>
    );
  }
}

export default MainBody;
