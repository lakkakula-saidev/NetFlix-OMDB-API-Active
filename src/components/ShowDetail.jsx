import { Component } from "react";
import {
  Container,
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
} from "react-bootstrap";

class ShowDetail extends Component {
  state = {
    movieData: {},
    movieComments: [],
  };
  async componentDidMount() {
    let movieId = this.props.match.params.Id;
    let endpoint = "http://www.omdbapi.com/?apikey=35a13d0b&i=" + movieId;
    try {
      let response = await fetch(endpoint);
      this.setState({ movieData: await response.json() });
      console.log(this.state.movieData);
    } catch (error) {}

    let commentEndpoint =
      "https://striveschool-api.herokuapp.com/api/comments/" + movieId;
    try {
      let response = await fetch(commentEndpoint, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMTk0N2IxZjBmYjAwMTVkOTE3ODYiLCJpYXQiOjE2MTk3MDQxNDYsImV4cCI6MTYyMDkxMzc0Nn0.kn5IJ6NrB0ParFoZTMbCv9U3bonQxfjR4MZZsjR9KzY",
        },
      });
      this.setState({ movieComments: await response.json() });
    } catch (error) {}
  }

  render() {
    return (
      <Container>
        <Row className="d-flex justify-content-center">
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={this.state.movieData.Poster} />
              <Card.Body>
                <Card.Title>{this.state.movieData.Title}</Card.Title>
                <Card.Text>{this.state.movieData.Plot}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item
                  className="list-group-item d-flex justify-content-between align-items-start"
                  key={"commentHeading"}
                >
                  <div className="ms-2 me-auto">
                    <strong>Comment</strong>
                  </div>
                  <span>
                    <strong>Rating</strong>
                  </span>
                </ListGroup.Item>
                {this.state.movieComments.map((item) => (
                  <ListGroup.Item
                    className="list-group-item d-flex justify-content-between align-items-start"
                    key={item._id}
                  >
                    <div className="ms-2 me-auto">{item.comment}</div>
                    <span className="badge bg-primary rounded-pill">
                      {item.rate}
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ShowDetail;
