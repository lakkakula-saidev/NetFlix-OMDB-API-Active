import { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

class SearchMovie extends Component {
  state = {
    movies: this.props.content,
  };

  render() {
    console.log(this.state.movies);
    return (
      <Container>
        <Row>
          {this.state.movies.map((movie) => (
            <Col className="mt-2" xs={12} sm={6} md={4} lg={3}>
              <Card>
                <Card.Img
                  variant="top"
                  src={movie.Poster}
                  alt={movie.imdbID}
                  className="img-fluid"
                />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default SearchMovie;
