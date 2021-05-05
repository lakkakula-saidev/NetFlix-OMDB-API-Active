import { Card, Container } from "react-bootstrap";
import React from "react";
import CommentForm from "./commentFrom.jsx";

class SingleBook extends React.Component {
  state = {
    selected: false,
    comments: [],
  };

  comment = async (asin) => {
    let endpoint =
      "https://striveschool-api.herokuapp.com/api/comments/" + `${asin}`;
    try {
      let bookComments = await fetch(endpoint, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMTk0N2IxZjBmYjAwMTVkOTE3ODYiLCJpYXQiOjE2MTk3MDQxNDYsImV4cCI6MTYyMDkxMzc0Nn0.kn5IJ6NrB0ParFoZTMbCv9U3bonQxfjR4MZZsjR9KzY",
        },
      });
      this.setState({ comments: await bookComments.json() });
    } catch (error) {
      alert(error);
    } finally {
      console.log(this.state.comments);
      this.setState({ selected: !this.state.selected });
    }
  };

  render() {
    return (
      <>
        {this.state.selected === true ? (
          <CommentForm
            setValue={this.state.selected}
            comments={this.state.comments}
            bookSelected={this.props.book}
          />
        ) : (
          <></>
        )}
        <Card
          className="h-100 my-4 "
          style={{ width: "18rem" }}
          key={this.props.book}
          id={this.props.book}
          onClick={() => this.comment(this.props.book.asin)}
        >
          <Card.Img
            className="cardImages"
            variant="top"
            src={this.props.book.img}
          />
          <Card.Body>
            <Card.Title className="titleWrap">
              {this.props.book.title}
            </Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}
export default SingleBook;
