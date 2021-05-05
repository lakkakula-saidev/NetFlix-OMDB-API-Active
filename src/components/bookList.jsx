import SingleBook from "./singleBook";
import { Container, Row, InputGroup, FormControl } from "react-bootstrap";

const BooksList = (props) => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-between mx-auto">
        {props.books.map((currentBook) => (
          <SingleBook book={currentBook} key={currentBook.title} />
        ))}
      </Row>
    </Container>
  );
};

export default BooksList;
