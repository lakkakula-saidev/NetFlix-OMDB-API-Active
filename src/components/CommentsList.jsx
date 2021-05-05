import { ListGroup } from "react-bootstrap";
import { Component } from "react";

class CommentsList extends Component {
  render() {
    console.log(this.props.bookComments);
    return (
      <ListGroup>
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
        {this.props.bookComments.map((item) => (
          <ListGroup.Item
            className="list-group-item d-flex justify-content-between align-items-start"
            key={item._id}
          >
            <div className="ms-2 me-auto">{item.comment}</div>
            <span className="badge bg-primary rounded-pill">{item.rate}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
}

export default CommentsList;
