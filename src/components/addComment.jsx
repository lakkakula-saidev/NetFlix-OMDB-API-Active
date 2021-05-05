import { ListGroup, Form, Button } from "react-bootstrap";
import { Component } from "react";

class AddComment extends Component {
  state = {
    opinion: "",
    rating: "",
  };

  submitComment = async (e) => {
    e.preventDefault();

    let finalComment = {
      comment: this.state.opinion,
      rate: this.state.rating,
      elementId: this.props.movieId,
    };
    let endpoint = "https://striveschool-api.herokuapp.com/api/comments/";
    try {
      let response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(finalComment),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMTk0N2IxZjBmYjAwMTVkOTE3ODYiLCJpYXQiOjE2MTk3MDQxNDYsImV4cCI6MTYyMDkxMzc0Nn0.kn5IJ6NrB0ParFoZTMbCv9U3bonQxfjR4MZZsjR9KzY",
        },
      });
      if (response.ok) console.log("Item Added");
    } catch (error) {
      alert(error);
    } finally {
      console.log(this.state.comments);
      this.setState({ selected: !this.state.selected });
    }
  };

  render() {
    return (
      <ListGroup className="newComment">
        <ListGroup.Item
          className="list-group-item d-flex justify-content-between align-items-start"
          key={"commentHeading"}
        >
          <div className="ms-2 me-auto">
            <strong>Your Comment</strong>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <Form>
            <Form.Group controlId="f-comment">
              <Form.Label>Opinion</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={3}
                placeholder="Say something about this movie"
                onChange={(e) => this.setState({ opinion: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="f-rate">
              <Form.Label>Rate</Form.Label>
              <Form.Control
                type="range"
                min="0"
                max="5"
                defaultValue="0"
                onChange={(e) => this.setState({ rating: e.target.value })}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={this.submitComment}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </ListGroup.Item>
      </ListGroup>
    );
  }
}

export default AddComment;
